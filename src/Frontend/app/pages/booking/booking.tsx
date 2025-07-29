import { useEffect, useState } from "react";
import api from "~/services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NavMenu } from "~/components/nav-menu";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "~/stores/authStore";
import { useLoading } from "~/hooks/useLoading";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const START_HOUR = 7;
const END_HOUR = 23;

type TimeSlot = {
  start: string; // "07:00"
  end: string;   // "08:00"
  available: boolean;
};

function generateAllSlots(occupied: string[]) {
  const slots: TimeSlot[] = [];
  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    const slotId = `${start}_${end}`;
    slots.push({
      start,
      end,
      available: !occupied.includes(slotId),
    });
  }
  return slots;
}

const Booking = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const email = user?.email;
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd")
  );
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const { isLoading, withLoading } = useLoading();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await api.get(`/api/v1/courts/${id}/${selectedDate}`);

        // Gera todos os intervalos ocupados de 1h a partir dos períodos retornados
        const occupiedSlots: string[] = [];
        (response.data || []).forEach(
          (slot: { startTime: string; endTime: string }) => {
            let start = parseISO(slot.startTime);
            const end = parseISO(slot.endTime);

            while (start < end) {
              const next = new Date(start);
              next.setHours(start.getHours() + 1);

              const startStr = format(start, "HH:mm");
              const endStr = format(next, "HH:mm");
              occupiedSlots.push(`${startStr}_${endStr}`);

              start = next;
            }
          }
        );

        let slots = generateAllSlots(occupiedSlots);

        // Se for hoje, marca horários passados como indisponíveis
        const now = new Date();
        const isToday = selectedDate === format(now, "yyyy-MM-dd");
        if (isToday) {
          const currentHour = now.getHours();
          const currentMinutes = now.getMinutes();
          slots = slots.map((slot) => {
            const slotHour = parseInt(slot.start.split(":")[0], 10);
            if (
              slotHour < currentHour ||
              (slotHour === currentHour && currentMinutes > 0)
            ) {
              return { ...slot, available: false };
            }
            return slot;
          });
        }

        setTimeSlots(slots);
        setSelectedSlots([]);
      } catch (err) {
        setTimeSlots(generateAllSlots([]));
        setSelectedSlots([]);
      }
    };

    fetchSlots();
  }, [selectedDate, id]);

  // Função para saber se o slot está bloqueado por regra de seleção
  function isSlotBlocked(slotId: string) {
    if (!timeSlots.find((s) => `${s.start}_${s.end}` === slotId)?.available) return false;
    if (selectedSlots.length === 0) return false;
    if (selectedSlots.includes(slotId)) return false;
    if (selectedSlots.length === 2) return true;

    // Só permite selecionar horários contíguos
    const allSlots = timeSlots.filter((s) => s.available);
    const selectedIndices = selectedSlots.map((id) =>
      allSlots.findIndex((s) => `${s.start}_${s.end}` === id)
    );
    const clickedIndex = allSlots.findIndex((s) => `${s.start}_${s.end}` === slotId);

    // Pode selecionar se for imediatamente antes ou depois do selecionado
    if (
      selectedIndices.some((idx) => Math.abs(idx - clickedIndex) === 1)
    ) {
      return false;
    }
    return true;
  }

  // Lógica de seleção de múltiplos horários contíguos e máximo 2h
  const handleSlotClick = (slotId: string) => {
    if (!timeSlots.find((s) => `${s.start}_${s.end}` === slotId)?.available) return;
    if (isSlotBlocked(slotId)) return;

    if (selectedSlots.includes(slotId)) {
      // Desmarca se já estava selecionado
      setSelectedSlots(selectedSlots.filter((s) => s !== slotId));
      return;
    }

    if (selectedSlots.length === 0) {
      setSelectedSlots([slotId]);
      return;
    }

    if (selectedSlots.length === 2) {
      // Não permite mais de 2 horários
      return;
    }

    // Só permite selecionar horários contíguos
    const allSlots = timeSlots.filter((s) => s.available);
    const selectedIndices = selectedSlots.map((id) =>
      allSlots.findIndex((s) => `${s.start}_${s.end}` === id)
    );
    const clickedIndex = allSlots.findIndex((s) => `${s.start}_${s.end}` === slotId);

    // Pode selecionar se for imediatamente antes ou depois do selecionado
    if (
      selectedIndices.some((idx) => Math.abs(idx - clickedIndex) === 1)
    ) {
      setSelectedSlots([...selectedSlots, slotId].sort());
    }
  };

  const handleSubmit = async () => {
    if (selectedSlots.length === 0 || !email) return;

    // Ordena os slots selecionados para pegar o início e fim corretos
    const allSlots = timeSlots.filter((s) => s.available);
    const selectedIndices = selectedSlots
      .map((id) => allSlots.findIndex((s) => `${s.start}_${s.end}` === id))
      .sort((a, b) => a - b);

    const firstSlot = allSlots[selectedIndices[0]];
    const lastSlot = allSlots[selectedIndices[selectedIndices.length - 1]];

    await withLoading(async () => {
      try {
        await api.post("/api/v1/bookings", {
          userId: email,
          courtId: id,
          startDate: `${selectedDate}T${firstSlot.start}:00Z`,
          endDate: `${selectedDate}T${lastSlot.end}:00Z`,
        });

        setSelectedSlots([]);
        toast.success("Agendamento realizado com sucesso!", {
          onClose: () => navigate("/dashboard"),
          autoClose: 3000, // 3 segundos (padrão)
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data || "Erro ao realizar agendamento");
      }
    });
  };

  const today = format(new Date(), "yyyy-MM-dd");

  // Para evitar hydration warning, formate a data para exibição só no client
  const [displayDate, setDisplayDate] = useState("");
  useEffect(() => {
    setDisplayDate(
      format(parseISO(selectedDate), "d 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    );
  }, [selectedDate]);

  return (
    <>
      <NavMenu />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
          Escolha o dia da sua reserva
        </h1>

        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={selectedDate}
          min={today}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <h2 className="text-lg font-semibold mb-2 text-center">
          Horários disponíveis para {displayDate}
        </h2>

        <div className="space-y-3 max-h-60 overflow-y-auto mb-6">
          {timeSlots.map(({ start, end, available }) => {
            const slotId = `${start}_${end}`;
            const isSelected = selectedSlots.includes(slotId);
            const blocked = isSlotBlocked(slotId);
            return (
              <div
                key={slotId}
                className={`flex items-center justify-between p-3 border rounded-lg transition
                  ${available
                    ? isSelected
                      ? "bg-green-200 border-green-600"
                      : blocked
                        ? "bg-red-100 border-red-400 text-red-700 cursor-not-allowed"
                        : "bg-green-50 hover:bg-green-100"
                    : "bg-gray-100 cursor-not-allowed opacity-60"
                  }`}
                onClick={() => !blocked && available && handleSlotClick(slotId)}
                style={{ cursor: available && !blocked ? "pointer" : "not-allowed" }}
              >
                <span className="font-medium">
                  {start} – {end}
                </span>
                {available && !blocked ? (
                  <input
                    type="checkbox"
                    name="timeSlot"
                    value={slotId}
                    checked={isSelected}
                    readOnly
                    className="h-5 w-5 text-green-600 pointer-events-none"
                  />
                ) : available && blocked ? (
                  <span className="px-2 py-1 text-xs bg-red-400 text-white rounded">
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-gray-400 text-white rounded">
                    Indisponível
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button
          disabled={
            selectedSlots.length === 0 ||
            selectedSlots.length > 2 ||
            isLoading
          }
          onClick={handleSubmit}
          className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-800 transition disabled:bg-gray-400"
        >
          {isLoading ? "Reservando..." : "Confirmar reserva"}
        </button>

        {isLoading && <LoadingSpinner />}
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Booking;
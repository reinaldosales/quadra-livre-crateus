import { useEffect, useState } from "react";
import api from "~/services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NavMenu } from "~/components/nav-menu";
import { useParams } from "react-router";
import { useAuthStore } from "~/stores/authStore";
import { useLoading } from "~/hooks/useLoading";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TimeSlot = {
  start: string;
  end: string;
  available: boolean;
};

const Booking = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const email = user?.email;

  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd")
  );
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { isLoading, withLoading } = useLoading();

  // useEffect(() => {
  //   const fetchSlots = async () => {
  //     try {
  //       const response = await api.get(`/api/v1/bookings/slots`, {
  //         params: { date: selectedDate },
  //       });

  //       setTimeSlots(response.data);
  //     } catch (err) {
  //       console.error("Erro ao buscar horários:", err);
  //       setTimeSlots([]);
  //     }
  //   };

  //   fetchSlots();
  // }, [selectedDate]);

  useEffect(() => {
    setTimeSlots([
      { start: "16:00", end: "17:00", available: false },
      { start: "17:00", end: "18:00", available: true },
      { start: "18:00", end: "19:00", available: true },
    ]);
  }, []);

  const handleSubmit = async () => {
    if (!selectedSlot || !email) return;

    await withLoading(async () => {
      try {
        const [start, end] = selectedSlot.split("_");

        await api.post("/api/v1/bookings", {
          userId: email,
          courtId: id,
          startDate: `${selectedDate}T${start}:00Z`,
          endDate: `${selectedDate}T${end}:00Z`,
        });

        toast.success("Agendamento realizado com sucesso!");
      } catch (error) {
        console.error("Erro ao reservar:", error);
        toast.error("O agendamento falhou. Tente novamente.");
      }
    });
  };

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
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <h2 className="text-lg font-semibold mb-2 text-center">
          Horários disponíveis para{" "}
          {format(parseISO(selectedDate), "d 'de' MMMM 'de' yyyy", {
            locale: ptBR,
          })}
        </h2>

        <div className="space-y-3 max-h-60 overflow-y-auto mb-6">
          {timeSlots.map(({ start, end, available }) => {
            const id = `${start}_${end}`;
            return (
              <div
                key={id}
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  available
                    ? "bg-green-50 hover:bg-green-100"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              >
                <span className="font-medium">
                  {start} – {end}
                </span>

                {available ? (
                  <input
                    type="radio"
                    name="timeSlot"
                    value={id}
                    checked={selectedSlot === id}
                    onChange={() => setSelectedSlot(id)}
                    className="h-5 w-5 text-green-600"
                  />
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
          disabled={!selectedSlot || isLoading}
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

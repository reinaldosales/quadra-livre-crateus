import { useEffect, useState } from "react";
import { NavMenu } from "~/components/nav-menu";
import { useAuthStore } from "~/stores/authStore";
import api from "~/services/api";

interface IBooking {
  courtName: string;
  startDate: string;
  endDate: string;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("/api/v1/bookings");
        setBookings(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  console.log(bookings);
  return (
    <div className="min-h-screen bg-gray-100">
      <NavMenu />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Minhas Reservas
        </h1>
        {bookings.length === 0 ? (
          <div className="text-center p-6 bg-white rounded shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Nenhuma marcação encontrada
            </h2>
            <p className="text-gray-600">Você ainda não fez nenhuma reserva.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking, index) => {
              const start = new Date(booking.startDate);
              const end = new Date(booking.endDate);

              const dia = start.toLocaleDateString("pt-BR");
              const horaInicio = start.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const horaFim = end.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded shadow border-l-4 border-qlc-primary"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-qlc-primary">
                        {booking.courtName}
                      </h2>
                      <p className="text-gray-600">
                        {dia} • {horaInicio} - {horaFim}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

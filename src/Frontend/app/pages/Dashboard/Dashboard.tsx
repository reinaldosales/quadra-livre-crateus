import { useEffect, useState } from "react";
import { Footer } from "~/components/footer";
import { NavMenu } from "~/components/nav-menu";
import logo from "~/welcome/assets/quadra-livre-crateus-logo.png";
import { useNavigate } from "react-router";
import api from "~/services/api";
import Court from "~/components/Court";

interface CourtType {
  id: string;
  nome: string;
  imagens: string[];
  descricao: string;
  endereco: string;
  tipos: string[];
  isAvaliable: boolean;
}

const Dashboard = () => {
  const [quadras, setQuadras] = useState<CourtType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuadra, setSelectedQuadra] = useState<CourtType | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await api.get("/api/v1/courts");

        const transformed = response.data.map(
          (item: any): CourtType => ({
            id: item.id.toString(),
            nome: item.name,
            imagens: item.images || [
              "https://altipisos.com.br/wp-content/uploads/2021/04/site-1.jpg",
            ],
            descricao: "Quadra disponível para agendamento.",
            endereco: item.address || "Endereço não disponível",
            tipos: [item.type],
            isAvaliable: item.isAvailable,
          })
        );

        setQuadras(transformed);
      } catch (error) {
        console.error(error);
        setQuadras([]);
      }
    };

    fetchCourts();
  }, []);

  const openModal = (quadra: CourtType) => {
    setSelectedQuadra(quadra);
    setCarouselIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedQuadra(null);
    setCarouselIndex(0);
  };

  const nextImage = () => {
    if (selectedQuadra) {
      setCarouselIndex((prev) => (prev + 1) % selectedQuadra.imagens.length);
    }
  };

  const prevImage = () => {
    if (selectedQuadra) {
      setCarouselIndex((prev) =>
        prev === 0 ? selectedQuadra.imagens.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavMenu />
      <div className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-qlc-secondary mb-4">
              Reserve quadras na Morada dos Ventos 3 com facilidade.
            </h1>
            <p className="text-lg text-qlc-tertiary">
              Escolha sua quadra favorita e faça sua reserva de forma rápida e
              prática!
            </p>
          </div>
          <div className="md:w-1/3 flex justify-end">
            <img src={logo} alt="Logo Quadra Livre" className="h-24 w-auto" />
          </div>
        </div>

        {/* Cards das quadras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quadras.map((quadra) => (
            <Court key={quadra.id} quadra={quadra} onClick={openModal} />
          ))}
        </div>
      </div>

      {/* Modal de detalhes da quadra */}
      {modalOpen && selectedQuadra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-qlc-tertiary hover:text-qlc-primary text-xl z-10"
              onClick={closeModal}
              aria-label="Fechar"
            >
              &times;
            </button>
            <br />
            <div className="mb-4">
              <div className="relative h-56 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={selectedQuadra.imagens[carouselIndex]}
                  alt={selectedQuadra.nome}
                  className="object-cover h-full w-full"
                />
                {selectedQuadra.imagens.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-qlc-secondary text-white rounded-full p-2 hover:bg-qlc-primary transition-colors"
                      onClick={prevImage}
                    >
                      &#8592;
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-qlc-secondary text-white rounded-full p-2 hover:bg-qlc-primary transition-colors"
                      onClick={nextImage}
                    >
                      &#8594;
                    </button>
                  </>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-qlc-secondary mb-2">
              {selectedQuadra.nome}
            </h2>
            <p className="text-base text-qlc-tertiary mb-4">
              {selectedQuadra.descricao}
            </p>

            <button
              className="w-full bg-qlc-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-qlc-tertiary transition-colors"
              onClick={() => {
                closeModal();
                navigate(`/reservas/${selectedQuadra.id}`);
              }}
            >
              Reservar
            </button>
          </div>
        </div>
      )}

      <Footer className="text-xs text-center p-8 w-full" />
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import { Footer } from "~/components/footer";
import { NavMenu } from "~/components/nav-menu";
import logo from "~/welcome/assets/quadra-livre-crateus-logo.png";
import { useNavigate } from "react-router";

const quadras = [
  {
    id: 1,
    nome: "Quadra 1",
    imagens: ["/imagens/quadra1.jpg", "/imagens/quadra1b.jpg"],
    descricao: "Quadra de areia ideal para vôlei de praia e beach tennis.",
    tipos: ["Vôlei de Praia", "Beach Tennis"],
    endereco: "Rua das Quadras, 123 - Morada dos Ventos 3",
  },
  {
    id: 2,
    nome: "Quadra 2",
    imagens: ["/imagens/quadra2.jpg", "/imagens/quadra2b.jpg"],
    descricao: "Quadra para futevôlei e beach tennis.",
    tipos: ["Futevôlei", "Beach Tennis"],
    endereco: "Rua das Quadras, 124 - Morada dos Ventos 3",
  },
  {
    id: 3,
    nome: "Quadra 3",
    imagens: ["/imagens/quadra3.jpg", "/imagens/quadra3b.jpg"],
    descricao: "Quadra exclusiva para vôlei de praia.",
    tipos: ["Vôlei de Praia"],
    endereco: "Rua das Quadras, 125 - Morada dos Ventos 3",
  },
];

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuadra, setSelectedQuadra] = useState<typeof quadras[0] | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  const openModal = (quadra: typeof quadras[0]) => {
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
          {/* Frase à esquerda */}
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-qlc-secondary mb-4">
              Reserve quadras na Morada dos Ventos 3 com facilidade.
            </h1>
            <p className="text-lg text-qlc-tertiary">
              Escolha sua quadra favorita e faça sua reserva de forma rápida e prática!
            </p>
          </div>
          {/* Logo à direita */}
          <div className="md:w-1/3 flex justify-end">
            <img src={logo} alt="Logo Quadra Livre" className="h-24 w-auto" />
          </div>
        </div>
        {/* Cards das quadras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quadras.map((quadra) => (
            <div
              key={quadra.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Imagem da quadra */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img
                  src={quadra.imagens[0]}
                  alt={quadra.nome}
                  className="object-cover h-full w-full"
                />
              </div>
              {/* Nome da quadra */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-qlc-secondary mb-2">{quadra.nome}</h2>
                <button
                  className="mt-4 bg-qlc-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-qlc-tertiary transition-colors"
                  onClick={() => openModal(quadra)}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal de detalhes da quadra */}
      {modalOpen && selectedQuadra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Botão fechar */}
            <button
              className="absolute top-4 right-4 text-qlc-tertiary hover:text-qlc-primary text-xl z-10"
              onClick={closeModal}
              aria-label="Fechar"
            >
              &times;
            </button>
            <br></br>
            {/* Carrossel de imagens */}
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
              {selectedQuadra.imagens.length > 1 && (
                <div className="flex justify-center mt-2 gap-2">
                  {selectedQuadra.imagens.map((_, idx) => (
                    <span
                      key={idx}
                      className={`inline-block w-2 h-2 rounded-full ${idx === carouselIndex ? "bg-qlc-primary" : "bg-gray-300"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Descrição */}
            <h2 className="text-2xl font-bold text-qlc-secondary mb-2">{selectedQuadra.nome}</h2>
            <p className="text-base text-qlc-tertiary mb-4">{selectedQuadra.descricao}</p>
            {/* Tags de tipo de quadra */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedQuadra.tipos.map((tipo) => (
                <span
                  key={tipo}
                  className="bg-qlc-secondary text-white px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tipo}
                </span>
              ))}
            </div>
            {/* Endereço */}
            <div className="mb-6">
              <span className="block text-sm text-gray-600 font-semibold">Endereço:</span>
              <span className="block text-base text-qlc-primary">{selectedQuadra.endereco}</span>
            </div>
            {/* Botão de reserva */}
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
import React from "react";

interface CourtProps {
  quadra: {
    id: number;
    nome: string;
    endereco: string;
    tipos: number;
    isAvaliable: boolean;
    descricao: string;
    imagens?: string[];
  };
  onClick: (quadra: CourtProps["quadra"]) => void;
  adminPage?: boolean;
}

const Court: React.FC<CourtProps> = ({
  quadra,
  onClick,
  adminPage = false,
}) => {
  const { id, nome, endereco, isAvaliable, descricao, imagens } = quadra;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={imagens?.[0] || "https://via.placeholder.com/400x300"}
          alt={nome}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        {adminPage ? (
          <>
            <p className="text-gray-500 text-sm italic">{descricao}</p>
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Apagar quadra
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-qlc-secondary mb-2">
              {nome}
            </h2>
            <p className="text-gray-600 text-sm">{endereco}</p>
            <p className="text-gray-500 text-sm italic mt-1">{descricao}</p>
            <button
              disabled={!isAvaliable}
              className={`mt-4 font-medium py-2 px-4 rounded-lg transition-colors ${
                isAvaliable
                  ? "bg-qlc-primary text-white hover:bg-qlc-tertiary"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={() => onClick(quadra)}
            >
              {isAvaliable ? "Ver detalhes" : "Indisponível"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Court;

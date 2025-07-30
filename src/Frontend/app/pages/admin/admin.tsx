import React, { useEffect, useState } from "react";
import Court from "~/components/Court";
import { NavMenu } from "~/components/nav-menu";
import api from "~/services/api";

// Tipagens
interface User {
  id: number;
  name: string;
  email: string;
}

interface CourtFormData {
  name: string;
  address: string;
  type: number;
  image: string;
}

interface CourtType {
  id: string;
  nome: string;
  imagens: string[];
  descricao: string;
  endereco: string;
  tipos: string[];
  isAvaliable: boolean;
}

// Constantes
const USERS_PER_PAGE = 10;
const DEFAULT_COURT_IMAGE =
  "https://altipisos.com.br/wp-content/uploads/2021/04/site-1.jpg";

const AdminPage = () => {
  const [quadras, setQuadras] = useState<CourtType[]>([]);
  const [formData, setFormData] = useState<CourtFormData>({
    name: "",
    address: "",
    type: 1,
    image: "",
  });

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const { data } = await api.get("/api/v1/courts");
      const transformed = data.map(
        (item: any): CourtType => ({
          id: item.id.toString(),
          nome: item.name,
          imagens: item.images?.length ? item.images : [DEFAULT_COURT_IMAGE],
          descricao: "Quadra disponível para agendamento.",
          endereco: item.address || "Endereço não disponível",
          tipos: [item.type],
          isAvaliable: item.isAvailable,
        })
      );
      setQuadras(transformed);
    } catch (error) {
      console.error("Erro ao buscar quadras:", error);
      setQuadras([]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/courts", formData);
      alert("Quadra cadastrada com sucesso!");
      setFormData({ name: "", address: "", type: 1, image: "" });
      fetchCourts();
    } catch (error) {
      console.error("Erro ao cadastrar quadra:", error);
    }
  };

  return (
    <>
      <NavMenu />
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Administração</h1>

        {/* Formulário de cadastro */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-10"
        >
          <h2 className="text-xl font-semibold mb-4">Cadastrar nova quadra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "name", placeholder: "Nome da quadra" },
              { name: "address", placeholder: "Endereço" },
              { name: "image", placeholder: "URL da imagem" },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                type="text"
                name={name}
                placeholder={placeholder}
                value={(formData as any)[name]}
                onChange={handleInputChange}
                required={name !== "image"}
                className="border rounded px-3 py-2"
              />
            ))}

            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="border rounded px-3 py-2"
            >
              <option value={1}>Futsal</option>
              <option value={2}>Vôlei</option>
              <option value={3}>Basquete</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Cadastrar quadra
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4">Quadras cadastradas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8 mt-6">
          {quadras.map((quadra) => (
            <Court key={quadra.id} quadra={quadra} adminPage />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPage;

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Court from "~/components/Court";
import { NavMenu } from "~/components/nav-menu";
import ProtectedAdminRoute from "~/components/ProtectedAdminRoute";
import api from "~/services/api";
import "react-toastify/dist/ReactToastify.css";

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
  image: File | null;
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

const DEFAULT_COURT_IMAGE =
  "https://altipisos.com.br/wp-content/uploads/2021/04/site-1.jpg";

const AdminPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [quadras, setQuadras] = useState<CourtType[]>([]);
  const [formData, setFormData] = useState<CourtFormData>({
    name: "",
    address: "",
    type: 1,
    image: null,
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
      setQuadras([]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "type" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));

      const previewUrl = URL.createObjectURL(e.target.files![0]);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/courts", formData);
      setFormData({ name: "", address: "", type: 1, image: null });

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }

      toast.success("Quadra cadastrada com sucesso!");

      fetchCourts();
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastar a quadra");
      console.error("Erro ao cadastrar quadra:", error);
    }
  };

  return (
    <>
      <ProtectedAdminRoute>
        <NavMenu />
        <div className="p-8 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Administração
          </h1>

          {/* Formulário de cadastro */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 mb-10"
          >
            <h2 className="text-xl font-semibold mb-4">
              Cadastrar nova quadra
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "name", placeholder: "Nome da quadra" },
                { name: "address", placeholder: "Endereço" },
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
                <option value={0}>Vôlei</option>
                <option value={2}>Basquete</option>
              </select>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded w-fit"
                >
                  {!imagePreview ? "Selecionar imagem" : "Alterar imagem"}
                </label>

                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {imagePreview && (
                  <div className="relative border rounded overflow-hidden max-w-sm">
                    <img
                      src={imagePreview}
                      alt="Preview da imagem"
                      className="object-cover w-full max-h-64"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-qlc-primary text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Cadastrar quadra
            </button>
          </form>

          <h2 className="text-xl font-semibold mb-4">Quadras cadastradas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8 mt-6">
            {quadras.map((quadra) => (
              <Court
                key={quadra.id}
                quadra={quadra}
                adminPage
                name={quadra.name}
              />
            ))}
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
      </ProtectedAdminRoute>
    </>
  );
};

export default AdminPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavMenu } from "~/components/nav-menu";

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

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<CourtFormData>({
    name: "",
    address: "",
    type: 1,
    image: "",
  });

  const USERS_PER_PAGE = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("/api/users"); // ajuste o endpoint conforme sua API
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/courts", formData); // ajuste o endpoint conforme sua API
      alert("Quadra cadastrada com sucesso!");
      setFormData({ name: "", address: "", type: 1, image: "" });
    } catch (error) {
      console.error("Erro ao cadastrar quadra:", error);
    }
  };

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const displayedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <>
    <NavMenu/>
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Administração</h1>

        {/* Formulário para criar quadra */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-10"
        >
          <h2 className="text-xl font-semibold mb-4">Cadastrar nova quadra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nome da quadra"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Endereço"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="border rounded px-3 py-2"
            />
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
            <input
              type="text"
              name="image"
              placeholder="URL da imagem"
              value={formData.image}
              onChange={handleInputChange}
              className="border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Cadastrar quadra
          </button>
        </form>

        {/* Lista de usuários */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Usuários cadastrados</h2>
          <table className="w-full table-auto border-collapse mb-4">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="flex justify-center items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

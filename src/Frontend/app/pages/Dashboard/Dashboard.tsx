import { useState } from "react";
import logo from "~/welcome/assets/quadra-livre-crateus-logo.png";
import { Footer } from "~/components/footer";
import { NavMenu } from "~/components/nav-menu";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Exemplo de nome de usuário, substitua pelo valor real do seu store
  const userName = "Nome do Usuário";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavMenu />

      <div className="p-6">
        resto do conteúdo do dashboard
      </div>
    </div>
  );
};

export default Dashboard;
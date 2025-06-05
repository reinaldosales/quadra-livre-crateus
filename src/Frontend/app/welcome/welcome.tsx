import { useNavigate } from "react-router";
import logo from "~/welcome/assets/quadra-livre-crateus-logo.png";
import { Footer } from "~/components/footer";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cover bg-center flex bg-[linear-gradient(45deg,_theme('colors.qlc-tertiary'),_theme('colors.qlc-secondary'),_theme('colors.qlc-primary'))]">
      <div className="w-full md:w-1/3 bg-white/95 backdrop-blur-sm p-8 flex flex-col justify-center space-y-6 md:rounded-tr-2xl md:rounded-br-2xl min-h-screen">
        <div className="flex flex-col items-center space-y-4 mb-12">
          <img
            src={logo}
            alt="Quadra Livre Crateus Logo"
            className="w-24 h-24"
          />
          <h1 className="text-4xl font-bold text-qlc-primary">
            Seja bem-vindo ao Quadra Livre Crateús<script></script>!
          </h1>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-qlc-primary text-white py-2 px-4 rounded-lg hover:bg-qlc-secondary transition-colors"
          >
            Entrar
          </button>
          <button
            onClick={() => navigate("/register")}
            className="w-full bg-qlc-secondary text-white py-2 px-4 rounded-lg hover:bg-qlc-tertiary transition-colors"
          >
            Criar Conta
          </button>
        </div>

        <Footer className="text-xs text-center p-8 absolute bottom-0" />
      </div>
    </div>
  );
}

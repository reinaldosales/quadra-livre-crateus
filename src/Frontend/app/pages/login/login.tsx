import { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/authStore";
import logo from "~/welcome/assets/quadra-livre-crateus-logo.png";
import { Footer } from "~/components/footer";

export default function Login() {
  const navigate = useNavigate();
  const { error } = useAuthStore();
  const [localLoading, setLocalLoading] = useState(false);

  // Efeito para resetar qualquer estado persistido
  useEffect(() => {
    useAuthStore.setState({ loading: false });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setLocalLoading(true);
    try {
      await useAuthStore.getState().login(email, password);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex bg-[linear-gradient(45deg,_theme('colors.qlc-tertiary'),_theme('colors.qlc-secondary'),_theme('colors.qlc-primary'))]"
    // style={{
    //   backgroundImage: `url(${backgroundImage})`
    // }}
    >
      <div className="w-full md:w-1/3 bg-white/95 backdrop-blur-sm p-8 flex flex-col justify-center space-y-6 md:rounded-tr-2xl md:rounded-br-2xl min-h-screen">
        <div className="flex flex-col items-center space-y-4 mb-12">

          <h1 className="text-4xl font-bold text-qlc-primary">Seja bem-vindo ao Quadra Livre Crateús!</h1>

        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={localLoading}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              disabled={localLoading}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* TODO: Realizar criação da tela para Esqueci minha senha */}
          <div className="text-center">
            <a href="/forgotPassword" className="text-sm text-blue-600 hover:text-blue-800">
              Esqueci minha senha
            </a>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-qlc-primary text-white rounded-lg hover:bg-qlc-tertiary transition-colors"
              disabled={localLoading}
            >
              {localLoading ? "Entrando..." : "Entrar"}
            </button>

            {/* TODO: Criar componente */}
            <div className="flex items-center justify-center">
              <hr className="text-gray-500 w-25 m-2" />
              <div className="text-gray-500">ou</div>
              <hr className="text-gray-500 w-25 m-2" />
            </div>

            {/* TODO: Criar componente */}
            <button
              onClick={() => navigate('/register')}
              className="w-full py-3 bg-qlc-tertiary text-white rounded-lg hover:bg-qlc-primary transition-colors"
            >
              Criar uma conta
            </button>
          </div>
        </form>
        <Footer className="text-xs text-center p-8 absolute bottom-0" />
      </div>
    </div>


    // <div className="min-h-screen flex items-center justify-center bg-gray-50">
    //   <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
    //     <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign in</h2>
    //     {error && (
    //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
    //         {error}
    //       </div>
    //     )}
    //     <form onSubmit={handleSubmit} className="mt-8 space-y-6">
    //       <div>
    //         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    //           Email
    //         </label>
    //         <input
    //           id="email"
    //           name="email"
    //           type="email"
    //           required
    //           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //           disabled={localLoading}  // Usa estado local apenas
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    //           Password
    //         </label>
    //         <input
    //           id="password"
    //           name="password"
    //           type="password"
    //           required
    //           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    //           disabled={localLoading}  // Usa estado local apenas
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    //         disabled={localLoading}  // Usa estado local apenas
    //       >
    //         {localLoading ? 'Signing in...' : 'Sign in'}
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}
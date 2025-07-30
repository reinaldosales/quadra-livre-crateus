import { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/authStore";
import { Footer } from "~/components/footer";

const Register = () => {
  const navigate = useNavigate();
  const { error, register } = useAuthStore();
  const [localLoading, setLocalLoading] = useState(false);

  // Efeito para resetar qualquer estado persistido
  useEffect(() => {
    useAuthStore.setState({ loading: false });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const fullName = formData.get('fullName') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    setLocalLoading(true);

    try {
      var result = await register(email, password);
      navigate('/login');
    }
    catch (err: any) {
      let errorMsg = "Erro ao criar a conta. Tente novamente.";
      const apiErrors = err?.response?.data?.errors;
      if (apiErrors && typeof apiErrors === "object") {
        errorMsg = Object.values(apiErrors)
          .flat()
          .join(" ");
      }
      useAuthStore.setState({ error: errorMsg });
    }
    finally {
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
          <h1 className="text-4xl font-bold text-qlc-primary">Seja bem-vindo a Quadra Livre Crateús, vamos criar uma conta?</h1>
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
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              disabled={localLoading}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="text-center">
            <a href="/login" className="text-sm text-blue-600 hover:text-blue-800">
              Já tenho uma conta
            </a>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full py-3 bg-qlc-primary text-white rounded-lg hover:bg-qlc-tertiary transition-colors"
              disabled={localLoading}
            >
              {localLoading ? "Criando a conta..." : "Criar conta"}
            </button>
          </div>
        </form>

        <Footer className="text-xs text-center p-8 w-full" />
      </div>
    </div>
  )
}
export default Register;
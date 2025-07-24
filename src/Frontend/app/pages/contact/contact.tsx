import { NavMenu } from "~/components/nav-menu";

const Contact = () => {
  return (
    <>
      <NavMenu />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Fale Conosco
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Preencha o formulário com sua dúvida ou reclamação, iremos retornar
            seu e-mail assim que possível.
          </p>
          <form
            action="https://formsubmit.co/levirdev1@gmail.com"
            method="POST"
            target="_blank"
            className="space-y-6"
          >
            <input type="hidden" name="_captcha" value="false" />

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-qlc-secondary hover:bg-qlc-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-qlc-secondary transition-all"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;

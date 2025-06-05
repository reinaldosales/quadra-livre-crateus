import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import logo from "~/assets/logo-favicon.ico";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/x-icon",
    href: logo
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isAuthenticated, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  // Efeito para carregar o usuário ao montar o app
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Redirecionamento baseado no estado de autenticação
  useEffect(() => {
      if (isAuthenticated && ['/login', '/register', '/'].includes(window.location.pathname)) {
        navigate('/dashboard');
      } else if (!isAuthenticated && !['/login', '/register'].includes(window.location.pathname)) {
        navigate('/');
      }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { logout } = useAuthStore();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "Página não encontrada!"
        : error.statusText || details;

    // Logout se for erro 401 (não autorizado)
    if (error.status === 401) {
      logout();
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{message}</h1>
      <p className="text-lg mb-6">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded">
          <code>{stack}</code>
        </pre>
      )}
      <button
        onClick={() => window.location.href = '/'}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Voltar para a página inicial
      </button>
    </main>
  );
}
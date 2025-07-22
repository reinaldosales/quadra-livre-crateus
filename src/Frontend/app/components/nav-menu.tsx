import { useState } from "react";
import logo from "~/welcome/assets/quadra-livre-crateus-logo.png";
import { useAuthStore } from "~/stores/authStore";
import { useNavigate } from "react-router";

export function NavMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const userName = user?.email || "Usuário";
    
    const handleLogout = async () => {
        await logout();
        navigate('/');
    }

    return (
        <nav className="bg-qlc-secondary border-b border-qlc-primary">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="h-8 w-auto"
                            src={logo}
                            alt="Logo"
                        />
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href="/dashboard"
                            className="text-white hover:text-qlc-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Início
                        </a>
                        <a
                            href="/booking"
                            className="text-white hover:text-qlc-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Reservas
                        </a>
                        {/* Conta */}
                        <div className="relative">
                            <button
                                onClick={() => setAccountOpen(!accountOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <span className="text-white font-medium">{userName}</span>
                                <span className="border-1 border-white inline-flex items-center justify-center h-8 w-8 rounded-full bg-qlc-primary/20">
                                    <svg
                                        className="h-5 w-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </span>
                            </button>
                            {/* Submenu */}
                            {accountOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-qlc-primary rounded-md shadow-lg z-50">
                                    <div className="px-4 py-2 text-qlc-primary text-sm border-b">{userName}</div>
                                    <button
                                        className="w-full text-left px-4 py-2 text-qlc-primary hover:bg-qlc-secondary hover:text-white text-sm transition-colors"
                                        onClick={handleLogout}
                                    >
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white hover:text-qlc-primary focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-qlc-secondary">
                    <a
                        href="/dashboard"
                        className="block text-white hover:text-qlc-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
                    >
                        Início
                    </a>
                    <a
                        href="/booking"
                        className="block text-white hover:text-qlc-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
                    >
                        Reservas
                    </a>
                    <div className="border-t border-qlc-primary my-2"></div>
                    <div className="flex items-center space-x-2 px-3">
                        <span className="border-1 border-white text-white inline-flex items-center justify-center h-8 w-8 rounded-full bg-qlc-primary/20">
                            <svg
                                className="h-5 w-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </span>
                        <span className="text-white font-medium">{userName}</span>
                    </div>
                    <button
                        className="block w-full text-left text-qlc-primary hover:bg-qlc-secondary hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>
            )}
        </nav>
    );
}
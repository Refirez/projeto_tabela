"use client";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-lg">Tabela Periódica</div>
      <div className="space-x-6">
        <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
        {!user ? (
          <>
            <Link href="/cadastro" className="hover:text-yellow-300 transition">Cadastre-se</Link>
            <Link href="/login" className="hover:text-yellow-300 transition">Login</Link>
          </>
        ) : (
          <>
            <Link href="/perfil" className="hover:text-yellow-300 transition">Meu Perfil</Link>
            <button 
              onClick={logout} 
              className="hover:text-yellow-300 transition"
            >
              Sair
            </button>
          </>
        )}
        <Link href="/about" className="hover:text-yellow-300 transition">Sobre</Link>
      </div>
    </nav>
  );
}
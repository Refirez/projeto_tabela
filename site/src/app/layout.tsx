import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explorando a Tabela Periódica",
  description: "Guia interativo para compreender os elementos químicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* Navbar Global */}
        <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
          <div className="font-bold text-lg">Tabela Periódica</div>
          <div className="space-x-6">
            <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link href="/cadastro" className="hover:text-yellow-300 transition">Cadastre-se</Link>
            <Link href="/login" className="hover:text-yellow-300 transition">Login</Link>
            <Link href="/about" className="hover:text-yellow-300 transition">Sobre</Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}

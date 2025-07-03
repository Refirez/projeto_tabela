import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl bg-white/60 backdrop-blur-md p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Explorando a Tabela Periódica
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Um guia interativo para compreender os elementos químicos, suas propriedades e a organização da tabela periódica.
        </p>
      
          <a className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Começar Exploração
          </a>
       
      </div>
    </main>
  );
}

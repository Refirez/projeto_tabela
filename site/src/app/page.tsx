import Link from 'next/link'

const ELEMENTS = ['H', 'He', 'Li', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'];

export default function Home() {
  return (
    <>
     
        <main className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 overflow-hidden">
      {/* Partículas de símbolos químicos animados */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(25)].map((_, i) => {
          const symbol = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
          const size = Math.random() * 24 + 14; // 14 a 38 px
          const colorHue = Math.random() * 360;
          return (
            <span
              key={i}
              className="absolute font-semibold animate-float opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${size}px`,
                color: `hsl(${colorHue}, 70%, 50%)`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 5}s`,
                userSelect: 'none',
              }}
            >
              {symbol}
            </span>
          );
        })}
      </div>

      <div className="relative text-center max-w-2xl bg-white/80 backdrop-blur-md p-10 rounded-lg shadow-lg z-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Explorando a Tabela Periódica
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Um guia interativo para compreender os elementos químicos, suas propriedades e a organização da tabela periódica.
        </p>
        
          <Link 
          href="/tabela" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Começar Exploração
        </Link>
     
      </div>
    </main>
    </>
  );
};
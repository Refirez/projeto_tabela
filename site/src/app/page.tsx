export default function Home() {
  const elements = [
    // Posições distribuídas por toda a tela
    { symbol: "F", color: "text-blue-400", x: "10%", y: "15%" },
    { symbol: "C", color: "text-green-500", x: "85%", y: "20%" },
    { symbol: "B", color: "text-red-400", x: "15%", y: "80%" },
    { symbol: "K", color: "text-purple-400", x: "75%", y: "75%" },
    { symbol: "Si", color: "text-yellow-500", x: "50%", y: "10%" },
    { symbol: "Al", color: "text-indigo-400", x: "90%", y: "50%" },
    { symbol: "Na", color: "text-pink-400", x: "20%", y: "40%" },
    { symbol: "Tl", color: "text-teal-400", x: "80%", y: "85%" },
    { symbol: "Ca", color: "text-orange-400", x: "40%", y: "90%" },
    { symbol: "Fe", color: "text-gray-400", x: "60%", y: "30%" },
    { symbol: "Co", color: "text-blue-300", x: "30%", y: "60%" },
    { symbol: "N", color: "text-green-400", x: "70%", y: "40%" },
    { symbol: "Li", color: "text-red-300", x: "25%", y: "25%" },
    { symbol: "Cu", color: "text-purple-300", x: "65%", y: "65%" },
    { symbol: "S", color: "text-yellow-400", x: "45%", y: "55%" },
    { symbol: "Mn", color: "text-indigo-300", x: "55%", y: "75%" },
    { symbol: "Hg", color: "text-pink-300", x: "35%", y: "35%" },
    { symbol: "Mg", color: "text-teal-300", x: "85%", y: "30%" },
    { symbol: "Ni", color: "text-orange-300", x: "15%", y: "65%" },
    { symbol: "P", color: "text-gray-300", x: "75%", y: "10%" },
    { symbol: "Mo", color: "text-blue-200", x: "5%", y: "45%" },
    { symbol: "Li", color: "text-green-300", x: "95%", y: "70%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Elementos Flutuantes distribuídos por toda a tela */}
      {elements.map((element, index) => (
        <div
          key={index}
          className={`absolute text-3xl font-bold ${element.color} floating-element opacity-40 hover:opacity-80 transition-opacity cursor-pointer z-0`}
          style={{
            left: element.x,
            top: element.y,
            animationDelay: `${index * 4.5}s`,
          }}
        >
          {element.symbol}
        </div>
      ))}

      {/* Conteúdo Principal - NO CENTRO da tela */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-6">
            Tabela Periódica
          </h1>
          
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
              Explorando a<br />
              <span className="text-blue-600">Tabela Periódica</span>
            </h2>
          </div>

          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Um guia interativo para compreender os elementos químicos, suas propriedades e a organização da tabela periódica.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            Começar Exploração
          </button>
        </div>
      </div>
    </div>
  );
}
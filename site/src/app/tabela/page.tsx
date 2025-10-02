"use client";
import { useState } from "react";

// Dados completos dos 118 elementos
const ELEMENTS = [
  // Período 1
  { symbol: "H", name: "Hidrogênio", number: 1, mass: "1.008", family: "nao-metais", group: 1, period: 1 },
  { symbol: "He", name: "Hélio", number: 2, mass: "4.0026", family: "gases-nobres", group: 18, period: 1 },
  
  // Período 2
  { symbol: "Li", name: "Lítio", number: 3, mass: "6.94", family: "metais-alcalinos", group: 1, period: 2 },
  { symbol: "Be", name: "Berílio", number: 4, mass: "9.0122", family: "metais-alcalino-terrosos", group: 2, period: 2 },
  { symbol: "B", name: "Boro", number: 5, mass: "10.81", family: "semimetais", group: 13, period: 2 },
  { symbol: "C", name: "Carbono", number: 6, mass: "12.011", family: "nao-metais", group: 14, period: 2 },
  { symbol: "N", name: "Nitrogênio", number: 7, mass: "14.007", family: "nao-metais", group: 15, period: 2 },
  { symbol: "O", name: "Oxigênio", number: 8, mass: "15.999", family: "nao-metais", group: 16, period: 2 },
  { symbol: "F", name: "Flúor", number: 9, mass: "18.998", family: "halogenios", group: 17, period: 2 },
  { symbol: "Ne", name: "Neônio", number: 10, mass: "20.180", family: "gases-nobres", group: 18, period: 2 },
  
  // Período 3
  { symbol: "Na", name: "Sódio", number: 11, mass: "22.990", family: "metais-alcalinos", group: 1, period: 3 },
  { symbol: "Mg", name: "Magnésio", number: 12, mass: "24.305", family: "metais-alcalino-terrosos", group: 2, period: 3 },
  { symbol: "Al", name: "Alumínio", number: 13, mass: "26.982", family: "metais-representativos", group: 13, period: 3 },
  { symbol: "Si", name: "Silício", number: 14, mass: "28.085", family: "semimetais", group: 14, period: 3 },
  { symbol: "P", name: "Fósforo", number: 15, mass: "30.974", family: "nao-metais", group: 15, period: 3 },
  { symbol: "S", name: "Enxofre", number: 16, mass: "32.06", family: "nao-metais", group: 16, period: 3 },
  { symbol: "Cl", name: "Cloro", number: 17, mass: "35.45", family: "halogenios", group: 17, period: 3 },
  { symbol: "Ar", name: "Argônio", number: 18, mass: "39.948", family: "gases-nobres", group: 18, period: 3 },
  
  // Período 4
  { symbol: "K", name: "Potássio", number: 19, mass: "39.098", family: "metais-alcalinos", group: 1, period: 4 },
  { symbol: "Ca", name: "Cálcio", number: 20, mass: "40.078", family: "metais-alcalino-terrosos", group: 2, period: 4 },
  { symbol: "Sc", name: "Escândio", number: 21, mass: "44.956", family: "metais-transicao", group: 3, period: 4 },
  { symbol: "Ti", name: "Titânio", number: 22, mass: "47.867", family: "metais-transicao", group: 4, period: 4 },
  { symbol: "V", name: "Vanádio", number: 23, mass: "50.942", family: "metais-transicao", group: 5, period: 4 },
  { symbol: "Cr", name: "Cromo", number: 24, mass: "51.996", family: "metais-transicao", group: 6, period: 4 },
  { symbol: "Mn", name: "Manganês", number: 25, mass: "54.938", family: "metais-transicao", group: 7, period: 4 },
  { symbol: "Fe", name: "Ferro", number: 26, mass: "55.845", family: "metais-transicao", group: 8, period: 4 },
  { symbol: "Co", name: "Cobalto", number: 27, mass: "58.933", family: "metais-transicao", group: 9, period: 4 },
  { symbol: "Ni", name: "Níquel", number: 28, mass: "58.693", family: "metais-transicao", group: 10, period: 4 },
  { symbol: "Cu", name: "Cobre", number: 29, mass: "63.546", family: "metais-transicao", group: 11, period: 4 },
  { symbol: "Zn", name: "Zinco", number: 30, mass: "65.38", family: "metais-transicao", group: 12, period: 4 },
  { symbol: "Ga", name: "Gálio", number: 31, mass: "69.723", family: "metais-representativos", group: 13, period: 4 },
  { symbol: "Ge", name: "Germânio", number: 32, mass: "72.630", family: "semimetais", group: 14, period: 4 },
  { symbol: "As", name: "Arsênio", number: 33, mass: "74.922", family: "semimetais", group: 15, period: 4 },
  { symbol: "Se", name: "Selênio", number: 34, mass: "78.971", family: "nao-metais", group: 16, period: 4 },
  { symbol: "Br", name: "Bromo", number: 35, mass: "79.904", family: "halogenios", group: 17, period: 4 },
  { symbol: "Kr", name: "Criptônio", number: 36, mass: "83.798", family: "gases-nobres", group: 18, period: 4 },
  
  // Período 5
  { symbol: "Rb", name: "Rubídio", number: 37, mass: "85.468", family: "metais-alcalinos", group: 1, period: 5 },
  { symbol: "Sr", name: "Estrôncio", number: 38, mass: "87.62", family: "metais-alcalino-terrosos", group: 2, period: 5 },
  { symbol: "Y", name: "Ítrio", number: 39, mass: "88.906", family: "metais-transicao", group: 3, period: 5 },
  { symbol: "Zr", name: "Zircônio", number: 40, mass: "91.224", family: "metais-transicao", group: 4, period: 5 },
  { symbol: "Nb", name: "Nióbio", number: 41, mass: "92.906", family: "metais-transicao", group: 5, period: 5 },
  { symbol: "Mo", name: "Molibdênio", number: 42, mass: "95.95", family: "metais-transicao", group: 6, period: 5 },
  { symbol: "Tc", name: "Tecnécio", number: 43, mass: "98", family: "metais-transicao", group: 7, period: 5 },
  { symbol: "Ru", name: "Rutênio", number: 44, mass: "101.07", family: "metais-transicao", group: 8, period: 5 },
  { symbol: "Rh", name: "Ródio", number: 45, mass: "102.91", family: "metais-transicao", group: 9, period: 5 },
  { symbol: "Pd", name: "Paládio", number: 46, mass: "106.42", family: "metais-transicao", group: 10, period: 5 },
  { symbol: "Ag", name: "Prata", number: 47, mass: "107.87", family: "metais-transicao", group: 11, period: 5 },
  { symbol: "Cd", name: "Cádmio", number: 48, mass: "112.41", family: "metais-transicao", group: 12, period: 5 },
  { symbol: "In", name: "Índio", number: 49, mass: "114.82", family: "metais-representativos", group: 13, period: 5 },
  { symbol: "Sn", name: "Estanho", number: 50, mass: "118.71", family: "metais-representativos", group: 14, period: 5 },
  { symbol: "Sb", name: "Antimônio", number: 51, mass: "121.76", family: "semimetais", group: 15, period: 5 },
  { symbol: "Te", name: "Telúrio", number: 52, mass: "127.60", family: "semimetais", group: 16, period: 5 },
  { symbol: "I", name: "Iodo", number: 53, mass: "126.90", family: "halogenios", group: 17, period: 5 },
  { symbol: "Xe", name: "Xenônio", number: 54, mass: "131.29", family: "gases-nobres", group: 18, period: 5 },
  
  // Período 6
  { symbol: "Cs", name: "Césio", number: 55, mass: "132.91", family: "metais-alcalinos", group: 1, period: 6 },
  { symbol: "Ba", name: "Bário", number: 56, mass: "137.33", family: "metais-alcalino-terrosos", group: 2, period: 6 },
  { symbol: "La", name: "Lantânio", number: 57, mass: "138.91", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Hf", name: "Háfnio", number: 72, mass: "178.49", family: "metais-transicao", group: 4, period: 6 },
  { symbol: "Ta", name: "Tântalo", number: 73, mass: "180.95", family: "metais-transicao", group: 5, period: 6 },
  { symbol: "W", name: "Tungstênio", number: 74, mass: "183.84", family: "metais-transicao", group: 6, period: 6 },
  { symbol: "Re", name: "Rênio", number: 75, mass: "186.21", family: "metais-transicao", group: 7, period: 6 },
  { symbol: "Os", name: "Ósmio", number: 76, mass: "190.23", family: "metais-transicao", group: 8, period: 6 },
  { symbol: "Ir", name: "Irídio", number: 77, mass: "192.22", family: "metais-transicao", group: 9, period: 6 },
  { symbol: "Pt", name: "Platina", number: 78, mass: "195.08", family: "metais-transicao", group: 10, period: 6 },
  { symbol: "Au", name: "Ouro", number: 79, mass: "196.97", family: "metais-transicao", group: 11, period: 6 },
  { symbol: "Hg", name: "Mercúrio", number: 80, mass: "200.59", family: "metais-transicao", group: 12, period: 6 },
  { symbol: "Tl", name: "Tálio", number: 81, mass: "204.38", family: "metais-representativos", group: 13, period: 6 },
  { symbol: "Pb", name: "Chumbo", number: 82, mass: "207.2", family: "metais-representativos", group: 14, period: 6 },
  { symbol: "Bi", name: "Bismuto", number: 83, mass: "208.98", family: "metais-representativos", group: 15, period: 6 },
  { symbol: "Po", name: "Polônio", number: 84, mass: "209", family: "semimetais", group: 16, period: 6 },
  { symbol: "At", name: "Astato", number: 85, mass: "210", family: "halogenios", group: 17, period: 6 },
  { symbol: "Rn", name: "Radônio", number: 86, mass: "222", family: "gases-nobres", group: 18, period: 6 },
  
  // Período 7
  { symbol: "Fr", name: "Frâncio", number: 87, mass: "223", family: "metais-alcalinos", group: 1, period: 7 },
  { symbol: "Ra", name: "Rádio", number: 88, mass: "226", family: "metais-alcalino-terrosos", group: 2, period: 7 },
  { symbol: "Ac", name: "Actínio", number: 89, mass: "227", family: "actinideos", group: 3, period: 7 },
  { symbol: "Rf", name: "Rutherfórdio", number: 104, mass: "267", family: "metais-transicao", group: 4, period: 7 },
  { symbol: "Db", name: "Dúbnio", number: 105, mass: "268", family: "metais-transicao", group: 5, period: 7 },
  { symbol: "Sg", name: "Seabórgio", number: 106, mass: "269", family: "metais-transicao", group: 6, period: 7 },
  { symbol: "Bh", name: "Bóhrio", number: 107, mass: "270", family: "metais-transicao", group: 7, period: 7 },
  { symbol: "Hs", name: "Hássio", number: 108, mass: "269", family: "metais-transicao", group: 8, period: 7 },
  { symbol: "Mt", name: "Meitnério", number: 109, mass: "278", family: "metais-transicao", group: 9, period: 7 },
  { symbol: "Ds", name: "Darmstádtio", number: 110, mass: "281", family: "metais-transicao", group: 10, period: 7 },
  { symbol: "Rg", name: "Roentgênio", number: 111, mass: "282", family: "metais-transicao", group: 11, period: 7 },
  { symbol: "Cn", name: "Copernício", number: 112, mass: "285", family: "metais-transicao", group: 12, period: 7 },
  { symbol: "Nh", name: "Nihônio", number: 113, mass: "286", family: "metais-representativos", group: 13, period: 7 },
  { symbol: "Fl", name: "Fleróvio", number: 114, mass: "289", family: "metais-representativos", group: 14, period: 7 },
  { symbol: "Mc", name: "Moscóvio", number: 115, mass: "290", family: "metais-representativos", group: 15, period: 7 },
  { symbol: "Lv", name: "Livermório", number: 116, mass: "293", family: "metais-representativos", group: 16, period: 7 },
  { symbol: "Ts", name: "Tennesso", number: 117, mass: "294", family: "halogenios", group: 17, period: 7 },
  { symbol: "Og", name: "Oganessônio", number: 118, mass: "294", family: "gases-nobres", group: 18, period: 7 },
  
  // Lantanídeos
  { symbol: "Ce", name: "Cério", number: 58, mass: "140.12", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Pr", name: "Praseodímio", number: 59, mass: "140.91", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Nd", name: "Neodímio", number: 60, mass: "144.24", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Pm", name: "Promécio", number: 61, mass: "145", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Sm", name: "Samário", number: 62, mass: "150.36", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Eu", name: "Európio", number: 63, mass: "151.96", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Gd", name: "Gadolínio", number: 64, mass: "157.25", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Tb", name: "Térbio", number: 65, mass: "158.93", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Dy", name: "Disprósio", number: 66, mass: "162.50", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Ho", name: "Hólmio", number: 67, mass: "164.93", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Er", name: "Érbio", number: 68, mass: "167.26", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Tm", name: "Túlio", number: 69, mass: "168.93", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Yb", name: "Itérbio", number: 70, mass: "173.05", family: "lantanideos", group: 3, period: 6 },
  { symbol: "Lu", name: "Lutécio", number: 71, mass: "174.97", family: "lantanideos", group: 3, period: 6 },
  
  // Actinídeos
  { symbol: "Th", name: "Tório", number: 90, mass: "232.04", family: "actinideos", group: 3, period: 7 },
  { symbol: "Pa", name: "Protactínio", number: 91, mass: "231.04", family: "actinideos", group: 3, period: 7 },
  { symbol: "U", name: "Urânio", number: 92, mass: "238.03", family: "actinideos", group: 3, period: 7 },
  { symbol: "Np", name: "Netúnio", number: 93, mass: "237", family: "actinideos", group: 3, period: 7 },
  { symbol: "Pu", name: "Plutônio", number: 94, mass: "244", family: "actinideos", group: 3, period: 7 },
  { symbol: "Am", name: "Amerício", number: 95, mass: "243", family: "actinideos", group: 3, period: 7 },
  { symbol: "Cm", name: "Cúrio", number: 96, mass: "247", family: "actinideos", group: 3, period: 7 },
  { symbol: "Bk", name: "Berquélio", number: 97, mass: "247", family: "actinideos", group: 3, period: 7 },
  { symbol: "Cf", name: "Califórnio", number: 98, mass: "251", family: "actinideos", group: 3, period: 7 },
  { symbol: "Es", name: "Einstênio", number: 99, mass: "252", family: "actinideos", group: 3, period: 7 },
  { symbol: "Fm", name: "Férmio", number: 100, mass: "257", family: "actinideos", group: 3, period: 7 },
  { symbol: "Md", name: "Mendelévio", number: 101, mass: "258", family: "actinideos", group: 3, period: 7 },
  { symbol: "No", name: "Nobélio", number: 102, mass: "259", family: "actinideos", group: 3, period: 7 },
  { symbol: "Lr", name: "Laurêncio", number: 103, mass: "262", family: "actinideos", group: 3, period: 7 },
];

const FAMILY_COLORS = {
  "metais-alcalinos": "bg-red-200 border-red-500 hover:bg-red-300",
  "metais-alcalino-terrosos": "bg-orange-200 border-orange-500 hover:bg-orange-300",
  "metais-transicao": "bg-yellow-200 border-yellow-500 hover:bg-yellow-300",
  "metais-representativos": "bg-blue-200 border-blue-500 hover:bg-blue-300",
  "semimetais": "bg-green-200 border-green-500 hover:bg-green-300",
  "nao-metais": "bg-purple-200 border-purple-500 hover:bg-purple-300",
  "halogenios": "bg-pink-200 border-pink-500 hover:bg-pink-300",
  "gases-nobres": "bg-indigo-200 border-indigo-500 hover:bg-indigo-300",
  "lantanideos": "bg-teal-200 border-teal-500 hover:bg-teal-300",
  "actinideos": "bg-cyan-200 border-cyan-500 hover:bg-cyan-300",
};

export default function TabelaPeriodica() {
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [selectedFamily, setSelectedFamily] = useState<string>("all");

  const families = [
    { id: "all", name: "Todos os Elementos", color: "bg-gray-200" },
    { id: "metais-alcalinos", name: "Metais Alcalinos", color: "bg-red-200" },
    { id: "metais-alcalino-terrosos", name: "Metais Alcalino-Terrosos", color: "bg-orange-200" },
    { id: "metais-transicao", name: "Metais de Transição", color: "bg-yellow-200" },
    { id: "metais-representativos", name: "Metais Representativos", color: "bg-blue-200" },
    { id: "semimetais", name: "Semimetais", color: "bg-green-200" },
    { id: "nao-metais", name: "Não Metais", color: "bg-purple-200" },
    { id: "halogenios", name: "Halogênios", color: "bg-pink-200" },
    { id: "gases-nobres", name: "Gases Nobres", color: "bg-indigo-200" },
    { id: "lantanideos", name: "Lantanídeos", color: "bg-teal-200" },
    { id: "actinideos", name: "Actinídeos", color: "bg-cyan-200" },
  ];

  const filteredElements = selectedFamily === "all" 
    ? ELEMENTS 
    : ELEMENTS.filter(el => el.family === selectedFamily);

  // Função para encontrar elemento por grupo e período
  const getElement = (group: number, period: number) => {
    return ELEMENTS.find(el => el.group === group && el.period === period);
  };

  // Função para elementos dos lantanídeos e actinídeos
  const getLanthanides = () => ELEMENTS.filter(el => el.family === "lantanideos");
  const getActinides = () => ELEMENTS.filter(el => el.family === "actinideos");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
          Tabela Periódica Completa
        </h1>
        <p className="text-center text-gray-600 mb-8">
          
        </p>

        {/* Filtros por Família */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {families.map(family => (
            <button
              key={family.id}
              onClick={() => setSelectedFamily(family.id)}
              className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                selectedFamily === family.id 
                  ? 'ring-2 ring-blue-500 transform scale-105 shadow-lg' 
                  : 'opacity-80 hover:opacity-100 shadow'
              } ${family.color}`}
            >
              {family.name}
            </button>
          ))}
        </div>

        {/* Tabela Periódica Principal */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          {/* Cabeçalho dos Grupos */}
          <div className="grid grid-cols-18 gap-1 mb-1 ml-16">
            {Array.from({ length: 18 }, (_, i) => i + 1).map(group => (
              <div key={group} className="text-center text-xs font-bold text-gray-600">
                {group}
              </div>
            ))}
          </div>

          {/* Corpo da Tabela */}
          {[1, 2, 3, 4, 5, 6, 7].map(period => (
            <div key={period} className="flex gap-1 mb-1">
              <div className="w-16 flex items-center justify-center text-sm font-bold text-gray-600">
                {period}
              </div>
              <div className="grid grid-cols-18 gap-1 flex-1">
                {Array.from({ length: 18 }, (_, i) => i + 1).map(group => {
                  const element = getElement(group, period);
                  if (element) {
                    const isFiltered = filteredElements.includes(element);
                    return (
                      <button
                        key={`${period}-${group}`}
                        onClick={() => setSelectedElement(element)}
                        className={`
                          w-full aspect-square rounded border-2 flex flex-col items-center justify-center 
                          transition-all cursor-pointer font-bold text-xs
                          ${isFiltered 
                            ? 'hover:scale-110 ' + FAMILY_COLORS[element.family as keyof typeof FAMILY_COLORS]
                            : 'opacity-40 bg-gray-100 border-gray-300'
                          }
                        `}
                      >
                        <span className="text-[10px]">{element.number}</span>
                        <span className="text-sm">{element.symbol}</span>
                      </button>
                    );
                  }
                  return <div key={`${period}-${group}`} className="aspect-square" />;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Série dos Lantanídeos e Actinídeos */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Lantanídeos */}
          <div className="bg-white rounded-2xl shadow-2xl p-4">
            <h3 className="text-center font-bold text-gray-700 mb-2">Lantanídeos</h3>
            <div className="grid grid-cols-8 gap-1">
              {getLanthanides().map(element => {
                const isFiltered = filteredElements.includes(element);
                return (
                  <button
                    key={element.number}
                    onClick={() => setSelectedElement(element)}
                    className={`
                      aspect-square rounded border-2 flex flex-col items-center justify-center 
                      transition-all cursor-pointer font-bold text-xs
                      ${isFiltered 
                        ? 'hover:scale-110 ' + FAMILY_COLORS[element.family as keyof typeof FAMILY_COLORS]
                        : 'opacity-40 bg-gray-100 border-gray-300'
                      }
                    `}
                  >
                    <span className="text-[10px]">{element.number}</span>
                    <span className="text-sm">{element.symbol}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actinídeos */}
          <div className="bg-white rounded-2xl shadow-2xl p-4">
            <h3 className="text-center font-bold text-gray-700 mb-2">Actinídeos</h3>
            <div className="grid grid-cols-8 gap-1">
              {getActinides().map(element => {
                const isFiltered = filteredElements.includes(element);
                return (
                  <button
                    key={element.number}
                    onClick={() => setSelectedElement(element)}
                    className={`
                      aspect-square rounded border-2 flex flex-col items-center justify-center 
                      transition-all cursor-pointer font-bold text-xs
                      ${isFiltered 
                        ? 'hover:scale-110 ' + FAMILY_COLORS[element.family as keyof typeof FAMILY_COLORS]
                        : 'opacity-40 bg-gray-100 border-gray-300'
                      }
                    `}
                  >
                    <span className="text-[10px]">{element.number}</span>
                    <span className="text-sm">{element.symbol}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedElement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedElement.name}
                </h2>
                <button
                  onClick={() => setSelectedElement(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className={`p-4 rounded-lg mb-4 ${
                FAMILY_COLORS[selectedElement.family as keyof typeof FAMILY_COLORS] || "bg-gray-200"
              }`}>
                <div className="text-center">
                  <span className="text-5xl font-bold block mb-2">
                    {selectedElement.symbol}
                  </span>
                  <span className="text-lg">
                    Número Atômico: {selectedElement.number}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Massa Atômica:</span>
                  <span>{selectedElement.mass} u</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Família:</span>
                  <span className="capitalize">
                    {selectedElement.family.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Grupo:</span>
                  <span>{selectedElement.group}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Período:</span>
                  <span>{selectedElement.period}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedElement(null)}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg 
                         hover:bg-blue-700 transition font-semibold"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
"use client";
import Link from "next/link";
import { useMemo } from "react";

const ELEMENTS = [
  "H","He","Li","Be","B","C","N","O","F","Ne",
  "Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Fm","Fe"
];

export default function Home() {
  const spiralElements = useMemo(() => {
    const items = [];
    const centerX = 250;
    const centerY = 250;
    const spacing = 25; // controla a distância entre as voltas
    const angleStep = 0.5; // controla o "aperto" da espiral

    for (let i = 0; i < ELEMENTS.length; i++) {
      const angle = i * angleStep;
      const radius = spacing * angle;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      items.push({ symbol: ELEMENTS[i], x, y });
    }
    return items;
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Explorando a Tabela Periódica
      </h1>

      <div className="relative w-[500px] h-[500px]">
        {spiralElements.map((el, i) => (
          <span
            key={i}
            className="absolute font-bold text-sm cursor-pointer hover:scale-125 transition-transform"
            style={{
              left: `${el.x}px`,
              top: `${el.y}px`,
              transform: "translate(-50%, -50%)", // centraliza cada elemento
              color: `hsl(${(i * 40) % 360},70%,40%)`,
            }}
          >
            {el.symbol}
          </span>
        ))}

        {/* Bola clicável no centro */}
        <Link
          href="/tabela"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer 
                    shadow-lg flex items-center justify-center transition"
        />
      </div>
    </main>
  );
}

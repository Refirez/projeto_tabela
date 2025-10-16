"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

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

    const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setIsTransitioning(true);

    setTimeout(() => {
      router.push("/tabela");
    }, 1600); // tempo pra animação terminar
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white">
      {/* Átomos flutuando */}
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute text-2xl md:text-3xl font-bold ${el.color} opacity-30`}
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {el.symbol}
        </motion.div>
      ))}

      {/* Conteúdo central */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-6"
        >
          Exploração Química
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-xl text-lg md:text-xl text-blue-200 mb-10"
        >
          Embarque em uma jornada interativa pelos elementos químicos.
          Descubra as propriedades, estruturas e reações que moldam o universo.
        </motion.p>

        <motion.button
          ref={buttonRef}
          onClick={handleClick}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px #60a5fa" }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-12 py-4 rounded-2xl text-xl font-semibold shadow-lg overflow-hidden"
        >
          <span className="relative z-10">Iniciar Exploração</span>

          {/* Efeito pulsante dentro do botão */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 opacity-30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </div>

      {/* Portal químico */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0.8,
              x: buttonPosition.x - window.innerWidth / 2,
              y: buttonPosition.y - window.innerHeight / 2,
            }}
            animate={{
              scale: 60,
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="fixed top-1/2 left-1/2 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,1)_0%,_rgba(99,102,241,1)_40%,_rgba(147,51,234,1)_80%)] z-50 rounded-full w-48 h-48 blur-lg"
            style={{ transformOrigin: "center" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
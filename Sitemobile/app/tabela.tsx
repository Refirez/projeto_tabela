"use client";
import { useState, useEffect } from "react";
import React from 'react';
import { GlobalStyles } from '@/constants/GlobalStyles';

// ... (seus dados ELEMENTS e FAMILY_COLORS permanecem iguais) ...

export default function TabelaScreen() {
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHorizontal, setIsHorizontal] = useState(false);

  // Detectar orientação da tela
  useEffect(() => {
    const checkOrientation = () => {
      setIsHorizontal(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const filteredElements = ELEMENTS.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.number.toString().includes(searchTerm)
  );

  // Agrupar elementos por período para layout tradicional
  const elementsByPeriod: { [key: number]: any[] } = {};
  ELEMENTS.forEach(element => {
    if (!elementsByPeriod[element.period]) {
      elementsByPeriod[element.period] = [];
    }
    elementsByPeriod[element.period].push(element);
  });

  return (
    <div className={GlobalStyles.table.container}>
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <h1 className={GlobalStyles.table.header}>
            Tabela Periódica
          </h1>
          
          {/* Barra de Pesquisa */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Pesquisar elemento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={GlobalStyles.table.searchInput}
            />
          </div>
        </div>

        {/* Aviso de orientação */}
        {!isHorizontal && (
          <div className={GlobalStyles.table.orientationWarning}>
            <p className="text-sm">📱 <strong>Dica:</strong> Vire o celular na horizontal para melhor visualização</p>
          </div>
        )}

        {/* Modo Pesquisa */}
        {searchTerm && (
          <div className="mb-4">
            <div className={GlobalStyles.table.grid}>
              {filteredElements.map((element) => (
                <ElementCard 
                  key={element.number} 
                  element={element} 
                  onClick={() => setSelectedElement(element)}
                />
              ))}
            </div>
            <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
              {filteredElements.length} elemento(s) encontrado(s)
            </div>
          </div>
        )}

        {/* Tabela Periódica Tradicional */}
        {!searchTerm && (
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Períodos 1-7 */}
              {[1, 2, 3, 4, 5, 6, 7].map(period => (
                <div key={period} className="flex gap-1 mb-1">
                  <div className="w-8 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
                    {period}
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 18 }, (_, i) => i + 1).map(group => {
                      const element = ELEMENTS.find(el => el.period === period && el.group === group);
                      return element ? (
                        <ElementCard 
                          key={element.number} 
                          element={element} 
                          onClick={() => setSelectedElement(element)}
                          compact
                        />
                      ) : (
                        <div key={`${period}-${group}`} className="w-10 h-10 sm:w-12 sm:h-12" />
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Lantanídeos e Actinídeos */}
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <div className="text-center text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    Lantanídeos
                  </div>
                  <div className="flex gap-1 justify-center">
                    {ELEMENTS.filter(el => el.family === 'lantanideos').map(element => (
                      <ElementCard 
                        key={element.number} 
                        element={element} 
                        onClick={() => setSelectedElement(element)}
                        compact
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                    Actinídeos
                  </div>
                  <div className="flex gap-1 justify-center">
                    {ELEMENTS.filter(el => el.family === 'actinideos').map(element => (
                      <ElementCard 
                        key={element.number} 
                        element={element} 
                        onClick={() => setSelectedElement(element)}
                        compact
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalhes */}
        {selectedElement && (
          <ElementModal 
            element={selectedElement} 
            onClose={() => setSelectedElement(null)} 
          />
        )}
      </div>
    </div>
  );
}

// Componente de Card do Elemento (MODIFICADO)
function ElementCard({ element, onClick, compact = false }: { element: any; onClick: () => void; compact?: boolean }) {
  const familyColor = FAMILY_COLORS[element.family as keyof typeof FAMILY_COLORS] || "bg-gray-200 border-gray-400 text-gray-800";
  
  return (
    <button
      onClick={onClick}
      className={`
        ${GlobalStyles.element.card(familyColor)}
        ${compact ? GlobalStyles.element.cardCompact : GlobalStyles.element.cardNormal}
      `}
    >
      {!compact && (
        <div className={GlobalStyles.element.number}>
          {element.number}
        </div>
      )}
      <div className={GlobalStyles.element.symbol(compact)}>
        {element.symbol}
      </div>
      {!compact && (
        <div className={GlobalStyles.element.name}>
          {element.name}
        </div>
      )}
    </button>
  );
}

// Componente do Modal (MODIFICADO)
function ElementModal({ element, onClose }: { element: any; onClose: () => void }) {
  const familyColor = FAMILY_COLORS[element.family as keyof typeof FAMILY_COLORS] || "bg-gray-200";

  return (
    <div className={GlobalStyles.modal.overlay}>
      <div className={GlobalStyles.modal.container}>
        <div className="flex justify-between items-start mb-4">
          <h2 className={GlobalStyles.modal.header}>
            {element.name}
          </h2>
          <button
            onClick={onClose}
            className={GlobalStyles.modal.closeButton}
          >
            ×
          </button>
        </div>

        <div className={GlobalStyles.modal.content(familyColor)}>
          <div className="text-5xl font-bold mb-2">
            {element.symbol}
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-400">
            Número Atômico: {element.number}
          </div>
        </div>

        <div className="space-y-3">
          <div className={GlobalStyles.modal.detailRow}>
            <span className="font-semibold text-gray-800 dark:text-white">Massa Atômica:</span>
            <span className="text-gray-600 dark:text-gray-300">{element.mass} u</span>
          </div>
          <div className={GlobalStyles.modal.detailRow}>
            <span className="font-semibold text-gray-800 dark:text-white">Família:</span>
            <span className="text-gray-600 dark:text-gray-300 capitalize">{element.family.replace('-', ' ')}</span>
          </div>
          <div className={GlobalStyles.modal.detailRow}>
            <span className="font-semibold text-gray-800 dark:text-white">Grupo:</span>
            <span className="text-gray-600 dark:text-gray-300">{element.group}</span>
          </div>
          <div className={GlobalStyles.modal.detailRow}>
            <span className="font-semibold text-gray-800 dark:text-white">Período:</span>
            <span className="text-gray-600 dark:text-gray-300">{element.period}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className={GlobalStyles.modal.actionButton}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
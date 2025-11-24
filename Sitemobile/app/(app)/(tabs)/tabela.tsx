import React, { useEffect, useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

// DADOS COMPLETOS DA TABELA PERIÓDICA
const ELEMENTS = [
  // Período 1
  { number: 1, symbol: "H", name: "Hidrogênio", mass: "1.008", family: "nao-metais", group: 1, period: 1 },
  { number: 2, symbol: "He", name: "Hélio", mass: "4.0026", family: "gases-nobres", group: 18, period: 1 },
  
  // Período 2
  { number: 3, symbol: "Li", name: "Lítio", mass: "6.94", family: "metais-alcalinos", group: 1, period: 2 },
  { number: 4, symbol: "Be", name: "Berílio", mass: "9.0122", family: "metais-alcalino-terrosos", group: 2, period: 2 },
  { number: 5, symbol: "B", name: "Boro", mass: "10.81", family: "semimetais", group: 13, period: 2 },
  { number: 6, symbol: "C", name: "Carbono", mass: "12.011", family: "nao-metais", group: 14, period: 2 },
  { number: 7, symbol: "N", name: "Nitrogênio", mass: "14.007", family: "nao-metais", group: 15, period: 2 },
  { number: 8, symbol: "O", name: "Oxigênio", mass: "15.999", family: "nao-metais", group: 16, period: 2 },
  { number: 9, symbol: "F", name: "Flúor", mass: "18.998", family: "halogenios", group: 17, period: 2 },
  { number: 10, symbol: "Ne", name: "Neônio", mass: "20.180", family: "gases-nobres", group: 18, period: 2 },
  
  // Período 3
  { number: 11, symbol: "Na", name: "Sódio", mass: "22.990", family: "metais-alcalinos", group: 1, period: 3 },
  { number: 12, symbol: "Mg", name: "Magnésio", mass: "24.305", family: "metais-alcalino-terrosos", group: 2, period: 3 },
  { number: 13, symbol: "Al", name: "Alumínio", mass: "26.982", family: "metais-representativos", group: 13, period: 3 },
  { number: 14, symbol: "Si", name: "Silício", mass: "28.085", family: "semimetais", group: 14, period: 3 },
  { number: 15, symbol: "P", name: "Fósforo", mass: "30.974", family: "nao-metais", group: 15, period: 3 },
  { number: 16, symbol: "S", name: "Enxofre", mass: "32.06", family: "nao-metais", group: 16, period: 3 },
  { number: 17, symbol: "Cl", name: "Cloro", mass: "35.45", family: "halogenios", group: 17, period: 3 },
  { number: 18, symbol: "Ar", name: "Argônio", mass: "39.948", family: "gases-nobres", group: 18, period: 3 },
  
  // Período 4
  { number: 19, symbol: "K", name: "Potássio", mass: "39.098", family: "metais-alcalinos", group: 1, period: 4 },
  { number: 20, symbol: "Ca", name: "Cálcio", mass: "40.078", family: "metais-alcalino-terrosos", group: 2, period: 4 },
  { number: 21, symbol: "Sc", name: "Escândio", mass: "44.956", family: "metais-transicao", group: 3, period: 4 },
  { number: 22, symbol: "Ti", name: "Titânio", mass: "47.867", family: "metais-transicao", group: 4, period: 4 },
  { number: 23, symbol: "V", name: "Vanádio", mass: "50.942", family: "metais-transicao", group: 5, period: 4 },
  { number: 24, symbol: "Cr", name: "Cromo", mass: "51.996", family: "metais-transicao", group: 6, period: 4 },
  { number: 25, symbol: "Mn", name: "Manganês", mass: "54.938", family: "metais-transicao", group: 7, period: 4 },
  { number: 26, symbol: "Fe", name: "Ferro", mass: "55.845", family: "metais-transicao", group: 8, period: 4 },
  { number: 27, symbol: "Co", name: "Cobalto", mass: "58.933", family: "metais-transicao", group: 9, period: 4 },
  { number: 28, symbol: "Ni", name: "Níquel", mass: "58.693", family: "metais-transicao", group: 10, period: 4 },
  { number: 29, symbol: "Cu", name: "Cobre", mass: "63.546", family: "metais-transicao", group: 11, period: 4 },
  { number: 30, symbol: "Zn", name: "Zinco", mass: "65.38", family: "metais-transicao", group: 12, period: 4 },
  { number: 31, symbol: "Ga", name: "Gálio", mass: "69.723", family: "metais-representativos", group: 13, period: 4 },
  { number: 32, symbol: "Ge", name: "Germânio", mass: "72.630", family: "semimetais", group: 14, period: 4 },
  { number: 33, symbol: "As", name: "Arsênio", mass: "74.922", family: "semimetais", group: 15, period: 4 },
  { number: 34, symbol: "Se", name: "Selênio", mass: "78.971", family: "nao-metais", group: 16, period: 4 },
  { number: 35, symbol: "Br", name: "Bromo", mass: "79.904", family: "halogenios", group: 17, period: 4 },
  { number: 36, symbol: "Kr", name: "Criptônio", mass: "83.798", family: "gases-nobres", group: 18, period: 4 },
  
  // Período 5
  { number: 37, symbol: "Rb", name: "Rubídio", mass: "85.468", family: "metais-alcalinos", group: 1, period: 5 },
  { number: 38, symbol: "Sr", name: "Estrôncio", mass: "87.62", family: "metais-alcalino-terrosos", group: 2, period: 5 },
  { number: 39, symbol: "Y", name: "Ítrio", mass: "88.906", family: "metais-transicao", group: 3, period: 5 },
  { number: 40, symbol: "Zr", name: "Zircônio", mass: "91.224", family: "metais-transicao", group: 4, period: 5 },
  { number: 41, symbol: "Nb", name: "Nióbio", mass: "92.906", family: "metais-transicao", group: 5, period: 5 },
  { number: 42, symbol: "Mo", name: "Molibdênio", mass: "95.95", family: "metais-transicao", group: 6, period: 5 },
  { number: 43, symbol: "Tc", name: "Tecnécio", mass: "98.0", family: "metais-transicao", group: 7, period: 5 },
  { number: 44, symbol: "Ru", name: "Rutênio", mass: "101.07", family: "metais-transicao", group: 8, period: 5 },
  { number: 45, symbol: "Rh", name: "Ródio", mass: "102.91", family: "metais-transicao", group: 9, period: 5 },
  { number: 46, symbol: "Pd", name: "Paládio", mass: "106.42", family: "metais-transicao", group: 10, period: 5 },
  { number: 47, symbol: "Ag", name: "Prata", mass: "107.87", family: "metais-transicao", group: 11, period: 5 },
  { number: 48, symbol: "Cd", name: "Cádmio", mass: "112.41", family: "metais-transicao", group: 12, period: 5 },
  { number: 49, symbol: "In", name: "Índio", mass: "114.82", family: "metais-representativos", group: 13, period: 5 },
  { number: 50, symbol: "Sn", name: "Estanho", mass: "118.71", family: "metais-representativos", group: 14, period: 5 },
  { number: 51, symbol: "Sb", name: "Antimônio", mass: "121.76", family: "semimetais", group: 15, period: 5 },
  { number: 52, symbol: "Te", name: "Telúrio", mass: "127.60", family: "semimetais", group: 16, period: 5 },
  { number: 53, symbol: "I", name: "Iodo", mass: "126.90", family: "halogenios", group: 17, period: 5 },
  { number: 54, symbol: "Xe", name: "Xenônio", mass: "131.29", family: "gases-nobres", group: 18, period: 5 },
  
  // Período 6
  { number: 55, symbol: "Cs", name: "Césio", mass: "132.91", family: "metais-alcalinos", group: 1, period: 6 },
  { number: 56, symbol: "Ba", name: "Bário", mass: "137.33", family: "metais-alcalino-terrosos", group: 2, period: 6 },
  { number: 57, symbol: "La", name: "Lantânio", mass: "138.91", family: "lantanideos", group: 3, period: 6 },
  { number: 72, symbol: "Hf", name: "Háfnio", mass: "178.49", family: "metais-transicao", group: 4, period: 6 },
  { number: 73, symbol: "Ta", name: "Tântalo", mass: "180.95", family: "metais-transicao", group: 5, period: 6 },
  { number: 74, symbol: "W", name: "Tungstênio", mass: "183.84", family: "metais-transicao", group: 6, period: 6 },
  { number: 75, symbol: "Re", name: "Rênio", mass: "186.21", family: "metais-transicao", group: 7, period: 6 },
  { number: 76, symbol: "Os", name: "Ósmio", mass: "190.23", family: "metais-transicao", group: 8, period: 6 },
  { number: 77, symbol: "Ir", name: "Irídio", mass: "192.22", family: "metais-transicao", group: 9, period: 6 },
  { number: 78, symbol: "Pt", name: "Platina", mass: "195.08", family: "metais-transicao", group: 10, period: 6 },
  { number: 79, symbol: "Au", name: "Ouro", mass: "196.97", family: "metais-transicao", group: 11, period: 6 },
  { number: 80, symbol: "Hg", name: "Mercúrio", mass: "200.59", family: "metais-transicao", group: 12, period: 6 },
  { number: 81, symbol: "Tl", name: "Tálio", mass: "204.38", family: "metais-representativos", group: 13, period: 6 },
  { number: 82, symbol: "Pb", name: "Chumbo", mass: "207.2", family: "metais-representativos", group: 14, period: 6 },
  { number: 83, symbol: "Bi", name: "Bismuto", mass: "208.98", family: "metais-representativos", group: 15, period: 6 },
  { number: 84, symbol: "Po", name: "Polônio", mass: "209.0", family: "semimetais", group: 16, period: 6 },
  { number: 85, symbol: "At", name: "Astato", mass: "210.0", family: "halogenios", group: 17, period: 6 },
  { number: 86, symbol: "Rn", name: "Radônio", mass: "222.0", family: "gases-nobres", group: 18, period: 6 },
  
  // Período 7
  { number: 87, symbol: "Fr", name: "Frâncio", mass: "223.0", family: "metais-alcalinos", group: 1, period: 7 },
  { number: 88, symbol: "Ra", name: "Rádio", mass: "226.0", family: "metais-alcalino-terrosos", group: 2, period: 7 },
  { number: 89, symbol: "Ac", name: "Actínio", mass: "227.0", family: "actinideos", group: 3, period: 7 },
  { number: 104, symbol: "Rf", name: "Rutherfórdio", mass: "267.0", family: "metais-transicao", group: 4, period: 7 },
  { number: 105, symbol: "Db", name: "Dúbnio", mass: "268.0", family: "metais-transicao", group: 5, period: 7 },
  { number: 106, symbol: "Sg", name: "Seabórgio", mass: "269.0", family: "metais-transicao", group: 6, period: 7 },
  { number: 107, symbol: "Bh", name: "Bóhrio", mass: "270.0", family: "metais-transicao", group: 7, period: 7 },
  { number: 108, symbol: "Hs", name: "Hássio", mass: "269.0", family: "metais-transicao", group: 8, period: 7 },
  { number: 109, symbol: "Mt", name: "Meitnério", mass: "278.0", family: "metais-transicao", group: 9, period: 7 },
  { number: 110, symbol: "Ds", name: "Darmstádtio", mass: "281.0", family: "metais-transicao", group: 10, period: 7 },
  { number: 111, symbol: "Rg", name: "Roentgênio", mass: "282.0", family: "metais-transicao", group: 11, period: 7 },
  { number: 112, symbol: "Cn", name: "Copernício", mass: "285.0", family: "metais-transicao", group: 12, period: 7 },
  { number: 113, symbol: "Nh", name: "Nihônio", mass: "286.0", family: "metais-representativos", group: 13, period: 7 },
  { number: 114, symbol: "Fl", name: "Fleróvio", mass: "289.0", family: "metais-representativos", group: 14, period: 7 },
  { number: 115, symbol: "Mc", name: "Moscóvio", mass: "290.0", family: "metais-representativos", group: 15, period: 7 },
  { number: 116, symbol: "Lv", name: "Livermório", mass: "293.0", family: "metais-representativos", group: 16, period: 7 },
  { number: 117, symbol: "Ts", name: "Tennesso", mass: "294.0", family: "halogenios", group: 17, period: 7 },
  { number: 118, symbol: "Og", name: "Oganessônio", mass: "294.0", family: "gases-nobres", group: 18, period: 7 },
  
  // Lantanídeos
  { number: 58, symbol: "Ce", name: "Cério", mass: "140.12", family: "lantanideos", group: 0, period: 6 },
  { number: 59, symbol: "Pr", name: "Praseodímio", mass: "140.91", family: "lantanideos", group: 0, period: 6 },
  { number: 60, symbol: "Nd", name: "Neodímio", mass: "144.24", family: "lantanideos", group: 0, period: 6 },
  { number: 61, symbol: "Pm", name: "Promécio", mass: "145.0", family: "lantanideos", group: 0, period: 6 },
  { number: 62, symbol: "Sm", name: "Samário", mass: "150.36", family: "lantanideos", group: 0, period: 6 },
  { number: 63, symbol: "Eu", name: "Európio", mass: "151.96", family: "lantanideos", group: 0, period: 6 },
  { number: 64, symbol: "Gd", name: "Gadolínio", mass: "157.25", family: "lantanideos", group: 0, period: 6 },
  { number: 65, symbol: "Tb", name: "Térbio", mass: "158.93", family: "lantanideos", group: 0, period: 6 },
  { number: 66, symbol: "Dy", name: "Disprósio", mass: "162.50", family: "lantanideos", group: 0, period: 6 },
  { number: 67, symbol: "Ho", name: "Hólmio", mass: "164.93", family: "lantanideos", group: 0, period: 6 },
  { number: 68, symbol: "Er", name: "Érbio", mass: "167.26", family: "lantanideos", group: 0, period: 6 },
  { number: 69, symbol: "Tm", name: "Túlio", mass: "168.93", family: "lantanideos", group: 0, period: 6 },
  { number: 70, symbol: "Yb", name: "Itérbio", mass: "173.05", family: "lantanideos", group: 0, period: 6 },
  { number: 71, symbol: "Lu", name: "Lutécio", mass: "174.97", family: "lantanideos", group: 3, period: 6 },
  
  // Actinídeos
  { number: 90, symbol: "Th", name: "Tório", mass: "232.04", family: "actinideos", group: 0, period: 7 },
  { number: 91, symbol: "Pa", name: "Protactínio", mass: "231.04", family: "actinideos", group: 0, period: 7 },
  { number: 92, symbol: "U", name: "Urânio", mass: "238.03", family: "actinideos", group: 0, period: 7 },
  { number: 93, symbol: "Np", name: "Netúnio", mass: "237.0", family: "actinideos", group: 0, period: 7 },
  { number: 94, symbol: "Pu", name: "Plutônio", mass: "244.0", family: "actinideos", group: 0, period: 7 },
  { number: 95, symbol: "Am", name: "Amerício", mass: "243.0", family: "actinideos", group: 0, period: 7 },
  { number: 96, symbol: "Cm", name: "Cúrio", mass: "247.0", family: "actinideos", group: 0, period: 7 },
  { number: 97, symbol: "Bk", name: "Berquélio", mass: "247.0", family: "actinideos", group: 0, period: 7 },
  { number: 98, symbol: "Cf", name: "Califórnio", mass: "251.0", family: "actinideos", group: 0, period: 7 },
  { number: 99, symbol: "Es", name: "Einstênio", mass: "252.0", family: "actinideos", group: 0, period: 7 },
  { number: 100, symbol: "Fm", name: "Férmio", mass: "257.0", family: "actinideos", group: 0, period: 7 },
  { number: 101, symbol: "Md", name: "Mendelévio", mass: "258.0", family: "actinideos", group: 0, period: 7 },
  { number: 102, symbol: "No", name: "Nobélio", mass: "259.0", family: "actinideos", group: 0, period: 7 },
  { number: 103, symbol: "Lr", name: "Laurêncio", mass: "262.0", family: "actinideos", group: 3, period: 7 },
];

// CORES DAS FAMÍLIAS
const FAMILY_COLORS = {
  "metais-alcalinos": { bg: "#fecaca", border: "#f87171", text: "#991b1b" },
  "metais-alcalino-terrosos": { bg: "#fed7aa", border: "#fb923c", text: "#9a3412" },
  "metais-transicao": { bg: "#fef08a", border: "#facc15", text: "#854d0e" },
  "semimetais": { bg: "#bbf7d0", border: "#4ade80", text: "#166534" },
  "nao-metais": { bg: "#bfdbfe", border: "#60a5fa", text: "#1e40af" },
  "halogenios": { bg: "#e9d5ff", border: "#c084fc", text: "#7e22ce" },
  "gases-nobres": { bg: "#c7d2fe", border: "#818cf8", text: "#3730a3" },
  "lantanideos": { bg: "#fbcfe8", border: "#f472b6", text: "#be185d" },
  "actinideos": { bg: "#fecdd3", border: "#fb7185", text: "#be123c" }
};

// COMPONENTE ELEMENT CARD
function ElementCard({ element, onClick, size = 40, fontSize = 12, showName = false }: any) {
  const familyColor = FAMILY_COLORS[element.family as keyof typeof FAMILY_COLORS] || { 
    bg: "#e5e7eb", border: "#9ca3af", text: "#374151" 
  };
  
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.elementCard,
        {
          backgroundColor: familyColor.bg,
          borderColor: familyColor.border,
          width: size,
          height: size,
          padding: size > 60 ? 6 : 2
        }
      ]}
    >
      <Text style={[
        styles.elementNumber,
        { 
          fontSize: Math.max(fontSize - 2, 8),
          color: familyColor.text 
        }
      ]}>
        {element.number}
      </Text>
      
      <Text style={[
        styles.elementSymbol,
        { 
          fontSize: Math.max(fontSize, 10),
          color: familyColor.text,
          marginTop: size > 60 ? 8 : 4
        }
      ]}>
        {element.symbol}
      </Text>
      
      {showName && (
        <Text style={[
          styles.elementName,
          { color: familyColor.text }
        ]}>
          {element.name}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// COMPONENTE PERIOD ROW
function PeriodRow({ period, elements, onElementPress, elementSize, fontSize, isLandscape }: any) {
  return (
    <View style={[styles.periodRow, { marginBottom: isLandscape ? 6 : 4 }]}>
      <View style={styles.periodNumber}>
        <Text style={[styles.periodText, { fontSize: fontSize }]}>
          {period}
        </Text>
      </View>
      
      <View style={styles.elementsRow}>
        {Array.from({ length: 18 }, (_, i) => i + 1).map(group => {
          const element = elements.find((el: any) => 
            el.period === period && el.group === group && 
            !['lantanideos', 'actinideos'].includes(el.family)
          );
          
          return element ? (
            <ElementCard 
              key={element.number} 
              element={element} 
              onClick={() => onElementPress(element)}
              size={elementSize}
              fontSize={fontSize}
              showName={false}
            />
          ) : (
            <View 
              key={`${period}-${group}`} 
              style={[styles.emptyElement, { width: elementSize, height: elementSize }]} 
            />
          );
        })}
      </View>
    </View>
  );
}

// COMPONENTE SÉRIES (Lantanídeos/Actinídeos)
function SeriesRow({ title, family, elements, onElementPress, elementSize, fontSize }: any) {
  const seriesElements = elements
    .filter((el: any) => el.family === family)
    .sort((a: any, b: any) => a.number - b.number);

  return (
    <View style={styles.seriesContainer}>
      <Text style={styles.seriesTitle}>{title}</Text>
      <View style={styles.seriesRow}>
        {seriesElements.map((element: any) => (
          <ElementCard 
            key={element.number} 
            element={element} 
            onClick={() => onElementPress(element)}
            size={elementSize}
            fontSize={fontSize}
            showName={false}
          />
        ))}
      </View>
    </View>
  );
}

// COMPONENTE LEGENDA
function Legend() {
  return (
    <View style={styles.legendContainer}>
      <Text style={styles.legendTitle}>Legenda</Text>
      <View style={styles.legendGrid}>
        {Object.entries(FAMILY_COLORS).map(([family, colors]) => (
          <View key={family} style={styles.legendItem}>
            <View style={[
              styles.legendColor,
              { backgroundColor: colors.bg, borderColor: colors.border }
            ]} />
            <Text style={styles.legendText}>
              {family.split('-')[0]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// COMPONENTE MODAL
function ElementModal({ element, onClose }: { element: any; onClose: () => void }) {
  const familyColor = FAMILY_COLORS[element.family as keyof typeof FAMILY_COLORS] || { 
    bg: "#e5e7eb", border: "#9ca3af", text: "#374151" 
  };

  return (
    <View style={modalStyles.overlay}>
      <View style={modalStyles.container}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: 16 
        }}>
          <Text style={modalStyles.header}>
            {element.name}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={modalStyles.closeButton}
          >
            <Text style={{ fontSize: 20, color: '#6b7280' }}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={[modalStyles.content, { backgroundColor: familyColor.bg }]}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 8 }}>
            {element.symbol}
          </Text>
          <Text style={{ fontSize: 18, color: '#6b7280' }}>
            Número Atômico: {element.number}
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          <View style={modalStyles.detailRow}>
            <Text style={modalStyles.detailLabel}>Massa Atômica:</Text>
            <Text style={modalStyles.detailValue}>{element.mass} u</Text>
          </View>
          <View style={modalStyles.detailRow}>
            <Text style={modalStyles.detailLabel}>Família:</Text>
            <Text style={modalStyles.detailValue}>
              {element.family.replace('-', ' ')}
            </Text>
          </View>
          <View style={modalStyles.detailRow}>
            <Text style={modalStyles.detailLabel}>Grupo:</Text>
            <Text style={modalStyles.detailValue}>{element.group}</Text>
          </View>
          <View style={modalStyles.detailRow}>
            <Text style={modalStyles.detailLabel}>Período:</Text>
            <Text style={modalStyles.detailValue}>{element.period}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onClose}
          style={modalStyles.actionButton}
        >
          <Text style={modalStyles.actionButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// COMPONENTE PRINCIPAL
export default function TabelaScreen() {
  const { width, height } = useWindowDimensions();
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLandscape, setIsLandscape] = useState(width > height);

  useEffect(() => {
    setIsLandscape(width > height);
  }, [width, height]);

  const filteredElements = ELEMENTS.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.number.toString().includes(searchTerm)
  );

  // Tamanhos responsivos
  const elementSize = isLandscape ? 40 : 36;
  const elementFontSize = isLandscape ? 12 : 11;
  const tablePadding = isLandscape ? 16 : 8;

  return (
    <View style={[styles.container, { padding: tablePadding }]}>
      
      {/* Header Responsivo */}
      <View style={[styles.header, { 
        flexDirection: isLandscape ? 'row' : 'column',
        gap: isLandscape ? 0 : 12 
      }]}>
        <Text style={styles.title}>Tabela Periódica</Text>
        
        <View style={{ width: isLandscape ? 180 : '100%' }}>
          <TextInput
            placeholder="Pesquisar elemento..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Aviso para modo retrato */}
      {!isLandscape && !searchTerm && (
        <View style={styles.orientationWarning}>
          <Text style={styles.warningText}>🔄 Gire para horizontal para melhor visualização</Text>
        </View>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        
        {searchTerm ? (
          // MODO PESQUISA
          <View style={styles.searchContainer}>
            <Text style={styles.resultsCount}>
              {filteredElements.length} elemento(s) encontrado(s)
            </Text>
            <View style={styles.searchGrid}>
              {filteredElements.map((element) => (
                <ElementCard 
                  key={element.number} 
                  element={element} 
                  onClick={() => setSelectedElement(element)}
                  size={isLandscape ? 80 : 70}
                  showName={true}
                />
              ))}
            </View>
          </View>
        ) : (
          // TABELA PERIÓDICA
          <View style={styles.tableWrapper}>
            
            {/* TABELA PRINCIPAL - Períodos 1-7 */}
            {[1, 2, 3, 4, 5, 6, 7].map(period => (
              <PeriodRow 
                key={period}
                period={period}
                elements={ELEMENTS}
                onElementPress={setSelectedElement}
                elementSize={elementSize}
                fontSize={elementFontSize}
                isLandscape={isLandscape}
              />
            ))}

           {/* LANTANÍDEOS E ACTINÍDEOS */}
                <SeriesRow 
                title="Lantanídeos"
                family="lantanideos"
                elements={ELEMENTS}
                onElementPress={setSelectedElement}
                elementSize={elementSize}
                fontSize={elementFontSize}
                />

                <SeriesRow 
                title="Actinídeos"
                family="actinideos"
                elements={ELEMENTS}
                onElementPress={setSelectedElement}
                elementSize={elementSize}
                fontSize={elementFontSize}
                />

                {/* LEGENDA */}
                <Legend />
                </View>
                )}
                </ScrollView>

                {/* Modal de Detalhes */}
                <Modal
                visible={!!selectedElement}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedElement(null)}
                >
                {selectedElement && (
                    <ElementModal 
                    element={selectedElement} 
                    onClose={() => setSelectedElement(null)} 
                    />
                )}
                </Modal>
                </View>
                );
                }

                // ESTILOS
                const styles = StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#f8fafc',
                },
                header: {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                },
                title: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#1f2937',
                },
                searchInput: {
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    backgroundColor: 'white',
                    fontSize: 16,
                },
                orientationWarning: {
                    backgroundColor: '#fbbf24',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16,
                },
                warningText: {
                    fontSize: 14,
                    textAlign: 'center',
                    color: '#92400e',
                    fontWeight: '600',
                },
                scrollContent: {
                    flexGrow: 1,
                },
                searchContainer: {
                    flex: 1,
                },
                resultsCount: {
                    textAlign: 'center',
                    marginBottom: 16,
                    fontSize: 14,
                    color: '#6b7280',
                },
                searchGrid: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 8,
                    justifyContent: 'center',
                },
                tableWrapper: {
                    flex: 1,
                },
                periodRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                periodNumber: {
                    width: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 8,
                },
                periodText: {
                    fontWeight: 'bold',
                    color: '#374151',
                },
                elementsRow: {
                    flexDirection: 'row',
                    flex: 1,
                    gap: 3,
                },
                emptyElement: {
                    borderWidth: 1,
                    borderColor: 'transparent'
                },
                seriesContainer: {
                    marginVertical: 12,
                },
                seriesTitle: {
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: 8,
                },
                seriesRow: {
                    flexDirection: 'row',
                    gap: 3,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                },
                elementCard: {
                    borderWidth: 1,
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                },
                elementNumber: {
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    fontWeight: 'bold',
                },
                elementSymbol: {
                    fontWeight: 'bold',
                },
                elementName: {
                    fontSize: 6,
                    fontWeight: '500',
                    marginTop: 2,
                    textAlign: 'center',
                },
                legendContainer: {
                    marginTop: 20,
                    padding: 16,
                    backgroundColor: '#f1f5f9',
                    borderRadius: 8,
                },
                legendTitle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginBottom: 12,
                    textAlign: 'center',
                },
                legendGrid: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 12,
                    justifyContent: 'center',
                },
                legendItem: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                },
                legendColor: {
                    width: 12,
                    height: 12,
                    borderWidth: 1,
                    borderRadius: 2,
                },
                legendText: {
                    fontSize: 10,
                    color: '#374151',
                },
                });

                // ESTILOS DO MODAL
                const modalStyles = StyleSheet.create({
                overlay: {
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 16,
                },
                container: {
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 24,
                    width: '100%',
                    maxWidth: 400,
                    maxHeight: '90%',
                },
                header: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#1f2937',
                    flex: 1,
                },
                closeButton: {
                    backgroundColor: '#f3f4f6',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 8,
                },
                content: {
                    borderRadius: 12,
                    padding: 24,
                    alignItems: 'center',
                    marginBottom: 24,
                },
                detailRow: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e5e7eb',
                },
                detailLabel: {
                    fontWeight: '600',
                    color: '#1f2937',
                    fontSize: 16,
                },
                detailValue: {
                    color: '#6b7280',
                    fontSize: 16,
                },
                actionButton: {
                    backgroundColor: '#3b82f6',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    marginTop: 16,
                    alignItems: 'center',
                },
                actionButtonText: {
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 16,
                },
                });
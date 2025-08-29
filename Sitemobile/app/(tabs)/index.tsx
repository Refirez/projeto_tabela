import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ELEMENTS = ['H', 'He', 'Li', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'];

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Partículas (simplificado para mobile) */}
      <View style={styles.particles}>
        {ELEMENTS.slice(0, 20).map((symbol, i) => (
          <Text key={i} style={[styles.particle, { top: Math.random() * 600, left: Math.random() * 300 }]}>
            {symbol}
          </Text>
        ))}
      </View>

      {/* Card principal */}
      <View style={styles.card}>
        <Text style={styles.title}>Explorando a Tabela Periódica</Text>
        <Text style={styles.subtitle}>
          Um guia interativo para compreender os elementos químicos, suas propriedades e a organização da tabela periódica.
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push("/tabela")}
        >
          <Text style={styles.buttonText}>Começar Exploração</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f2fe", // gradiente simplificado (blue-100)
    padding: 20,
  },
  particles: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  particle: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(59,130,246,0.7)", // azul com transparência
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    maxWidth: 350,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1d4ed8", // azul-700
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#374151", // gray-700
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb", // azul-600
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

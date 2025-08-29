import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorando a Tabela Periódica</Text>

      <Text style={styles.subtitle}>
        Um guia interativo para compreender os elementos químicos, suas propriedades 
        e a organização da tabela periódica.
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push("/tabela")}
      >
        <Text style={styles.buttonText}>Começar Exploração</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF4FF",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: width * 0.7,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

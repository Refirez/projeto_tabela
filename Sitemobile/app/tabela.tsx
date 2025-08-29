import { FlatList, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ELEMENTS = [
  { id: "1", symbol: "H", name: "Hidrogênio" },
  { id: "2", symbol: "He", name: "Hélio" },
  { id: "3", symbol: "Li", name: "Lítio" },
  { id: "4", symbol: "C", name: "Carbono" },
];

export default function TabelaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tabela Periódica</Text>
      <FlatList
        data={ELEMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000000ff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  symbol: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
  },
  name: {
    fontSize: 16,
    color: "#374151",
  },
});

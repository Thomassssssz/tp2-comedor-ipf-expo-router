import { StyleSheet, Text, View } from "react-native";

export default function Carrito() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrito</Text>

      <Text>Tu carrito está vacío.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

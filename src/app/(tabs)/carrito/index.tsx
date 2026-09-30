import { StyleSheet, Text, View } from "react-native";

//pantalla principal del carrito
export default function Carrito() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrito</Text>

      <Text>Tu carrito está vacío.</Text>
    </View>
  );
}

//estilos de la pantalla carrito
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

import { StyleSheet, Text, View } from "react-native";

//pantalla principal de la apicacion
export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comedor IPF</Text>

      <Text style={styles.texto}>
        Bienvenido al sistema de pedidos del comedor.
      </Text>
    </View>
  );
}
//estilos de la pantalla inicio
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
  },
});

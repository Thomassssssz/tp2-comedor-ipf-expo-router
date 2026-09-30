import { StyleSheet, Text, View } from "react-native";

//pantalla principal del menu
export default function Menu() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menú</Text>

      <Text>Acá se mostrarán los platos disponibles.</Text>
    </View>
  );
}

//estilos de la pantalla menu
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

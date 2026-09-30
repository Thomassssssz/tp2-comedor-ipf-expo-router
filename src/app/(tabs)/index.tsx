import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

//pantalla principal de la aplicacion
export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comedor IPF</Text>

      <Text style={styles.texto}>
        Bienvenido al sistema de pedidos del comedor.
      </Text>

      {/*acceso al buscador */}
      <Link href="/buscar" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Buscar platos</Text>
        </Pressable>
      </Link>
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
    marginBottom: 25,
  },
  boton: {
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

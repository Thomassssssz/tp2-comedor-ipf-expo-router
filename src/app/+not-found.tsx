import { Link, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import DondeEstoy from "../components/DondeEstoy";

//pantalla para rutas que no existen
export default function NotFound() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Text style={styles.codigo}>404</Text>

      <Text style={styles.titulo}>Pantalla no encontrada</Text>

      <Text style={styles.texto}>La ruta {pathname} no existe.</Text>

      <Link href="/" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Volver al inicio</Text>
        </Pressable>
      </Link>

      <DondeEstoy />
    </View>
  );
}

//estilos de la pantalla 404
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  codigo: {
    fontSize: 60,
    fontWeight: "bold",
  },
  titulo: {
    fontSize: 26,
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

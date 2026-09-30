import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useApp } from "../../context/AppContext";

//pantalla principal de la aplicacion
export default function Inicio() {
  const { usuario } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comedor IPF</Text>

      <Text style={styles.texto}>
        Bienvenido al sistema de pedidos del comedor.
      </Text>

      <Link href="/menu" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Menu</Text>
        </Pressable>
      </Link>

      <Link href="/buscar" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Buscar</Text>
        </Pressable>
      </Link>

      <Link href="/ayuda" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Ayuda</Text>
        </Pressable>
      </Link>

      <Link href={usuario ? "/cocina" : "/login"} asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Cocina</Text>
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
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  boton: {
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    minWidth: 150,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

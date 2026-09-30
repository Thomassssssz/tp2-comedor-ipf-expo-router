import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

//pantalla principal de ayuda
export default function Ayuda() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Ayuda" }} />

      <Text style={styles.titulo}>Ayuda</Text>
      <Text style={styles.texto}>
        Selecciona un tema para ver mas informacion.
      </Text>

      <Link href="/ayuda/pagos/efectivo" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Pagos en efectivo</Text>
        </Pressable>
      </Link>

      <Link href="/ayuda/pagos/tarjeta" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Pagos con tarjeta</Text>
        </Pressable>
      </Link>

      <Link href="/ayuda/horarios" asChild>
        <Pressable style={styles.boton}>
          <Text style={styles.textoBoton}>Horarios</Text>
        </Pressable>
      </Link>
    </View>
  );
}

//estilos de la pantalla ayuda
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    marginBottom: 20,
  },
  boton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

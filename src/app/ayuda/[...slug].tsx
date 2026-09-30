import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import DondeEstoy from "../../components/DondeEstoy";

//pantalla para articulos de ayuda
export default function ArticuloAyuda() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();

  //une las partes de la ruta
  const ruta = Array.isArray(slug) ? slug.join("/") : slug;

  //define el contenido de cada articulo
  const contenidos: Record<string, string> = {
    "pagos/efectivo": "El pedido puede abonarse en efectivo al retirarlo.",
    "pagos/tarjeta": "El comedor acepta pagos con tarjeta.",
    horarios:
      "El comedor funciona durante los horarios establecidos por el instituto.",
  };

  const contenido = contenidos[ruta];

  if (!contenido) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Ayuda" }} />

        <Text style={styles.titulo}>Articulo no encontrado</Text>

        <Text>No existe informacion para este tema.</Text>

        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Ayuda" }} />

      <Text style={styles.titulo}>{ruta}</Text>
      <Text style={styles.texto}>{contenido}</Text>

      <DondeEstoy />
    </View>
  );
}

//estilos del articulo de ayuda
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textTransform: "capitalize",
  },
  texto: {
    fontSize: 16,
  },
});

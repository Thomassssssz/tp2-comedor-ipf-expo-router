import { Stack, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { useApp } from "../../../context/AppContext";
import { platos } from "../../../data/platos";

//pantalla de detalle de un plato
export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useApp();

  //convierte el parametro de texto a numero
  const idPlato = Number(id);

  //busca el plato correspondiente al id
  const plato = platos.find((item) => item.id === idPlato);

  if (!plato) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Plato no encontrado" }} />

        <Text style={styles.titulo}>El plato no existe.</Text>
      </View>
    );
  }

  //agrega el plato seleccionado al carrito
  const agregar = () => {
    agregarAlCarrito(plato);
    Alert.alert("Carrito", "Plato agregado correctamente.");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: plato.nombre }} />

      <Text style={styles.titulo}>{plato.nombre}</Text>

      <Text style={styles.descripcion}>{plato.descripcion}</Text>

      <Text style={styles.precio}>${plato.precio}</Text>

      <Pressable style={styles.boton} onPress={agregar}>
        <Text style={styles.textoBoton}>Agregar al carrito</Text>
      </Pressable>
    </View>
  );
}

//estilos de la pantalla de detalle
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
  },
  descripcion: {
    fontSize: 16,
    marginTop: 12,
  },
  precio: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  boton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#222",
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

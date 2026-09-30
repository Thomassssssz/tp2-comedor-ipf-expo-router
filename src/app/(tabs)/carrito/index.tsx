import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useApp } from "../../../context/AppContext";

//pantalla principal del carrito
export default function Carrito() {
  const { carrito, deshacerUltimo, puedeDeshacer, totalCarrito } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Carrito</Text>

      {carrito.length === 0 ? (
        <Text style={styles.vacio}>Tu carrito esta vacio.</Text>
      ) : (
        carrito.map((plato, index) => (
          <View key={`${plato.id}-${index}`} style={styles.tarjeta}>
            <Text style={styles.nombre}>{plato.nombre}</Text>

            <Text>${plato.precio}</Text>
          </View>
        ))
      )}

      <Text style={styles.total}>Total: ${totalCarrito}</Text>

      <Pressable
        style={[styles.boton, !puedeDeshacer && styles.botonDeshabilitado]}
        onPress={deshacerUltimo}
        disabled={!puedeDeshacer}
      >
        <Text style={styles.textoBoton}>Deshacer ultimo</Text>
      </Pressable>
    </ScrollView>
  );
}

//estilos de la pantalla carrito
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  vacio: {
    fontSize: 16,
    marginBottom: 20,
  },
  tarjeta: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

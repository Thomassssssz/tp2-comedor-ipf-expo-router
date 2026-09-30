import { Pressable, StyleSheet, Text, View } from "react-native";

import { useApp } from "../context/AppContext";

//pantalla de confirmacion del pedido
export default function Confirmar() {
  const { carrito, nota, totalCarrito } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Confirmar pedido</Text>

      {carrito.map((plato, index) => (
        <View key={`${plato.id}-${index}`} style={styles.item}>
          <Text>{plato.nombre}</Text>
          <Text>${plato.precio}</Text>
        </View>
      ))}

      {nota !== "" && (
        <View style={styles.nota}>
          <Text style={styles.notaTitulo}>Nota:</Text>
          <Text>{nota}</Text>
        </View>
      )}

      <Text style={styles.total}>Total: ${totalCarrito}</Text>

      <Pressable style={styles.boton}>
        <Text style={styles.textoBoton}>Confirmar</Text>
      </Pressable>
    </View>
  );
}

//estilos de la pantalla confirmar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  nota: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  notaTitulo: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  boton: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

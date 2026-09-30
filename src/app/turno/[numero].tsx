import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { useApp } from "../../context/AppContext";

//pantalla que muestra el turno del pedido
export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { pedidosAdelante } = useApp();

  //convierte el numero recibido a tipo number
  const numeroPedido = Number(numero);

  //calcula cuantos pedidos estan antes en la cola
  const adelante = pedidosAdelante(numeroPedido);

  if (adelante === null) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Turno" }} />

        <Text style={styles.titulo}>Pedido no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Turno ${numeroPedido}` }} />

      <Text style={styles.texto}>Tu numero de turno es</Text>

      <Text style={styles.numero}>{numeroPedido}</Text>

      <Text style={styles.texto}>Pedidos adelante: {adelante}</Text>
    </View>
  );
}

//estilos de la pantalla turno
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
  },
  numero: {
    fontSize: 70,
    fontWeight: "bold",
    marginVertical: 20,
  },
  texto: {
    fontSize: 18,
    textAlign: "center",
  },
});

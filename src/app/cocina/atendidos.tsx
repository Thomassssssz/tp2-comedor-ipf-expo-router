import { ScrollView, StyleSheet, Text, View } from "react-native";

import DondeEstoy from "../../components/DondeEstoy";
import { useApp } from "../../context/AppContext";

//pantalla de pedidos atendidos
export default function Atendidos() {
  const { pedidosAtendidos } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pedidos atendidos</Text>

      {pedidosAtendidos.length === 0 ? (
        <Text>Todavia no hay pedidos atendidos.</Text>
      ) : (
        pedidosAtendidos.map((pedido) => (
          <View key={pedido.numero} style={styles.tarjeta}>
            <Text style={styles.numero}>Pedido #{pedido.numero}</Text>

            {pedido.platos.map((plato, index) => (
              <Text key={`${plato.id}-${index}`}>• {plato.nombre}</Text>
            ))}

            <Text style={styles.total}>Total: ${pedido.total}</Text>
          </View>
        ))
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

//estilos de la pantalla atendidos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tarjeta: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  numero: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  total: {
    marginTop: 8,
    fontWeight: "bold",
  },
});

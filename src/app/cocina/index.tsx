import { Pressable, StyleSheet, Text, View } from "react-native";

import DondeEstoy from "../../components/DondeEstoy";
import { useApp } from "../../context/AppContext";

//pantalla principal de cocina
export default function Cocina() {
  const { pedidoFrente, cantidadEnEspera, atenderSiguiente, cerrarSesion } =
    useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cocina</Text>

      <Text style={styles.espera}>Pedidos en espera: {cantidadEnEspera}</Text>

      {!pedidoFrente ? (
        <Text>No hay pedidos pendientes.</Text>
      ) : (
        <View style={styles.pedido}>
          <Text style={styles.numero}>Pedido #{pedidoFrente.numero}</Text>

          {pedidoFrente.platos.map((plato, index) => (
            <Text key={`${plato.id}-${index}`}>• {plato.nombre}</Text>
          ))}

          {pedidoFrente.nota !== "" && (
            <Text style={styles.nota}>Nota: {pedidoFrente.nota}</Text>
          )}

          <Text style={styles.total}>Total: ${pedidoFrente.total}</Text>

          <Pressable style={styles.boton} onPress={atenderSiguiente}>
            <Text style={styles.textoBoton}>Atender siguiente</Text>
          </Pressable>
        </View>
      )}

      <Pressable style={styles.botonSalir} onPress={cerrarSesion}>
        <Text style={styles.textoSalir}>Cerrar sesion</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

//estilos de la pantalla cocina
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
  espera: {
    fontSize: 17,
    marginBottom: 20,
  },
  pedido: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
  },
  numero: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  nota: {
    marginTop: 10,
    fontWeight: "bold",
  },
  total: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  boton: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  botonSalir: {
    borderWidth: 1,
    borderColor: "#222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  textoSalir: {
    fontWeight: "bold",
  },
});

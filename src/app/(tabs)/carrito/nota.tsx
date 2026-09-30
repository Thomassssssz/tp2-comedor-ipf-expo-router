import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import DondeEstoy from "../../../components/DondeEstoy";
import { useApp } from "../../../context/AppContext";

//pantalla para agregar una nota al pedido
export default function NotaCarrito() {
  const { nota, setNota } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nota para cocina</Text>

      <Text style={styles.texto}>Agrega una aclaracion para tu pedido.</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: sin sal"
        value={nota}
        onChangeText={setNota}
        multiline
      />

      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={styles.textoBoton}>Guardar nota</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

//estilos de la pantalla nota
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
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
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
});

import { useLocalSearchParams, usePathname, useSegments } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const DEBUG = false;

//muestra informacion de la ruta actual
export default function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Donde estoy</Text>

      <Text>Pathname: {pathname}</Text>

      <Text>Segments: {JSON.stringify(segments)}</Text>

      <Text>Params: {JSON.stringify(params)}</Text>
    </View>
  );
}

//estilos del componente de depuracion
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  titulo: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

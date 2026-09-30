import { Link } from "expo-router";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import { platos } from "../../../data/platos";

//agrupa los platos por categoria
const secciones = [
  {
    titulo: "Desayuno",
    data: platos.filter((plato) => plato.categoria === "desayuno"),
  },
  {
    titulo: "Almuerzo",
    data: platos.filter((plato) => plato.categoria === "almuerzo"),
  },
  {
    titulo: "Bebidas",
    data: platos.filter((plato) => plato.categoria === "bebidas"),
  },
  {
    titulo: "Kiosco",
    data: platos.filter((plato) => plato.categoria === "kiosco"),
  },
];

//pantalla principal del menu
export default function Menu() {
  return (
    <SectionList
      sections={secciones}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.contenido}
      renderSectionHeader={({ section }) => (
        <Text style={styles.categoria}>{section.titulo}</Text>
      )}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/menu/[id]",
            params: { id: item.id.toString() },
          }}
          asChild
        >
          <Pressable style={styles.tarjeta}>
            <View>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
            </View>

            <Text style={styles.precio}>${item.precio}</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}

//estilos de la pantalla menu
const styles = StyleSheet.create({
  contenido: {
    padding: 16,
  },
  categoria: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  tarjeta: {
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
  },
  descripcion: {
    marginTop: 4,
    maxWidth: 240,
  },
  precio: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

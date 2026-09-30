import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { CategoriaPlato, platos } from "../../data/platos";

//categorías validas del sistema
const categoriasValidas: CategoriaPlato[] = [
  "desayuno",
  "almuerzo",
  "bebidas",
  "kiosco",
];

//pantalla que muestra platos de una categoria
export default function Categoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  //valida que la categoria recibida exista
  const esValida = categoriasValidas.includes(categoria as CategoriaPlato);

  if (!esValida) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Categoría no válida</Text>
        <Text>No existe la categoría "{categoria}".</Text>
      </View>
    );
  }

  //filtra los platos de la categoria seleccionada
  const platosCategoria = platos.filter(
    (plato) => plato.categoria === categoria,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{categoria}</Text>

      {platosCategoria.map((plato) => (
        <View key={plato.id} style={styles.tarjeta}>
          <Text style={styles.nombre}>{plato.nombre}</Text>
          <Text>{plato.descripcion}</Text>
          <Text style={styles.precio}>${plato.precio}</Text>
        </View>
      ))}
    </View>
  );
}

//estilos de la pantalla de categorias
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  tarjeta: {
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  precio: {
    marginTop: 6,
    fontWeight: "bold",
  },
});

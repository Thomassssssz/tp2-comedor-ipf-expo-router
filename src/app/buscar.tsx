import { router, useLocalSearchParams } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import DondeEstoy from "../components/DondeEstoy";
import { CategoriaPlato, platos } from "../data/platos";

//categorias disponibles para filtrar
const categorias: CategoriaPlato[] = [
  "desayuno",
  "almuerzo",
  "bebidas",
  "kiosco",
];

//pantalla de busqueda de platos
export default function Buscar() {
  const { q = "", categoria = "" } = useLocalSearchParams<{
    q?: string;
    categoria?: string;
  }>();

  //filtra los platos segun texto y categoria
  const resultados = platos.filter((plato) => {
    const coincideTexto = plato.nombre.toLowerCase().includes(q.toLowerCase());

    const coincideCategoria = categoria === "" || plato.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });

  //actualiza el texto de busqueda en la url
  const cambiarBusqueda = (texto: string) => {
    router.setParams({ q: texto });
  };

  //actualiza la categoria en la url
  const cambiarCategoria = (valor: string) => {
    router.setParams({ categoria: valor });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Buscar</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar plato..."
        value={q}
        onChangeText={cambiarBusqueda}
      />

      <View style={styles.categorias}>
        <Pressable
          style={[styles.boton, categoria === "" && styles.botonActivo]}
          onPress={() => cambiarCategoria("")}
        >
          <Text
            style={[
              styles.textoCategoria,
              categoria === "" && styles.textoActivo,
            ]}
          >
            Todos
          </Text>
        </Pressable>

        {categorias.map((item) => (
          <Pressable
            key={item}
            style={[styles.boton, categoria === item && styles.botonActivo]}
            onPress={() => cambiarCategoria(item)}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoria === item && styles.textoActivo,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.subtitulo}>Resultados</Text>

      {resultados.length === 0 ? (
        <Text>No se encontraron platos.</Text>
      ) : (
        resultados.map((plato) => (
          <View key={plato.id} style={styles.tarjeta}>
            <Text style={styles.nombre}>{plato.nombre}</Text>
            <Text>{plato.descripcion}</Text>
            <Text style={styles.precio}>${plato.precio}</Text>
          </View>
        ))
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

//estilos de la pantalla buscar
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  categorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  boton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botonActivo: {
    backgroundColor: "#222",
    borderColor: "#222",
  },
  textoCategoria: {
    textTransform: "capitalize",
  },
  textoActivo: {
    color: "#fff",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tarjeta: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
  },
  precio: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import DondeEstoy from "../components/DondeEstoy";
import { useApp } from "../context/AppContext";

//pantalla de ingreso del personal
export default function Login() {
  const { iniciarSesion } = useApp();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  //intenta iniciar sesion
  const ingresar = () => {
    const correcto = iniciarSesion(usuario, clave);

    if (!correcto) {
      setError("Usuario o clave incorrectos.");
      return;
    }

    setError("");

    //espera a que la ruta cocina quede habilitada
    setTimeout(() => {
      router.replace("/cocina");
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ingreso cocina</Text>

      <Text style={styles.label}>Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Clave</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese clave"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.boton} onPress={ingresar}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

//estilos de la pantalla login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  error: {
    marginBottom: 12,
  },
  boton: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

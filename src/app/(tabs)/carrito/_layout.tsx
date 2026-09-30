import { Stack } from "expo-router";

//stack propio de la seccion carrito
export default function CarritoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Carrito" }} />

      <Stack.Screen name="nota" options={{ title: "Nota para cocina" }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

//stack propio de la seccion carrito
export default function CarritoLayout() {
  return (
    <Stack>
      {/* Pantalla principal del carrito. */}
      <Stack.Screen name="index" options={{ title: "Carrito" }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function CarritoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Carrito" }} />
    </Stack>
  );
}

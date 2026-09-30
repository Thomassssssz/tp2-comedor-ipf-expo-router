import { Stack } from "expo-router";

//stack propio de la seccion menu
export default function MenuLayout() {
  return (
    <Stack>
      {/* Pantalla principal del menú. */}
      <Stack.Screen name="index" options={{ title: "Menú" }} />
    </Stack>
  );
}

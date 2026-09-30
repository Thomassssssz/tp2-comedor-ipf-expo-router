import { Stack } from "expo-router";
//define las tabs como base de la navegacion
export const unstable_settings = {
  anchor: "(tabs)",
};
//stack principal de toda la aplicacion
export default function RootLayout() {
  return (
    <Stack>
      {/*oculta el header porque las tabs tienen su propia navegacion*/}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

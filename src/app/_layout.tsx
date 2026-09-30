import { Stack } from "expo-router";
import { AppProvider } from "../context/AppContext";

//define las tabs como base de la navegacion
export const unstable_settings = {
  anchor: "(tabs)",
};

//stack principal de toda la aplicacion
export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppProvider, useApp } from "../context/AppContext";

//define las tabs como base de la navegacion
export const unstable_settings = {
  anchor: "(tabs)",
};

//configura las rutas segun la sesion
function NavegacionRaiz() {
  const { usuario } = useApp();

  const conSesion = usuario !== null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="confirmar"
        options={{
          title: "Confirmar pedido",
          presentation: "modal",
        }}
      />

      <Stack.Screen name="turno/[numero]" options={{ title: "Turno" }} />

      <Stack.Protected guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{
            title: "Ingreso cocina",
            presentation: "modal",
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

//stack principal de toda la aplicacion
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavegacionRaiz />
      </AppProvider>
    </GestureHandlerRootView>
  );
}

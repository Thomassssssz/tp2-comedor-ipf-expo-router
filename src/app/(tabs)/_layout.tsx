import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router/js-tabs";

//configura la navegacion principal con pestañas
export default function TabsLayout() {
  return (
    <Tabs>
      {/* Tab de inicio. */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      {/* Tab del menú con navegación propia. */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menú",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      {/* Tab del carrito con navegación propia. */}
      <Tabs.Screen
        name="carrito"
        options={{
          title: "Carrito",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import { Drawer } from "expo-router/drawer";

//drawer de la seccion cocina
export default function CocinaLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: "Cocina",
          drawerLabel: "Pedido actual",
        }}
      />

      <Drawer.Screen
        name="atendidos"
        options={{
          title: "Pedidos atendidos",
          drawerLabel: "Atendidos",
        }}
      />
    </Drawer>
  );
}

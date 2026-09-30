import { Redirect } from "expo-router";

//redirige la ruta vieja hacia el carrito
export default function Pedido() {
  return <Redirect href="/carrito" />;
}

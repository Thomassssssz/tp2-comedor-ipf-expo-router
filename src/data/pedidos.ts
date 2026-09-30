import { Plato } from "./platos";

//define la estructura de un pedido
export type Pedido = {
  numero: number;
  platos: Plato[];
  nota: string;
  total: number;
};

import { createContext, ReactNode, useContext, useRef, useState } from "react";

import { Pedido } from "../data/pedidos";
import { Plato } from "../data/platos";
import { Cola } from "../estructuras/Cola";
import { Pila } from "../estructuras/Pila";

type AppContextType = {
  carrito: Plato[];
  nota: string;
  pedidosEnCola: Pedido[];
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  setNota: (nota: string) => void;
  confirmarPedido: () => number | null;
  pedidosAdelante: (numero: number) => number | null;
  puedeDeshacer: boolean;
  totalCarrito: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

//provider global de la aplicacion
export function AppProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [nota, setNota] = useState("");
  const [, setVersionCola] = useState(0);

  //guarda las acciones del carrito en una pila
  const pilaAcciones = useRef(new Pila<Plato>());

  //guarda los pedidos respetando el orden de llegada
  const colaPedidos = useRef(new Cola<Pedido>());

  //guarda el proximo numero de pedido
  const proximoNumero = useRef(1);

  //agrega un plato al carrito y a la pila
  const agregarAlCarrito = (plato: Plato) => {
    setCarrito((actual) => [...actual, plato]);
    pilaAcciones.current.push(plato);
  };

  //deshace el ultimo plato agregado
  const deshacerUltimo = () => {
    const plato = pilaAcciones.current.pop();

    if (!plato) {
      return;
    }

    setCarrito((actual) => {
      const copia = [...actual];

      for (let i = copia.length - 1; i >= 0; i--) {
        if (copia[i].id === plato.id) {
          copia.splice(i, 1);
          break;
        }
      }

      return copia;
    });
  };

  //crea el pedido y lo agrega a la cola
  const confirmarPedido = (): number | null => {
    if (carrito.length === 0) {
      return null;
    }

    const numero = proximoNumero.current;

    const pedido: Pedido = {
      numero,
      platos: [...carrito],
      nota,
      total: totalCarrito,
    };

    colaPedidos.current.encolar(pedido);
    proximoNumero.current++;

    //limpia el carrito despues de confirmar
    setCarrito([]);
    setNota("");
    pilaAcciones.current = new Pila<Plato>();

    //actualiza las pantallas que usan la cola
    setVersionCola((version) => version + 1);

    return numero;
  };

  //calcula cuantos pedidos tiene adelante
  const pedidosAdelante = (numero: number): number | null => {
    const pedidos = colaPedidos.current.aArray();
    const posicion = pedidos.findIndex((pedido) => pedido.numero === numero);

    return posicion === -1 ? null : posicion;
  };

  //indica si existe una accion para deshacer
  const puedeDeshacer = !pilaAcciones.current.vacia;

  //calcula el precio total del carrito
  const totalCarrito = carrito.reduce(
    (total, plato) => total + plato.precio,
    0,
  );

  const pedidosEnCola = colaPedidos.current.aArray();

  return (
    <AppContext.Provider
      value={{
        carrito,
        nota,
        pedidosEnCola,
        agregarAlCarrito,
        deshacerUltimo,
        setNota,
        confirmarPedido,
        pedidosAdelante,
        puedeDeshacer,
        totalCarrito,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

//permite usar el contexto desde cualquier pantalla
export function useApp() {
  const contexto = useContext(AppContext);

  if (!contexto) {
    throw new Error("useApp debe usarse dentro de AppProvider");
  }

  return contexto;
}

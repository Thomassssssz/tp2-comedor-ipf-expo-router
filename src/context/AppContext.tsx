import { createContext, ReactNode, useContext, useRef, useState } from "react";

import { Plato } from "../data/platos";
import { Pila } from "../estructuras/Pila";

type AppContextType = {
  carrito: Plato[];
  nota: string;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  setNota: (nota: string) => void;
  puedeDeshacer: boolean;
  totalCarrito: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

//provider global de la aplicacion
export function AppProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [nota, setNota] = useState("");

  //guarda las acciones del carrito en una pila
  const pilaAcciones = useRef(new Pila<Plato>());

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

  //indica si existe una accion para deshacer
  const puedeDeshacer = !pilaAcciones.current.vacia;

  //calcula el precio total del carrito
  const totalCarrito = carrito.reduce(
    (total, plato) => total + plato.precio,
    0,
  );

  return (
    <AppContext.Provider
      value={{
        carrito,
        nota,
        agregarAlCarrito,
        deshacerUltimo,
        setNota,
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

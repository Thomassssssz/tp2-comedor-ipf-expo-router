//categorias permitidas para los platos
export type CategoriaPlato = "desayuno" | "almuerzo" | "bebidas" | "kiosco";

// Define la estructura de cada plato
export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: CategoriaPlato;
};

//datos de ej. del comedor
export const platos: Plato[] = [
  {
    id: 1,
    nombre: "Café con leche",
    precio: 1800,
    descripcion: "Café con leche caliente.",
    categoria: "desayuno",
  },
  {
    id: 2,
    nombre: "Tostadas con queso",
    precio: 2200,
    descripcion: "Tostadas acompañadas con queso crema.",
    categoria: "desayuno",
  },
  {
    id: 3,
    nombre: "Chipá",
    precio: 1200,
    descripcion: "Porción de chipá recién horneado.",
    categoria: "desayuno",
  },

  {
    id: 4,
    nombre: "Milanesa con puré",
    precio: 6500,
    descripcion: "Milanesa acompañada con puré de papas.",
    categoria: "almuerzo",
  },
  {
    id: 5,
    nombre: "Hamburguesa completa",
    precio: 6000,
    descripcion: "Hamburguesa con queso, lechuga y tomate.",
    categoria: "almuerzo",
  },
  {
    id: 6,
    nombre: "Empanadas",
    precio: 3500,
    descripcion: "Porción de tres empanadas.",
    categoria: "almuerzo",
  },

  {
    id: 7,
    nombre: "Agua mineral",
    precio: 1500,
    descripcion: "Botella de agua mineral de 500 ml.",
    categoria: "bebidas",
  },
  {
    id: 8,
    nombre: "Gaseosa",
    precio: 2000,
    descripcion: "Botella de gaseosa de 500 ml.",
    categoria: "bebidas",
  },
  {
    id: 9,
    nombre: "Jugo",
    precio: 1800,
    descripcion: "Botella de jugo sabor naranja.",
    categoria: "bebidas",
  },

  {
    id: 10,
    nombre: "Alfajor",
    precio: 1400,
    descripcion: "Alfajor de chocolate.",
    categoria: "kiosco",
  },
  {
    id: 11,
    nombre: "Galletitas",
    precio: 1700,
    descripcion: "Paquete de galletitas dulces.",
    categoria: "kiosco",
  },
  {
    id: 12,
    nombre: "Barra de cereal",
    precio: 1300,
    descripcion: "Barra de cereal individual.",
    categoria: "kiosco",
  },
];

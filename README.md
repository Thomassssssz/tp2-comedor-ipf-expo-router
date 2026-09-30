# TP2 - Comedor IPF - Expo Router

Trabajo Práctico N° 2 de Taller Complementario - React Native II.

## Descripción

Comedor IPF es una aplicación desarrollada con React Native, Expo SDK 57, Expo Router y TypeScript.

La aplicación permite consultar el menú del comedor, buscar platos, filtrar por categorías, agregar productos al carrito, deshacer acciones, agregar notas, confirmar pedidos y obtener un número de turno.

También cuenta con una sección protegida para el personal de cocina, donde los pedidos se atienden respetando su orden de llegada.

---

## Tecnologías utilizadas

- React Native
- Expo SDK 57
- Expo Router
- TypeScript
- React Context API

---

## Estructura principal

```text
src/
│
├── app/
├── components/
├── context/
├── data/
└── estructuras/
```

### Organización

```text
src/app
```

Contiene únicamente las rutas y layouts de Expo Router.

```text
src/components
```

Contiene componentes reutilizables.

```text
src/context
```

Contiene el estado global de la aplicación.

```text
src/data
```

Contiene los datos y tipos utilizados por el sistema.

```text
src/estructuras
```

Contiene las implementaciones propias de Pila y Cola.

---

## Árbol de rutas

```text
src/app/
│
├── _layout.tsx
├── +not-found.tsx
├── buscar.tsx
├── confirmar.tsx
├── login.tsx
├── pedido.tsx
│
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── menu/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── [id].tsx
│   │
│   └── carrito/
│       ├── _layout.tsx
│       ├── index.tsx
│       └── nota.tsx
│
├── categorias/
│   └── [categoria].tsx
│
├── ayuda/
│   ├── index.tsx
│   └── [...slug].tsx
│
├── turno/
│   └── [numero].tsx
│
└── cocina/
    ├── _layout.tsx
    ├── index.tsx
    └── atendidos.tsx
```

---

## Rutas principales

| Ruta                      | Función                              |
| ------------------------- | ------------------------------------ |
| `/`                       | Pantalla de inicio                   |
| `/menu`                   | Lista de platos                      |
| `/menu/[id]`              | Detalle de un plato                  |
| `/categorias/[categoria]` | Platos filtrados por categoría       |
| `/buscar`                 | Buscador y filtros                   |
| `/carrito`                | Carrito del usuario                  |
| `/carrito/nota`           | Nota para cocina                     |
| `/confirmar`              | Confirmación del pedido              |
| `/turno/[numero]`         | Número de turno                      |
| `/login`                  | Inicio de sesión de cocina           |
| `/cocina`                 | Pedido actual de cocina              |
| `/cocina/atendidos`       | Historial de pedidos atendidos       |
| `/ayuda`                  | Índice de ayuda                      |
| `/ayuda/...`              | Artículos de ayuda                   |
| `/pedido`                 | Ruta antigua que redirige al carrito |

---

## Navegadores utilizados

### Stack raíz

Se configura en:

```text
src/app/_layout.tsx
```

Es el navegador principal de la aplicación.

Contiene las pantallas generales, las rutas protegidas y el modal de confirmación.

También contiene el `AppProvider`, que permite compartir el estado entre todas las pantallas.

---

### Tabs

Se configuran en:

```text
src/app/(tabs)/_layout.tsx
```

Las pestañas principales son:

- Inicio
- Menú
- Carrito

La carpeta `(tabs)` es un grupo de rutas y su nombre no aparece en la URL.

---

### Stack de Menú

Se configura en:

```text
src/app/(tabs)/menu/_layout.tsx
```

Permite navegar entre:

```text
/menu
/menu/[id]
```

El detalle del plato permanece dentro de la tab Menú, por lo que la barra de pestañas continúa visible.

---

### Stack de Carrito

Se configura en:

```text
src/app/(tabs)/carrito/_layout.tsx
```

Permite navegar entre:

```text
/carrito
/carrito/nota
```

---

### Drawer de Cocina

Se configura en:

```text
src/app/cocina/_layout.tsx
```

Permite navegar entre:

- Pedido actual
- Pedidos atendidos

---

## Estado global

El estado global se administra desde:

```text
src/context/AppContext.tsx
```

El contexto contiene información compartida como:

- Carrito
- Nota del pedido
- Cola de pedidos
- Pila de acciones del carrito
- Pila de pedidos atendidos
- Sesión del personal de cocina

---

## Pila

La implementación se encuentra en:

```text
src/estructuras/Pila.ts
```

La Pila utiliza el comportamiento:

```text
LIFO - Last In, First Out
```

El último elemento que entra es el primero que sale.

### Uso en el carrito

Cada vez que se agrega un plato al carrito también se realiza un `push` en la pila.

Cuando el usuario selecciona:

```text
Deshacer ultimo
```

se realiza un `pop` y se elimina el último plato agregado.

### Uso en pedidos atendidos

Los pedidos atendidos también se almacenan en una pila.

De esta forma se puede mostrar primero el pedido atendido más recientemente.

---

## Cola

La implementación se encuentra en:

```text
src/estructuras/Cola.ts
```

La Cola utiliza el comportamiento:

```text
FIFO - First In, First Out
```

El primer elemento que entra es el primero que sale.

Esto permite que los pedidos sean atendidos respetando el orden de llegada.

La implementación no utiliza:

```ts
shift();
```

En su lugar utiliza un índice que representa la posición del frente de la cola.

---

## Flujo de un pedido

El flujo principal es:

```text
Menu
  ↓
Detalle del plato
  ↓
Agregar al carrito
  ↓
Carrito
  ↓
Nota opcional
  ↓
Confirmar pedido
  ↓
Turno
```

Al confirmar un pedido:

1. Se genera un número correlativo.
2. Se crea el pedido.
3. El pedido se agrega a la Cola.
4. Se limpia el carrito.
5. Se muestra `/turno/[numero]`.

---

## replace vs push

Después de confirmar el pedido se utiliza:

```ts
router.replace({
  pathname: "/turno/[numero]",
  params: { numero: numero.toString() },
});
```

Se utiliza `replace` en lugar de `push` porque la pantalla de confirmación no debe quedar debajo de la pantalla de turno.

Si se utilizara `push`, al tocar atrás el usuario podría volver a la pantalla de confirmación y volver a confirmar el mismo pedido.

Con `replace`, la pantalla de confirmación es reemplazada por la pantalla de turno.

---

## Rutas dinámicas

La aplicación utiliza diferentes rutas dinámicas.

### Detalle de plato

```text
/menu/[id]
```

Ejemplo:

```text
/menu/7
```

El parámetro `id` llega como texto y se convierte a número antes de buscar el plato.

---

### Categoría

```text
/categorias/[categoria]
```

Ejemplo:

```text
/categorias/bebidas
```

La categoría recibida se valida antes de mostrar los platos.

---

### Turno

```text
/turno/[numero]
```

Ejemplo:

```text
/turno/2
```

Permite mostrar el número del pedido y la cantidad de pedidos que tiene adelante.

---

## Ruta catch-all

La sección Ayuda utiliza:

```text
/ayuda/[...slug]
```

Esto permite manejar rutas con diferente profundidad.

Ejemplos:

```text
/ayuda/horarios
/ayuda/pagos/efectivo
/ayuda/pagos/tarjeta
```

El parámetro `slug` puede contener varios segmentos de la URL.

---

## Buscador

La ruta:

```text
/buscar
```

permite buscar platos por nombre y filtrar por categoría.

Los parámetros de búsqueda viven en la URL.

Ejemplo:

```text
/buscar?q=chipa&categoria=desayuno
```

Se utiliza:

```ts
useLocalSearchParams();
```

para leer los parámetros.

Para actualizarlos se utiliza:

```ts
router.setParams();
```

Esto permite modificar la búsqueda sin agregar nuevas pantallas a la pila de navegación.

---

## Rutas protegidas

La aplicación utiliza:

```tsx
Stack.Protected;
```

para controlar el acceso a las pantallas relacionadas con Cocina.

Sin sesión iniciada está disponible:

```text
/login
```

Con sesión iniciada están disponibles:

```text
/cocina
/cocina/atendidos
```

Cuando se inicia sesión, la ruta Login deja de formar parte del navegador.

Cuando se cierra sesión, las rutas de Cocina dejan de estar disponibles.

---

## Credenciales de Cocina

Las credenciales utilizadas para probar el sistema son:

```text
Usuario: cocina
Clave: 1234
```

---

## Cocina

La pantalla:

```text
/cocina
```

muestra siempre el pedido ubicado en el frente de la Cola.

El botón:

```text
Atender siguiente
```

desencola el pedido actual y lo agrega a la Pila de pedidos atendidos.

---

## Pedidos atendidos

La pantalla:

```text
/cocina/atendidos
```

muestra los pedidos que ya fueron atendidos.

Los pedidos aparecen desde el más reciente al más antiguo.

---

## Redirect

La aplicación mantiene compatibilidad con una ruta antigua:

```text
/pedido
```

Esta pantalla utiliza:

```tsx
<Redirect href="/carrito" />
```

para enviar automáticamente al usuario a:

```text
/carrito
```

---

## Pantalla 404

El archivo:

```text
src/app/+not-found.tsx
```

maneja las rutas que no existen.

Por ejemplo:

```text
/no-existe
```

muestra una pantalla 404 personalizada e informa la ruta ingresada.

---

## DondeEstoy

El componente:

```text
src/components/DondeEstoy.tsx
```

permite observar cómo Expo Router interpreta la ubicación actual.

Utiliza:

```ts
usePathname();
useSegments();
useLocalSearchParams();
```

Durante el desarrollo puede mostrarse utilizando:

```ts
const DEBUG = true;
```

Para la presentación final se oculta utilizando:

```ts
const DEBUG = false;
```

El componente continúa existiendo en todas las pantallas aunque no se muestre visualmente.

---

## Expo Router

El proyecto utiliza:

```json
"main": "expo-router/entry"
```

y las rutas se generan automáticamente a partir de los archivos ubicados en:

```text
src/app
```

---

## Typed Routes

Las rutas tipadas se encuentran activadas en `app.json`:

```json
"experiments": {
  "typedRoutes": true
}
```

Esto permite que TypeScript detecte errores al escribir rutas incorrectas.

---

## Scheme

El scheme configurado para la aplicación es:

```text
comedoripf
```

Configuración:

```json
"scheme": "comedoripf"
```

---

## Deep Links

En una build propia, un deep link para abrir directamente el plato 7 sería:

```text
comedoripf://menu/7
```

Durante el desarrollo con Expo Go se utiliza:

```text
exp://IP-DE-LA-PC:8081/--/menu/7
```

Ejemplo:

```text
exp://192.168.1.20:8081/--/menu/7
```

La IP debe reemplazarse por la dirección mostrada por Expo al iniciar Metro.

La parte:

```text
/--/
```

separa la dirección del servidor de desarrollo de la ruta interna de la aplicación.

---

## Datos de ejemplo

Los platos se encuentran definidos en:

```text
src/data/platos.ts
```

El proyecto contiene 12 platos distribuidos en cuatro categorías:

- Desayuno
- Almuerzo
- Bebidas
- Kiosco

---

## Ejecutar el proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar Expo:

```bash
npx expo start
```

Iniciar Expo limpiando la caché:

```bash
npx expo start -c
```

Verificar TypeScript:

```bash
npx tsc --noEmit
```

---

## Capturas de funcionamiento

Antes de la entrega se deben agregar capturas o un video corto de:

### Carrito y Deshacer último

Agregar captura.

### Pantalla de turno

Agregar captura.

### Cocina atendiendo pedidos

Agregar captura.

### Login y logout

Agregar captura.

### Pantalla 404

Agregar captura.

---

## Repositorio

El proyecto se desarrolla utilizando Git y GitHub.

La rama principal de desarrollo utilizada es:

```text
develop
```

---

## Trabajo Práctico

**Materia:** Taller Complementario - React Native II  
**Trabajo Práctico:** N° 2 - Expo Router  
**Sistema:** Comedor IPF

# Trabajo Práctico N° 2 — Expo Router

**Materia:** Taller Complementario – React Native II  
**Instituto:** Instituto Politécnico Formosa  
**Alumno:** ****\*\*\*\*****\_\_****\*\*\*\*****  
**Fecha:** ****\*\*\*\*****\_\_****\*\*\*\*****

---

# Parte A · Estructuras de datos: la pila y la cola

## A1. Conceptos

### a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?

**LIFO** significa _Last In, First Out_, es decir, el último elemento que entra es el primero que sale.

Este comportamiento corresponde a una **Pila**.

**FIFO** significa _First In, First Out_, es decir, el primer elemento que entra es el primero que sale.

Este comportamiento corresponde a una **Cola**.

---

### b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?

En una **Pila**, los elementos entran y salen por el mismo extremo, llamado **tope**.

- Se agrega con `push()`.
- Se elimina con `pop()`.

En una **Cola**, los elementos entran por el final y salen por el frente.

- Se agrega al final.
- Se elimina desde el frente.

---

### c) Ejemplos de la vida real y de una aplicación móvil

#### Pila

Ejemplo de la vida real:

Una pila de platos. El último plato que se coloca arriba es el primero que se retira.

Ejemplo en una aplicación móvil:

El historial de pantallas de un `Stack`. La última pantalla abierta queda en el tope y es la primera que se cierra al volver atrás.

#### Cola

Ejemplo de la vida real:

Una fila en un banco. La primera persona que llega es la primera en ser atendida.

Ejemplo en una aplicación móvil:

Las acciones de navegación de Expo Router, que se procesan en el orden en que fueron realizadas.

---

## A2. Seguimiento de una pila

Código:

```js
const p = new Pila();

p.push("Inicio");
p.push("Productos");
p.push("Detalle 3");
p.pop();
p.push("Perfil");

console.log(p.tope()); // (1)
console.log(p.pop()); // (2)
console.log(p.tope()); // (3)
console.log(p.vacia); // (4)
```

Seguimiento:

```text
[]
[Inicio]
[Inicio, Productos]
[Inicio, Productos, Detalle 3]
[Inicio, Productos]
[Inicio, Productos, Perfil]
```

Resultados:

```text
(1) Perfil
(2) Perfil
(3) Productos
(4) false
```

La pila final, de base a tope, queda:

```text
[Inicio, Productos]
```

---

## A3. Seguimiento de una cola

Código:

```js
const c = new Cola();

c.encolar("Ana");
c.encolar("Beto");
c.desencolar();
c.encolar("Caro");
c.encolar("Dani");

console.log(c.frente()); // (1)
console.log(c.desencolar()); // (2)
console.log(c.vacia); // (3)
```

Seguimiento:

```text
[]
[Ana]
[Ana, Beto]
[Beto]
[Beto, Caro]
[Beto, Caro, Dani]
```

Resultados:

```text
(1) Beto
(2) Beto
(3) false
```

La cola final, desde el frente hasta el final, queda:

```text
[Caro, Dani]
```

---

## A4. Análisis de la implementación

### a) ¿Qué significa `#items`?

El símbolo `#` indica que el campo es **privado**.

Esto significa que solamente puede ser utilizado directamente dentro de la clase.

Por ejemplo:

```js
class Pila {
  #items = [];
}
```

Desde afuera de la clase no se puede modificar directamente `#items`.

Esto evita que otras partes del programa alteren accidentalmente la estructura interna de la Pila o Cola.

---

### b) Problema de rendimiento de `shift()`

El método:

```js
array.shift();
```

elimina el primer elemento de un array.

El problema es que después de eliminarlo JavaScript debe desplazar los demás elementos una posición.

Por eso su costo puede ser aproximadamente:

```text
O(n)
```

En una cola muy grande puede resultar poco eficiente.

Las colas más eficientes suelen utilizar:

- un índice que indique dónde está el frente;
- una lista enlazada;
- otra estructura que evite desplazar todos los elementos.

---

### c) ¿Qué método usa la pila y cuál usa la cola?

La pila utiliza:

```js
array.pop();
```

porque necesita eliminar el último elemento agregado.

La cola tradicional utiliza:

```js
array.shift();
```

porque necesita eliminar el primer elemento agregado.

No pueden utilizar el mismo método de extracción porque representan comportamientos diferentes:

```text
Pila → LIFO
Cola → FIFO
```

---

## A5. Programación: una cola eficiente

Implementación de `ColaEficiente` sin utilizar `shift()`:

```js
class ColaEficiente {
  #items = [];
  #indiceFrente = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) {
      return undefined;
    }

    const elemento = this.#items[this.#indiceFrente];
    this.#indiceFrente++;

    if (this.#indiceFrente === this.#items.length) {
      this.#items = [];
      this.#indiceFrente = 0;
    }

    return elemento;
  }

  frente() {
    if (this.vacia) {
      return undefined;
    }

    return this.#items[this.#indiceFrente];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#indiceFrente;
  }
}
```

En lugar de eliminar físicamente el primer elemento del array, se hace avanzar `#indiceFrente`.

---

## A6. Pila y cola dentro de Expo Router

### a) ¿Qué estructura describe el historial de pantallas de un Stack?

El historial de un `Stack` se comporta como una **Pila**.

La pantalla visible es la que se encuentra en el **tope**.

Cuando el usuario vuelve atrás se realiza conceptualmente un:

```text
pop
```

y la pantalla que estaba debajo vuelve a quedar visible.

---

### b) ¿Qué estructura usa Expo Router para las acciones de navegación?

Expo Router utiliza una **Cola** para procesar las acciones de navegación.

Las acciones siguen un orden FIFO.

Si el usuario toca dos links muy rápidamente, las acciones se procesan en el mismo orden en que llegaron.

---

# Parte B · Rutas basadas en archivos

## B1. Del archivo a la URL

| Archivo                              | URL / función                                                           |
| ------------------------------------ | ----------------------------------------------------------------------- |
| `src/app/(tabs)/index.tsx`           | `/`                                                                     |
| `src/app/acerca.tsx`                 | `/acerca`                                                               |
| `src/app/(tabs)/perfil.tsx`          | `/perfil`                                                               |
| `src/app/(tabs)/productos/index.tsx` | `/productos`                                                            |
| `src/app/(tabs)/productos/[id].tsx`  | `/productos/[id]`, por ejemplo `/productos/3`                           |
| `src/app/docs/[...slug].tsx`         | Captura uno o más segmentos, por ejemplo `/docs/react/hooks`            |
| `src/app/_layout.tsx`                | No genera una pantalla visitable. Configura la navegación de la carpeta |
| `src/app/+not-found.tsx`             | Pantalla 404 para rutas inexistentes                                    |
| `src/app/Boton.tsx`                  | Generaría accidentalmente `/Boton`                                      |

La carpeta `(tabs)` no aparece en la URL porque es un grupo de rutas.

El archivo `Boton.tsx` representa un problema si se pretendía utilizar como componente reutilizable. Debería estar, por ejemplo, en:

```text
src/components/Boton.tsx
```

---

## B2. De la URL al archivo

| URL                                         | Archivo                              |
| ------------------------------------------- | ------------------------------------ |
| `/categorias/bebidas` y cualquier categoría | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco`           | `src/app/buscar.tsx`                 |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios`  | `src/app/ayuda/[...slug].tsx`        |
| `/ayuda`                                    | `src/app/ayuda/index.tsx`            |

Los parámetros después de `?`, como `q` y `categoria`, no forman parte del nombre del archivo.

---

## B3. Verdadero o falso

### a)

> Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración.

**Falso.**

Expo Router utiliza navegación basada en archivos. Crear un archivo dentro de `src/app` ya genera una ruta.

---

### b)

> Los archivos `_layout.tsx` son pantallas que el usuario puede visitar.

**Falso.**

Los `_layout.tsx` configuran cómo se muestran y navegan las rutas de una carpeta.

Pueden devolver navegadores como:

```text
Stack
Tabs
Drawer
```

pero no son una URL visitable por el usuario.

---

### c)

> Una carpeta entre paréntesis, como `(tabs)`, no aparece en la URL.

**Verdadero.**

Es un grupo utilizado para organizar rutas y compartir un layout.

---

### d)

> Para agregar una librería conviene usar `npm install`, porque siempre trae la última versión.

**Falso.**

En proyectos Expo conviene utilizar:

```bash
npx expo install nombre-del-paquete
```

porque Expo selecciona una versión compatible con el SDK utilizado.

Instalar la última versión manualmente podría generar incompatibilidades.

---

### e)

> En `package.json`, `"main": "expo-router/entry"` reemplaza al viejo `App.tsx`.

**Verdadero.**

Expo Router utiliza su propio punto de entrada y las rutas se encuentran en `src/app`.

---

### f)

> La ruta `/_sitemap` lista todas las rutas de la app y sirve para depurar.

**Verdadero.**

Permite observar las rutas detectadas por Expo Router.

---

### g)

> Si existen `docs/index.tsx` y `docs/[...slug].tsx`, la URL `/docs` muestra `docs/index.tsx`.

**Verdadero.**

`index.tsx` es la ruta específica para `/docs`.

El catch-all `[...slug]` captura uno o más segmentos adicionales.

---

### h)

> En SDK 57, expo-router usa el mismo número de versión mayor que el SDK.

**Verdadero.**

En Expo SDK 57 se utiliza Expo Router 57.

---

# Parte C · Navegar: Link, router y la pila

## C1. Métodos de router

| Método                    | Qué hace                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `router.push(href)`       | Apila siempre una nueva pantalla                                                                                               |
| `router.navigate(href)`   | Apila si es otra pantalla; si la pantalla visible ya es el mismo destino dinámico, actualiza sus parámetros sin crecer la pila |
| `router.replace(href)`    | Reemplaza el tope de la pila                                                                                                   |
| `router.back()`           | Saca el elemento del tope                                                                                                      |
| `router.dismissTo(href)`  | Desapila hasta llegar a la ruta indicada                                                                                       |
| `router.dismissAll()`     | Vuelve a la primera pantalla de la pila                                                                                        |
| `router.canGoBack()`      | Devuelve `true` si existe una pantalla debajo                                                                                  |
| `router.setParams({...})` | Cambia parámetros de la pantalla actual sin apilar                                                                             |

Si `dismissTo()` no encuentra la ruta dentro de la pila, puede reemplazar la pantalla actual por ese destino.

---

## C2. Simulación de la pila

Estado inicial:

```text
[/productos]
```

### 1.

```js
router.push("/productos/1");
```

Resultado:

```text
[/productos, /productos/1]
```

---

### 2.

```js
router.push("/productos/2");
```

Resultado:

```text
[/productos, /productos/1, /productos/2]
```

---

### 3.

```js
router.navigate("/productos/5");
```

Como la pantalla visible ya es la ruta dinámica de producto, no crece la pila. Cambia el parámetro.

Resultado:

```text
[/productos, /productos/1, /productos/5]
```

---

### 4.

```js
router.push("/perfil");
```

Resultado:

```text
[/productos, /productos/1, /productos/5, /perfil]
```

---

### 5.

```js
router.replace("/buscar");
```

Reemplaza `/perfil`.

Resultado:

```text
[/productos, /productos/1, /productos/5, /buscar]
```

---

### 6.

```js
router.back();
```

Sale `/buscar`.

Resultado:

```text
[/productos, /productos/1, /productos/5]
```

---

### 7.

```js
router.dismissTo("/productos");
```

Desapila hasta encontrar `/productos`.

Resultado:

```text
[/productos]
```

---

### 8.

```js
router.canGoBack();
```

Devuelve:

```text
false
```

porque ya no existe ninguna pantalla debajo.

---

## C3. ¿Link o router?

### a) El usuario toca la tarjeta de un producto

Usaría:

```tsx
<Link href="/productos/3">
```

o un `href` como objeto.

Se utiliza `Link` porque la navegación ocurre directamente por una interacción del usuario con un elemento visible.

---

### b) Se guarda un formulario, la API responde OK y hay que mostrar éxito

Usaría:

```ts
router.replace("/exito");
```

La navegación ocurre después de ejecutar una lógica.

`replace` evita que el usuario vuelva al formulario enviado y lo envíe otra vez.

---

### c) Botón Cancelar dentro de un modal

Usaría:

```ts
router.back();
```

porque solamente se necesita cerrar la pantalla actual y volver a la anterior.

---

### d) Después de un login exitoso hay que ir a la pantalla principal

Usaría:

```ts
router.replace("/");
```

porque no conviene dejar Login debajo en el historial.

En un sistema con rutas protegidas también puede resolverse mediante `Stack.Protected`.

---

### e) Volver directamente a la lista de pedidos que está tres pantallas más abajo

Usaría:

```ts
router.dismissTo("/pedidos");
```

porque elimina todas las pantallas que están por encima hasta llegar a la ruta indicada.

---

## C4. Escribí el código

### a) Link al producto 8 usando `href` como objeto

```tsx
<Link
  href={{
    pathname: "/productos/[id]",
    params: { id: "8" },
  }}
>
  Ver producto 8
</Link>
```

---

### b) Link a `/perfil` que siempre apile

```tsx
<Link href="/perfil" push>
  Perfil
</Link>
```

---

### c) Pressable propio como link a `/carrito`

```tsx
<Link href="/carrito" asChild>
  <Pressable>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

---

## C5. Pensar

En web, un `<Link>` se convierte en un elemento:

```html
<a href="..."></a>
```

Esto permite utilizar funcionalidades normales del navegador, como:

- abrir el enlace en otra pestaña;
- copiar la dirección;
- compartir el enlace;
- utilizar navegación del navegador.

En una aplicación móvil no existe una barra de direcciones visible como en un navegador.

Sin embargo, Expo Router continúa manejando internamente las pantallas mediante URLs.

Esto permite también utilizar deep links para abrir directamente una pantalla desde afuera de la aplicación.

---

# Parte D · Navegadores: Stack, Tabs y Drawer

## D1. Comparación

| Característica            | Stack                                     | Tabs                  | Drawer                          |
| ------------------------- | ----------------------------------------- | --------------------- | ------------------------------- |
| ¿Apila pantallas?         | Sí                                        | No                    | No                              |
| ¿Cómo cambia de pantalla? | Push, Link, back, etc.                    | Tocando una pestaña   | Menú lateral o gesto            |
| Import en SDK 57          | `expo-router`                             | `expo-router/js-tabs` | `expo-router/drawer`            |
| Uso típico                | Detalles, formularios, flujo de pantallas | Secciones principales | Muchas secciones o menú lateral |

---

## D2. Cada tab tiene su pila

El usuario está en Productos y abre:

```text
/productos/4
```

Luego cambia a Inicio y vuelve a Productos.

Al volver verá nuevamente:

```text
/productos/4
```

porque cada tab mantiene su propio historial.

Cambiar de pestaña no destruye la pila de la otra pestaña.

Un ejemplo similar ocurre en aplicaciones como Instagram: se puede entrar a una sección, cambiar de pestaña y luego volver al lugar donde se había quedado.

---

## D3. ¿Dónde va cada pantalla?

### a) Detalle de producto que debe mantener las tabs visibles

Debe estar dentro del Stack de la tab Productos.

---

### b) Modal para confirmar una compra que debe tapar las tabs

Debe estar en el **Stack raíz**.

---

### c) Pantalla Login que se abre como modal

Debe estar en el **Stack raíz**.

---

### d) Mis pedidos anteriores dentro de Perfil

Debe estar dentro de la tab Perfil, utilizando su navegación interna.

---

## D4. Configurar el Stack

### a) Diferencia entre `screenOptions` y `options`

`screenOptions` configura opciones que se aplican a todas las pantallas del navegador.

Ejemplo:

```tsx
<Stack
  screenOptions={{
    headerBackButtonDisplayMode: 'minimal',
  }}
>
```

En cambio:

```tsx
<Stack.Screen options={{ ... }} />
```

configura solamente una pantalla determinada.

---

### b) ¿Por qué `(tabs)` tiene `headerShown: false`?

Porque el grupo Tabs posee su propia navegación.

Si el Stack raíz también mostrara su header podrían aparecer encabezados duplicados.

---

### c) Si `perfil-publico.tsx` no está declarado en el Stack, ¿existe?

Sí.

Expo Router detecta automáticamente el archivo:

```text
src/app/perfil-publico.tsx
```

y genera:

```text
/perfil-publico
```

Declararlo con `Stack.Screen` no es obligatorio para que exista.

Se declara cuando se quieren configurar opciones particulares, por ejemplo:

```tsx
<Stack.Screen name="perfil-publico" options={{ title: "Perfil público" }} />
```

---

### d) Valores posibles de `presentation`

Algunos valores posibles son:

```text
card
modal
formSheet
transparentModal
```

Para una hoja inferior que abra al 50% utilizaría:

```tsx
options={{
  presentation: 'formSheet',
  sheetAllowedDetents: [0.5],
}}
```

---

### e) Cambiar el título desde la pantalla de detalle

Ejemplo:

```tsx
<Stack.Screen
  options={{
    title: `Producto ${id}`,
  }}
/>
```

Si `id` vale `7`, el título será:

```text
Producto 7
```

---

## D5. Tabs y Drawer en SDK 57

### a) ¿Qué cambió al importar Tabs?

En SDK 57 se utiliza:

```tsx
import { Tabs } from "expo-router/js-tabs";
```

Importarlo directamente desde:

```tsx
"expo-router";
```

está deprecado.

También existe la alternativa experimental:

```tsx
NativeTabs;
```

desde:

```tsx
expo - router / unstable - native - tabs;
```

---

### b) ¿Qué paquetes necesita Drawer?

El Drawer utiliza:

```text
react-native-gesture-handler
react-native-reanimated
```

En el layout raíz conviene envolver la aplicación con:

```tsx
GestureHandlerRootView;
```

Ejemplo:

```tsx
<GestureHandlerRootView style={{ flex: 1 }}>
  <Stack />
</GestureHandlerRootView>
```

---

### c) ¿Hace falta instalar `@react-navigation/drawer`?

No.

En SDK 57, Drawer ya está integrado mediante Expo Router.

Se importa:

```tsx
import { Drawer } from "expo-router/drawer";
```

---

### d) ¿En qué navegador actúa `router.back()`?

Actúa sobre el navegador más cercano que tenga una pantalla disponible para sacar.

En navegadores anidados, primero se intenta volver dentro de la navegación interna correspondiente.

---

# Parte E · Rutas dinámicas, parámetros y hooks

## E1. Encontrá el error

Código original:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();

const producto = productos.find((p) => p.id === id);

if (id === 3) {
  console.log("Es el chipá");
}
```

El problema es que los parámetros de la URL llegan como texto.

Por ejemplo:

```text
/productos/3
```

genera:

```ts
id === "3";
```

pero los productos tienen:

```ts
id: 3;
```

Por lo tanto:

```ts
3 === "3";
```

es falso.

Solución:

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const idNumero = Number(id);

  const producto = productos.find((p) => p.id === idNumero);

  if (idNumero === 3) {
    console.log("Es el chipá");
  }

  if (!producto) {
    return <Text>No existe el producto {id}</Text>;
  }

  return <Text>{producto.nombre}</Text>;
}
```

---

## E2. Catch-all

Para:

```text
src/app/docs/[...slug].tsx
```

### `/docs/react`

```ts
slug = ["react"];
```

### `/docs/react/hooks/useState`

```ts
slug = ["react", "hooks", "useState"];
```

### `/docs`

No coincide con `[...slug].tsx`, porque el catch-all requiere uno o más segmentos.

Para que `/docs` tenga una pantalla propia se debe crear:

```text
src/app/docs/index.tsx
```

---

## E3. Anatomía de una URL

URL:

```text
rutasipf://buscar?q=mate&categoria=bebidas
```

### a) Partes de la URL

Scheme:

```text
rutasipf
```

Ruta:

```text
/buscar
```

Parámetros:

```text
q = mate
categoria = bebidas
```

---

### b) ¿Qué devuelve `useLocalSearchParams()`?

Devuelve aproximadamente:

```ts
{
  q: 'mate',
  categoria: 'bebidas'
}
```

---

### c) ¿Hacen falta corchetes para recibir `q`?

No.

Los corchetes se utilizan para segmentos dinámicos de la ruta, por ejemplo:

```text
[id].tsx
```

Los parámetros de búsqueda:

```text
?q=mate
```

pueden utilizarse en cualquier ruta.

Por eso:

```text
buscar.tsx
```

puede recibir `q` y `categoria`.

---

### d) ¿Por qué usar `router.setParams()` en vez de `router.push()`?

Primera razón:

`setParams()` modifica los parámetros de la pantalla actual sin agregar otra pantalla a la pila.

Segunda razón:

La búsqueda queda representada en la URL, por lo que puede compartirse mediante un link.

Ejemplo:

```text
/buscar?q=mate&categoria=bebidas
```

---

## E4. ¿Dónde estoy?

### `/productos/3`

| Hook                     | Resultado                         |
| ------------------------ | --------------------------------- |
| `usePathname()`          | `"/productos/3"`                  |
| `useSegments()`          | `["(tabs)", "productos", "[id]"]` |
| `useLocalSearchParams()` | `{ id: "3" }`                     |

---

### `/buscar?q=chipa`

| Hook                     | Resultado        |
| ------------------------ | ---------------- |
| `usePathname()`          | `"/buscar"`      |
| `useSegments()`          | `["buscar"]`     |
| `useLocalSearchParams()` | `{ q: "chipa" }` |

`usePathname()` no incluye los parámetros de búsqueda.

---

## E5. Local vs global

### a) Diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`

`useLocalSearchParams()` devuelve los parámetros relacionados con la pantalla actual.

Es la opción recomendada por defecto.

Una pantalla que quedó debajo en la pila no necesita volver a renderizarse cada vez que cambia la URL de otra pantalla.

`useGlobalSearchParams()` observa los parámetros globales de la URL.

Puede actualizarse incluso cuando la pantalla que utiliza el hook no está visible.

Esto puede generar más renders de los necesarios.

---

### b) ¿Para qué sirve `useFocusEffect`?

Permite ejecutar una función cada vez que una pantalla vuelve a obtener el foco.

Por ejemplo, se podría actualizar la lista de pedidos cada vez que el usuario vuelve a la pantalla:

```tsx
useFocusEffect(
  useCallback(() => {
    cargarPedidos();
  }, []),
);
```

---

### c) `/productos/mate` abre detalle aunque no exista el producto

No es un error de Expo Router.

La ruta:

```text
/productos/[id]
```

acepta cualquier valor en ese segmento.

Por ejemplo:

```text
/productos/3
/productos/10
/productos/mate
```

Todos coinciden con `[id]`.

La responsabilidad de validar que el producto exista corresponde al código de la aplicación.

---

# Parte F · Redirecciones, rutas protegidas y deep links

## F1. Redirect

### a) ¿Qué hace `<Redirect href="/productos" />`?

Navega automáticamente hacia:

```text
/productos
```

cuando el componente se renderiza.

Equivale conceptualmente a:

```ts
router.replace("/productos");
```

---

### b) ¿Por qué una redirección debe reemplazar?

Porque la pantalla anterior no debe quedar en el historial.

Si se utilizara `push`, podría ocurrir:

```text
ruta vieja
↓
redirect
↓
productos
```

Al tocar atrás el usuario regresaría a la ruta vieja.

La ruta vieja volvería a redirigir a Productos y se generaría un ciclo.

---

## F2. Stack.Protected

Código:

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();

  const conSesion = usuario !== null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>

      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: "modal" }} />
      </Stack.Protected>
    </Stack>
  );
}
```

Los valores correctos son:

```tsx
guard = { conSesion };
```

para la ruta privada.

Y:

```tsx
guard={!conSesion}
```

para Login.

---

### a) ¿Qué pasa cuando `guard` es false?

La pantalla protegida deja de existir para el navegador.

No solamente se oculta visualmente.

---

### b) ¿Por qué Login se cierra solo al iniciar sesión?

Al iniciar sesión:

```ts
conSesion = true;
```

Entonces:

```tsx
guard={!conSesion}
```

pasa a ser falso.

Como consecuencia, la ruta Login desaparece automáticamente del navegador y del historial.

No hace falta ejecutar:

```ts
router.back();
```

---

### c) Error “NAVIGATE was not handled by any navigator”

Puede ocurrir cuando se intenta navegar hacia una pantalla protegida cuyo `guard` es falso.

En ese momento la pantalla no existe dentro del navegador.

Se evita comprobando la sesión antes de mostrar el botón o antes de realizar la navegación.

---

### d) Ventaja de `Stack.Protected`

Permite centralizar la protección de varias rutas en el navegador.

No hace falta colocar:

```tsx
<Redirect />
```

manualmente dentro de cada pantalla.

Además, las rutas protegidas aparecen y desaparecen automáticamente del historial cuando cambia el estado del `guard`.

---

## F3. 404, anchor y rutas tipadas

### a) `+not-found.tsx`

Se define en:

```text
src/app/+not-found.tsx
```

Se utiliza cuando ninguna ruta coincide con la URL ingresada.

Permite crear una pantalla 404 personalizada.

---

### b) `anchor`

Se configura en:

```text
src/app/_layout.tsx
```

Ejemplo:

```tsx
export const unstable_settings = {
  anchor: "(tabs)",
};
```

Indica qué pantalla o grupo debe quedar debajo cuando la aplicación se abre directamente mediante un deep link.

Por ejemplo, si se abre:

```text
/categorias/bebidas
```

el grupo `(tabs)` queda debajo en la pila.

---

### c) Typed Routes

Se activan en:

```text
app.json
```

por ejemplo:

```json
"experiments": {
  "typedRoutes": true
}
```

Si se escribe:

```tsx
<Link href="/prodcutos" />
```

TypeScript muestra un error porque esa ruta no existe.

Los tipos se generan al ejecutar Expo dentro de:

```text
.expo/types
```

---

## F4. Deep links

La aplicación tiene:

```json
"scheme": "comedoripf"
```

y la computadora tiene IP:

```text
192.168.1.20
```

Se quiere abrir:

```text
/menu/7
```

### App instalada

```text
comedoripf://menu/7
```

---

### Expo Go en desarrollo

```text
exp://192.168.1.20:8081/--/menu/7
```

---

### Web

```text
http://localhost:8081/menu/7
```

---

### ¿Qué significa `/--/`?

En Expo Go:

```text
/--/
```

separa la dirección del servidor de desarrollo de la ruta interna de la aplicación.

Ejemplo:

```text
exp://192.168.1.20:8081
```

es el servidor.

Y:

```text
/menu/7
```

es la ruta de nuestra aplicación.

---

### ¿Por qué `comedoripf://` no funciona dentro de Expo Go?

Porque Expo Go es una aplicación genérica y utiliza su propio scheme:

```text
exp://
```

El scheme personalizado:

```text
comedoripf://
```

funciona cuando se genera una build propia de desarrollo o producción.

---

## F5. Errores comunes

### a) Array de estilos con `Link asChild`

Código problemático:

```tsx
<Link href="/perfil" asChild>
  <Pressable style={[estilos.boton, activo && estilos.activo]} />
</Link>
```

Puede aparecer:

```text
You are passing an array of styles to a child of <Slot>
```

La solución es envolver el elemento en un componente propio y construir el estilo dentro de ese componente, evitando pasar directamente ese array como hijo de `Link asChild`.

---

### b) `TarjetaProducto.tsx` dentro de `src/app`

Si se crea:

```text
src/app/TarjetaProducto.tsx
```

Expo Router interpreta el archivo como una ruta.

Por eso aparecería una pantalla nueva no deseada.

Debe moverse, por ejemplo, a:

```text
src/components/TarjetaProducto.tsx
```

---

### c) Después del login se usa `router.push("/")`

El problema es que Login continúa debajo en la pila.

Entonces, al tocar atrás, el usuario puede volver al Login.

Se puede solucionar utilizando:

```ts
router.replace("/");
```

o, preferentemente para rutas protegidas:

```tsx
Stack.Protected;
```

---

### d) Expo Go queda incompatible después de `npm install`

El problema puede ocurrir porque `npm install` instala una versión que no coincide con el SDK de Expo utilizado.

Para instalar dependencias compatibles se debe utilizar:

```bash
npx expo install nombre-del-paquete
```

Expo selecciona una versión compatible con el SDK y con Expo Go.

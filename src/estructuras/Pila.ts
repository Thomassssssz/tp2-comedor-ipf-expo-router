//pila generica con compartamiento lifo
export class Pila<T> {
  //guarda los elemntos sin permitir acceso externo directo
  #items: T[] = [];

  //agrega un elemnto al tope
  push(elemento: T): void {
    this.#items.push(elemento);
  }

  //elimina y devuelve el elemnto del tope
  pop(): T | undefined {
    return this.#items.pop();
  }

  //devuelve el elemnto del tope sin eliminarlo
  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  //indica si la pila esta vacia
  get vacia(): boolean {
    return this.#items.length === 0;
  }

  //devuelve la cantidad de elemntos
  get tamanio(): number {
    return this.#items.length;
  }

  //devuelve una copia de los elemmtos
  aArray(): T[] {
    return [...this.#items];
  }
}

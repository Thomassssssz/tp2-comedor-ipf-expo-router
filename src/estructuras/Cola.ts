//cola generica con comportamiento fifo
export class Cola<T> {
  //guarda los elementos de la cola
  #items: T[] = [];

  //indica la posicion actual del frente
  #indiceFrente = 0;

  //agrega un elemento al final de la cola
  encolar(elemento: T): void {
    this.#items.push(elemento);
  }

  //elimina y devuelve el elemento del frente
  desencolar(): T | undefined {
    if (this.vacia) {
      return undefined;
    }

    const elemento = this.#items[this.#indiceFrente];
    this.#indiceFrente++;

    //reinicia la cola cuando queda vacia
    if (this.#indiceFrente === this.#items.length) {
      this.#items = [];
      this.#indiceFrente = 0;
    }

    return elemento;
  }

  //devuelve el elemento del frente sin eliminarlo
  frente(): T | undefined {
    if (this.vacia) {
      return undefined;
    }

    return this.#items[this.#indiceFrente];
  }

  //indica si la cola esta vacia
  get vacia(): boolean {
    return this.tamanio === 0;
  }

  //devuelve la cantidad de elementos pendientes
  get tamanio(): number {
    return this.#items.length - this.#indiceFrente;
  }

  //devuelve una copia de los elementos pendientes
  aArray(): T[] {
    return this.#items.slice(this.#indiceFrente);
  }
}

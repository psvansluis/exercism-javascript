// @ts-check

export class Element {
  value;
  /** @type {Element | null} */ next = null;

  /**
   * @param {any} value
   */
  constructor(value) {
    this.value = value;
  }

  get rightNeighbours() {
    return (this.next?.rightNeighbours ?? -1) + 1;
  }

  get array() {
    return [this.value, ...(this?.next?.array ?? [])];
  }
}

export class List {
  /** @type {Element | null} */ #head = null;

  /**
   *
   * @param {any[]} array
   */
  constructor(array = []) {
    array.forEach((item) => {
      this.add(new Element(item));
    });
  }

  /**
   *
   * @param {Element} nextValue
   */
  add(nextValue) {
    if (this.#head !== null) {
      nextValue.next = this.#head;
    }
    this.#head = nextValue;
  }

  get length() {
    return (this.head?.rightNeighbours ?? -1) + 1;
  }

  get head() {
    return this.#head;
  }

  toArray() {
    return this.head?.array ?? [];
  }

  reverse() {
    return new List(this.toArray());
  }
}

// @ts-check

class CircularBuffer {
  #currentCell;
  constructor(size) {
    this.#currentCell = new Cell(size);
  }

  write(contents) {
    this.#currentCell = this.#currentCell.write(contents);
  }

  read() {
    return this.#currentCell.read();
  }

  forceWrite(contents) {
    this.#currentCell = this.#currentCell.write(contents, true);
  }

  clear() {
    this.#currentCell.clear();
  }
}

class Cell {
  #contents;
  #next;

  /**
   *
   * @param {number} size
   * @param {Cell?} firstCell
   */
  constructor(size, firstCell = null) {
    const newFirstCell = firstCell ?? this;
    this.#next = size <= 1 ? newFirstCell : new Cell(size - 1, newFirstCell);
  }

  read(firstCell = this) {
    if (this.#contents !== undefined) {
      const out = this.#contents;
      this.#contents = undefined;
      return out;
    } else if (this.#next === firstCell) {
      throw new BufferEmptyError();
    } else {
      return this.#next.read(this);
    }
  }

  write(contents, force = false) {
    if (force || this.#contents === undefined) {
      this.#contents = contents;
      return this.#next;
    } else {
      throw new BufferFullError();
    }
  }

  clear(firstCell = this) {
    this.#contents = undefined;
    if (this.#next !== firstCell) {
      this.#next.clear(this);
    }
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {}

export class BufferEmptyError extends Error {}

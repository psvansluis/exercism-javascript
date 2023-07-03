// @ts-check

export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || "Invalid Input";
  }
}

export class Robot {
  #x = 0;
  #y = 0;
  #bearing = "north";

  #bearings = {
    north: { right: "east", advance: () => this.#y++ },
    east: { right: "south", advance: () => this.#x++ },
    south: { right: "west", advance: () => this.#y-- },
    west: { right: "north", advance: () => this.#x-- },
  };

  get bearing() {
    return this.#bearing;
  }

  get coordinates() {
    return [this.#x, this.#y];
  }

  place({ x, y, direction }) {
    if (!(direction in this.#bearings) || typeof (x + y) !== "number") {
      throw new InvalidInputError();
    }
    [this.#x, this.#y, this.#bearing] = [x, y, direction];
  }

  evaluate(instructions) {
    [...instructions].forEach((ch) => this[ch.toLowerCase()]());
  }

  r() {
    this.#bearing = this.#bearings[this.bearing].right;
  }

  a() {
    this.#bearings[this.bearing].advance();
  }

  l() {
    this.r();
    this.r();
    this.r();
  }
}

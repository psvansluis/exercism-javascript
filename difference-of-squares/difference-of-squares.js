// @ts-check

export class Squares {
  #n;

  /**
   * @param {number} n
   */
  constructor(n) {
    this.#n = n;
  }

  get sumOfSquares() {
    return this.#n < 1 ? 0 : new Squares(this.#n - 1).sumOfSquares + (this.#n ** 2);
  }

  get squareOfSum() {
    return ((this.#n ** 2 + this.#n) / 2) ** 2;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}

// @ts-check
export class Card {
  #rank;
  #suit;

  /**
   *
   * @param {string} cardString
   */
  constructor(cardString) {
    this.#rank = cardString.slice(0, -1);
    this.#suit = cardString.slice(-1);
  }

  /**
   * @returns {number}
   */
  get rank() {
    return { J: 11, Q: 12, K: 13, A: 14 }[this.#rank] ?? parseInt(this.#rank);
  }

  /**
   * @returns {string}
   */
  get suit() {
    return this.#suit;
  }
}

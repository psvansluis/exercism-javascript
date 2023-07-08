export class Card {
  #rank;
  #suit;

  constructor(cardString) {
    this.#rank = cardString.slice(0, -1);
    this.#suit = cardString.slice(-1);
  }

  get rank() {
    return { J: 11, Q: 12, K: 13, A: 14 }[this.#rank] ?? parseInt(this.#rank);
  }

  get suit() {
    return this.#suit;
  }
}

// @ts-check

import verses from "./house.json";

export class House {
  /**
   * @param {number} no
   * @returns {string}
   */
  static #embedded = (no) =>
    no < 2
      ? ""
      : `the ${verses[no - 2].noun}\nthat ${
          verses[no - 2].verb
        } ${this.#embedded(no - 1)}`;

  /**
   * @param {number} no
   * @returns {string[]}
   */
  static verse = (no) =>
    `This is ${this.#embedded(no)}the house that Jack built.`.split("\n");

  /**
   * @param {number} start
   * @param {number} end
   * @returns {string[]}
   */
  static verses = (start, end) =>
    start >= end
      ? this.verse(start)
      : [...this.verse(start), "", ...this.verses(start + 1, end)];
}

// @ts-check

import CoordinatePair from "./coordinate-pair";
/**
 * reverses an array
 * @param {any[]} arr
 * @returns {any[]}
 */
const reverse = (arr) => [...arr].reverse();

/**
 * @param {any[][]} mat
 * @returns {any[][]}
 */
const transpose = (mat) => mat[0].map((col, i) => mat.map((row) => row[i]));

/**
 *
 * @param {any[][]} mat
 * @returns {any[][]}
 */
export const rotateRight = (mat) => transpose(reverse(mat));

export default class WordSearch {
  #grid;

  /**
   * @param {string[]} grid
   */
  constructor(grid) {
    this.#grid = grid.map((row) => [...row]);
  }

  get height() {
    return this.#grid.length;
  }

  get width() {
    return this.#grid[0].length;
  }
  /**
   * @returns {{x:number,y:number}[]}
   */
  get #coordinates() {
    return this.#grid.map((row, y) => row.map((cell, x) => ({ y, x }))).flat();
  }

  /**
   * @returns {{x:number,y:number}[]}
   */
  get topLeftBottomRightDiagonalOrigins() {
    return this.#coordinates.filter(({ x, y }) => x * y === 0);
  }

  rotateGridRight(times) {
    return times < 1
      ? this.#grid
      : rotateRight(this.rotateGridRight(times - 1));
  }

  /**
   *
   * @param {{y:number, x:number}} param0
   * @returns
   */
  getCoordinate({ y, x }) {
    if (y >= this.height || x >= this.width || Math.min(x, y) < 0) {
      return undefined;
    }
    return this.#grid[y][x];
  }

  /**
   * @param {{y:number, x:number}} arg0
   * @returns {string}
   */
  topLeftBottomRightDiagonalForOrigin({ y, x }) {
    const char = this.getCoordinate({ y, x });
    return char
      ? char + this.topLeftBottomRightDiagonalForOrigin({ y: y + 1, x: x + 1 })
      : "";
  }

  /**
   *
   * @param {string} word
   * @returns {CoordinatePair | undefined}
   */
  #coordinateForWord(word) {
    return this.#findLTR(word) ?? this.#findTLTBR(word);
  }

  /**
   * @returns {{y: number, x: number, value: string}[]}
   */
  get topLeftBottomRightDiagonals() {
    return this.topLeftBottomRightDiagonalOrigins.map((coords) => ({
      ...coords,
      value: this.topLeftBottomRightDiagonalForOrigin(coords),
    }));
  }

  /**
   * @param {string} word
   * @returns {CoordinatePair | undefined}
   */
  #findLTR(word) {
    return this.#grid
      .map((row, index) => {
        const x = row.join("").indexOf(word),
          y = index + 1;
        return x > -1
          ? new CoordinatePair(y, x + 1, y, x + word.length)
          : undefined;
      })
      .find((el) => el);
  }

  /**
   * @param {string} word
   * @returns {CoordinatePair | undefined}
   */
  #findTLTBR(word) {
    const match = this.topLeftBottomRightDiagonals.find(({ value }) =>
      value.includes(word)
    );
    if (!match) {
      return undefined;
    }
    const { x, y, value } = match,
      startIndex = value.indexOf(word),
      startOffset = startIndex + 1,
      endOffset = startIndex + word.length;
    return new CoordinatePair(
      y + startOffset,
      x + startOffset,
      y + endOffset,
      x + endOffset
    );
  }

  /**
   * @param {string[]} words
   * @returns {object}
   */
  find(words) {
    return words.reduce(
      (out, word) => ({
        ...out,
        [word]: this.#coordinateForWord(word),
      }),
      {}
    );
  }
}

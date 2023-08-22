// @ts-check

/**
 * reverses an array
 * @param {any[]} arr
 * @returns {any[]}
 */
const reverse = (arr) => [...arr].reverse();

/**
 * @param {function} f
 * @param {any} arg
 * @param {number} n
 * @returns {any}
 */
const doTimes = (f, arg, n) => (n < 1 ? arg : doTimes(f, f(arg), n - 1));

/**
 * @param {any[][]} mat
 * @returns {any[][]}
 */
const transpose = (mat) => mat[0].map((col, i) => mat.map((row) => row[i]));

const filterDuplicateObjects = (arr) =>
  arr.filter(
    (v, i, a) =>
      a.findIndex((v2) => JSON.stringify(v2) === JSON.stringify(v)) === i
  );

/**
 *
 * @param {any[][]} mat
 * @returns {any[][]}
 */
const rotate180 = (mat) => reverse(mat.map(reverse));

/**
 *
 * @param {any[]} arr
 * @returns {any[]}
 */
const removeDuplicates = (arr) => {
  let map = new Map();
  arr.forEach((item) => {
    map.set(JSON.stringify(item), item);
  });
  return [...map.values()];
};
/**
 *
 * @param {any[][]} mat
 * @returns {any[][]}
 */
export const rotateLeft = (mat) => transpose(reverse(transpose(mat)));

class CoordinatePair {
  start;
  end;
  /**
   *
   * @param {number} startY
   * @param {number} startX
   * @param {number} endY
   * @param {number} endX
   */
  constructor(startY, startX, endY, endX) {
    this.start = [startY, startX];
    this.end = [endY, endX];
  }

  /**
   * @returns {CoordinatePair}
   */
  get transposed() {
    return new CoordinatePair(
      this.start[1],
      this.start[0],
      this.end[1],
      this.end[0]
    );
  }

  /**
   * @returns {CoordinatePair}
   */
  get invertStartEnd() {
    return new CoordinatePair(
      this.end[0],
      this.end[1],
      this.start[0],
      this.start[1]
    );
  }

  /**
   *
   * @param {WordSearch} wordSearch
   * @returns {CoordinatePair}
   */
  reverse(wordSearch) {
    const newY = (y) => wordSearch.height + 1 - y;
    return new CoordinatePair(
      newY(this.start[0]),
      this.start[1],
      newY(this.end[0]),
      this.end[1]
    );
  }
}

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

  get #leftSideCoordinates() {
    return [...new Array(this.height)].map((_, i) => ({ y: i, x: 0 }));
  }

  get #topSideCoordinates() {
    return [...new Array(this.width)].map((_, i) => ({ y: 0, x: i }));
  }

  /**
   * @returns {{x:number,y:number}[]}
   */
  get topLeftBottomRightDiagonalOrigins() {
    return removeDuplicates([
      ...this.#leftSideCoordinates,
      ...this.#topSideCoordinates,
    ]);
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

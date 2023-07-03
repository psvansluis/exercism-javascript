// @ts-check

const BOARD_SIZE = 8;
const EMPTY_BOARD = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill("_"));

export class QueenAttack {
  black;
  white;
  constructor({
    black: [blackRow, blackColumn] = [0, 3],
    white: [whiteRow, whiteColumn] = [7, 3],
  } = {}) {
    if (
      [blackRow, blackColumn, whiteRow, whiteColumn].some(
        (el) => el < 0 || el >= BOARD_SIZE
      )
    ) {
      throw new Error("Queen must be placed on the board");
    }
    if (blackRow === whiteRow && blackColumn === whiteColumn) {
      throw new Error("Queens cannot share the same space");
    }
    this.black = [blackRow, blackColumn];
    this.white = [whiteRow, whiteColumn];
  }

  toString() {
    return [
      { label: "W", positions: this.white },
      { label: "B", positions: this.black },
    ]
      .reduce(QueenAttack.#addQueenToBoard, EMPTY_BOARD)
      .map((row) => row.join(" "))
      .join("\n");
  }

  get canAttack() {
    return (
      this.#canAttackHorizontally ||
      this.#canAttackVertically ||
      this.#canAttackDiagonally
    );
  }

  get #canAttackHorizontally() {
    return this.black[0] === this.white[0];
  }

  get #canAttackVertically() {
    return this.black[1] === this.white[1];
  }

  get #canAttackDiagonally() {
    return (
      Math.abs(this.white[0] - this.black[0]) ===
      Math.abs(this.white[1] - this.black[1])
    );
  }

  /**
   *
   * @param {string[][]} board
   * @param {{label: string, positions: number[]}} queen
   * @returns {string[][]}
   */
  static #addQueenToBoard(board, queen) {
    const { label, positions } = queen;
    const copy = JSON.parse(JSON.stringify(board));
    copy[positions[0]][positions[1]] = label;
    return copy;
  }
}

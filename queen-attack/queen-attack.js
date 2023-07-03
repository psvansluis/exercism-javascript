// @ts-check

export class QueenAttack {
  black;
  white;
  constructor({ black: [br, bc] = [], white: [wr, wc] = [] } = {}) {
    if ([br, bc, wr, wc].some((x) => x < 0 || x >= 8)) {
      throw new Error("Queen must be placed on the board");
    }
    if (br === wr && bc === wc) {
      throw new Error("Queens cannot share the same space");
    }
    this.black = [br, bc];
    this.white = [wr, wc];
  }

  toString() {
    throw new Error("Remove this statement and implement this function");
  }

  get canAttack() {
    if (this.black[0] === this.white[0]) {
      return true;
    } else if (this.black[1] === this.white[1]) {
      return true;
    } else {
      return (
        Math.abs(this.black[0] - this.white[0]) ===
        Math.abs(this.black[1] - this.white[1])
      );
    }
  }
}

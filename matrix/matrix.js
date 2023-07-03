// @ts-check
export class Matrix {
  rows;
  constructor(str) {
    this.rows = str.split("\n").map((l) => l.split(" ").map(Number));
  }

  get columns() {
    return this.rows[0].map((_, i) => this.rows.map((r) => r[i]));
  }
}

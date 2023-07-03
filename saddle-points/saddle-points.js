export const saddlePoints = (mat) =>
  mat.flatMap((row, y) =>
    row.reduce(
      (acc, val, x) =>
        row.every((v) => val >= v) && mat.every((r) => val <= r[x])
          ? [...acc, new Coord(y, x)]
          : acc,
      []
    )
  );

class Coord {
  row;
  column;
  constructor(row, column) {
    this.row = row + 1;
    this.column = column + 1;
  }
}

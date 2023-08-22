// @ts-check

/**
 *
 * @param {string[][]} matrix
 * @returns {string[][]}
 */
const rotate = (matrix) =>
  matrix.length < 1
    ? matrix
    : matrix[0].map((val, index) =>
        matrix.map((row) => row[row.length - 1 - index])
      );

const incrementCell = (cell) =>
  ({ "*": "*", " ": "1" }[cell] || String(Number(cell) + 1));

/**
 * @param {string[][]} board
 * @returns {string[][]}
 */
const annotateBelowAndBelowRight = (board) => {
  if (board.length < 2) {
    return board;
  }
  const [firstRow, secondRow, ...remainingRows] = board;

  const secondRowAnnotated = secondRow.map((val, index) =>
    doTimes(
      val,
      incrementCell,
      [firstRow[index - 1], firstRow[index]].filter((cell) => cell === "*")
        .length
    )
  );

  return [
    firstRow,
    ...annotateBelowAndBelowRight([secondRowAnnotated, ...remainingRows]),
  ];
};

/**
 * @param {any} input
 * @param {function} func
 * @param {number} times
 * @returns {any}
 */
const doTimes = (input, func, times) =>
  times < 1 ? input : doTimes(func(input), func, times - 1);

/**
 * @param {string[]} board
 * @returns {string[]}
 */
export const annotate = (board) =>
  doTimes(
    board.map((row) => (row.length > 0 ? [...row] : [row])),
    (input) => rotate(annotateBelowAndBelowRight(input)),
    4
  ).map((row) => row.join(""));

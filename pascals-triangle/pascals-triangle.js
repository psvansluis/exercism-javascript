/**
 * @param {number} nrows
 * @returns {number[][]}
 */
export const rows = (nrows) => {
  if (nrows < 1) {
    return [];
  } else if (nrows === 1) {
    return [[1]];
  } else {
    const previous = rows(nrows - 1);
    return [...previous, nextRow(previous[previous.length - 1])];
  }
};

/**
 * @param {number[]} row
 * @returns {number[]}
 */
const nextRow = (row) =>
  row.reduce(
    (acc, val) => [
      ...acc.slice(0, acc.length - 1),
      acc[acc.length - 1] + val,
      val,
    ],
    [0]
  );

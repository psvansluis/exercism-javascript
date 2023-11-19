/// <reference path="./types.d.ts" />
// @ts-check

/**
 *
 * @param {string[]} diagram
 * @returns {number}
 */
export function count(diagram) {
  const horizontalSegments = diagram.flatMap((line, i) =>
    segments(line, "-").map(({ start, end }) => ({
      xstart: start,
      xend: end,
      ystart: i,
      yend: i,
    }))
  );
  const verticalSegments = transpose(diagram).flatMap((line, i) =>
    segments(line, "|").map(({ start, end }) => ({
      xstart: i,
      xend: i,
      ystart: start,
      yend: end,
    }))
  );
  const coordinates = diagram.flatMap((row, y) =>
    [...row].map((_, x) => ({
      x,
      y,
    }))
  );
  const possibleSquares = coordinates
    .flatMap((startCoord) =>
      coordinates.map((endCoord) => ({
        xstart: startCoord.x,
        xend: endCoord.x,
        ystart: startCoord.y,
        yend: endCoord.y,
      }))
    )
    .filter((sq) => sq.xstart < sq.xend && sq.ystart < sq.yend);
  /**
   *
   * @param {segment} square
   * @returns {boolean}
   */
  const hasSegments = (square) =>
    [
      { ...square, xend: square.xstart },
      { ...square, yend: square.ystart },
      { ...square, xstart: square.xend },
      { ...square, ystart: square.yend },
    ].every((squareSegment) =>
      [...horizontalSegments, ...verticalSegments].some(
        (pred) => JSON.stringify(pred) === JSON.stringify(squareSegment)
      )
    );
  const squares = possibleSquares.filter(hasSegments);
  return squares.length;
}

/**
 * @param {string[]} matrix
 * @returns {string[]}
 */
const transpose = (matrix) =>
  matrix.length < 1
    ? [""]
    : [...matrix[0]].map((_, i) => matrix.map((row) => row[i]).join(""));

/**
 * @param {string} line
 * @param {connector} connector
 * @returns {{start: number, end: number}[]}
 */
const segments = (line, connector) => {
  const cornerIndices = [...line].reduce(
    (acc, el, i) => (el === "+" ? [...acc, i] : acc),
    Array()
  );
  return cornerIndices
    .flatMap((left) =>
      cornerIndices.map((right) => ({
        left,
        right,
        isSegment:
          left < right &&
          [...line]
            .slice(left, right)
            .every((val) => [connector, "+"].includes(val)),
      }))
    )
    .reduce(
      (acc, el) =>
        el.isSegment ? [...acc, { start: el.left, end: el.right }] : acc,
      Array()
    );
};

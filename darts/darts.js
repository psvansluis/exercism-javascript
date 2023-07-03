// @ts-check

const CIRCLES = [
  { r: 1, s: 10 },
  { r: 5, s: 5 },
  { r: 10, s: 1 },
];

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
export const score = (x, y) => {
  for (let c of CIRCLES) {
    if (Math.sqrt(x ** 2 + y ** 2) <= c.r) {
      return c.s;
    }
  }
  return 0;
};

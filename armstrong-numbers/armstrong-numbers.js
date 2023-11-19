// @ts-check

/**
 * @param {number} n
 * @returns {boolean}
 */
export const isArmstrongNumber = (n) =>
  n === digits(n).reduce((s, d, _i, a) => s + d ** a.length, 0);

/**
 * @param {number} n
 * @returns {number[]}
 */
const digits = (n) => (n < 10 ? [n] : [...digits(Math.floor(n / 10)), n % 10]);

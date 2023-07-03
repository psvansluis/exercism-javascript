// @ts-check

/**
 *
 * @param {number} num
 * @returns {string}
 */
export const classify = (num) => {
  if (num < 1)
    throw new Error("Classification is only possible for natural numbers.");
  const factorSum = [...Array(num).keys()]
    .filter((x) => num % x === 0)
    .reduce((a, b) => a + b, 0);
  return num === factorSum
    ? "perfect"
    : num < factorSum
    ? "abundant"
    : "deficient";
};

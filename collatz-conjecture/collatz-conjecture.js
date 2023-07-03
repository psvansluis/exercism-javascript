// @ts-check

/**
 *
 * @param {number} n
 * @param {number} stepsTaken
 * @returns {number}
 */
export const steps = (n, stepsTaken = 0) => {
  if (n < 1) {
    throw new Error("Only positive numbers are allowed");
  } else if (n === 1) {
    return stepsTaken;
  } else {
    return steps(n % 2 === 0 ? n / 2 : 3 * n + 1, stepsTaken + 1);
  }
};

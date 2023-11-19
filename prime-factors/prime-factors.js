// @ts-check

/**
 * 
 * @param {number} n 
 * @returns {number[]}
 */
export const primeFactors = (n) => {
  let factor = 2;
  let out = [];
  while (n > 1) {
    if (n % factor === 0) {
      out.push(factor);
      n /= factor;
    } else {
      factor++;
    }
  }
  return out;
}

// @ts-check
/**
 *
 * @param {number} radicand
 * @returns {number}
 */
export const squareRoot = (radicand) => {
  return search(Math.floor(Math.random() * radicand), radicand);
};

/**
 * @param {number} guess
 * @param {number} radicand
 * @returns {number}
 */
const search = (guess, radicand) => {
  console.log(`Guessing ${guess} for ${radicand}...`);
  if (guess * guess < radicand) {
    return search(guess + 1, radicand);
  } else if (guess * guess > radicand) {
    return search(Math.floor(guess / 2), radicand);
  } else {
    return guess;
  }
};

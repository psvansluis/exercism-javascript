// @ts-check

/**
 * Converts a number into a string that contains raindrop sounds corresponding to certain potential factors.
 *
 * @param {number} number
 * @returns {string}
 */
export const convert = (number) =>
  [
    { factor: 3, vowel: "i" },
    { factor: 5, vowel: "a" },
    { factor: 7, vowel: "o" },
    // /* the function is easily extended for any vowel */
    // { factor: 11, vowel: "u" },
    // { factor: 13, vowel: "e" },
    // { factor: 17, vowel: "y" },
  ]
    .filter((obj) => number % obj.factor === 0)
    .map((obj) => `Pl${obj.vowel}ng`)
    .join("") || number.toString();

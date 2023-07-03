// @ts-check
/**
 *
 * @param {string} word
 * @returns {number}
 */
export const score = (word) => {
  return [...word.toLowerCase()].reduce((a, e) => a + scoreLetter(e), 0);
};

/**
 *
 * @param {string} letter
 * @returns {number}
 */
const scoreLetter = (letter) => {
  switch (letter) {
    case "a":
    case "e":
    case "i":
    case "o":
    case "u":
    case "l":
    case "n":
    case "r":
    case "s":
    case "t":
      return 1;
    case "d":
    case "g":
      return 2;
    case "b":
    case "c":
    case "m":
    case "p":
      return 3;
    case "f":
    case "h":
    case "v":
    case "w":
    case "y":
      return 4;
    case "k":
      return 5;
    case "j":
    case "x":
      return 8;
    case "q":
    case "z":
      return 10;
    default:
      throw new Error("Scrabble letter not recognized");
  }
};

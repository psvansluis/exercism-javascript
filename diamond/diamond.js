// @ts-check

/**
 *
 * @param {string} char
 * @returns {string[]}
 */
export const rows = (char) => {
  if (!/^[A-Z]$/.test(char)) throw new Error(`${char} is not in range A-Z.`);
  const top = topHalf(char);
  const [_, ...bottom] = [...top].reverse();
  return [...top, ...bottom];
};

/**
 *
 * @param {string} char
 * @returns {string[]}
 */
const topHalf = (char) => {
  if (char === "A") {
    return ["A"];
  }
  const previousLetter = String.fromCharCode(char.charCodeAt(0) - 1);
  const previousRows = topHalf(previousLetter).map((str) => ` ${str} `);
  const thisRow = char + " ".repeat((char.charCodeAt(0) - 65) * 2 - 1) + char;
  return [...previousRows, thisRow];
};

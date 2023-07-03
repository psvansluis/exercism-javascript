// @ts-check

const ALPHABET = Array.from(Array(26)).map((_, i) =>
  String.fromCharCode(97 + i)
);
/**
 *
 * @param {string} sentence
 * @returns {boolean}
 */
export const isPangram = (sentence) => {
  const lc = sentence.toLowerCase();
  return ALPHABET.every((letter) => lc.match(letter));
};

// @ts-check
const ABC = 26;
const DIGITS = 10;
const A = "a".charCodeAt(0);
const ZERO = "0".charCodeAt(0);

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
const gcd = (x, y) => (!y ? x : gcd(y, x % y));

const mmi = (a, m, n = 1) => ((a * n) % m === 1 ? n : mmi(a, m, n + 1));

/**
 * @param {string} char
 * @param {function} codingFunction
 * @returns {string}
 */
const codeChar = (char, codingFunction) => {
  const i = char.toLowerCase().charCodeAt(0);
  if (i >= A && i < A + ABC) {
    return String.fromCodePoint(((codingFunction(i - A) + ABC) % ABC) + A);
  } else if (i >= ZERO && i < ZERO + DIGITS) {
    return char;
  } else {
    return "";
  }
};

const codeString = (str, a, f) => {
  if (gcd(a, ABC) > 1) {
    throw new Error("a and m must be coprime.");
  }
  return [...str].map((c) => codeChar(c, f)).join("");
};

/**
 *
 * @param {string} phrase
 * @param {{a: number, b: number}} key
 * @returns {string}
 */
export const encode = (phrase, { a, b }) =>
  (codeString(phrase, a, (x) => a * x + b).match(/.{1,5}/g) ?? []).join(" ");

/**
 *
 * @param {string} phrase
 * @param {{a: number, b: number}} key
 * @returns {string}
 */
export const decode = (phrase, { a, b }) =>
  codeString(phrase, a, (y) => (mmi(a, ABC) * (y - b)) % ABC);

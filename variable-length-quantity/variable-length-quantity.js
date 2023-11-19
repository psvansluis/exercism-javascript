// @ts-check

/**
 * @param {number[]} input
 * @returns {number[]}
 */
export const encode = (input) => input.flatMap(encodeNumber);

const encodeNumber = (number) =>
  to7Bit(number).map((n, i, { length }) => n + 0x80 * Number(i < length - 1));

/**
 * @param {number} number
 * @returns {number[]}
 */
const to7Bit = (number) =>
  number < 0x80
    ? [number]
    : [...to7Bit(Math.floor(number / 0x80)), number % 0x80];

/**
 * @param {number[]} input
 * @returns {number[][]}
 */
const encodedTo7Bit = (input) => {
  const splitAt = input.findIndex((n) => n < 0x80) + 1;
  if (splitAt < 1) {
    throw new Error("Incomplete sequence");
  } else if (splitAt === input.length) {
    return [input.map((n) => n % 0x80)];
  } else {
    return [input.slice(0, splitAt), input.slice(splitAt)].flatMap(
      encodedTo7Bit
    );
  }
};
/**
 * @param {number[]} numbers
 * @returns {number}
 */
const parse7Bit = (numbers) =>
  numbers.reduce(
    (acc, val, i, { length }) => acc + val * 0x80 ** (length - i - 1),
    0
  );

/**
 * @param {number[]} input
 * @returns {number[]}
 */
export const decode = (input) => encodedTo7Bit(input).map(parse7Bit);

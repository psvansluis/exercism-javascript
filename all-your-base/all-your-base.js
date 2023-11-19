// @ts-check

/**
 * @param {number[]} digits
 * @param {number} from
 * @param {number} to
 * @returns {number[]}
 */
export const convert = (digits, from, to) => {
  const out =
    from < 2
      ? "Wrong input base"
      : to < 2
      ? "Wrong output base"
      : digits.length < 1 ||
        (digits.length > 1 && digits[0] === 0) ||
        digits.some((d) => d < 0 || d >= from)
      ? "Input has wrong format"
      : valueToDigits(digitsToValue(digits, from), to);
  if (typeof out === "string") {
    throw new Error(out);
  } else {
    return out;
  }
};

/**
 *
 * @param {number[]} digits
 * @param {number} base
 * @returns {number}
 */
const digitsToValue = (digits, base) => {
  if (digits.length === 0) {
    return 0;
  } else {
    const [head, ...tail] = digits;
    return head * base ** tail.length + digitsToValue(tail, base);
  }
};

/**
 *
 * @param {number} value
 * @param {number} base
 * @returns {number[]}
 */
const valueToDigits = (value, base) =>
  value < base
    ? [value]
    : [...valueToDigits(Math.floor(value / base), base), value % base];

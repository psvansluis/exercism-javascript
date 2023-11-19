// @ts-check

/**
 * @param {string} creditCardNumber
 * @returns {boolean}
 */
export const valid = (creditCardNumber) => {
  const stripped = creditCardNumber.replace(/\s/g, "");
  if (stripped.length < 2 || /\D/.test(stripped)) {
    return false;
  } else {
    const digits = [...stripped].map(Number);
    return calculateChecksum(digits) % 10 === 0;
  }
};

/**
 *
 * @param {number[]} digits
 * @param {number} acc
 * @returns {number}
 */
const calculateChecksum = (digits, acc = 0) => {
  if (digits.length === 0) {
    return acc;
  } else {
    const [head, ...tail] = digits;
    const digitValue = tail.length % 2 === 0 ? head : double(head);
    return calculateChecksum(tail, acc + digitValue);
  }
};

/**
 *
 * @param {number} digit
 * @returns {number}
 */
const double = (digit) => {
  const doubled = digit * 2;
  return doubled > 9 ? doubled - 9 : doubled;
};

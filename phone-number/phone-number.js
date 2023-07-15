// @ts-check
/**
 *
 * @param {string} numberString
 * @returns {string}
 */
export const clean = (numberString) => {
  const trimmed = [
    (str) => str.replace(/[.()\-+\s]/g, ""),
    (str) => (str[0] === "1" && str.length === 11 ? str.slice(1) : str),
  ].reduce((acc, el) => el(acc), numberString);
  const startError = (codeType, index, number, numberSay) => ({
    condition: trimmed[index] === number,
    message: `${codeType} code cannot start with ${numberSay}`,
  });
  [
    { condition: trimmed.length < 10, message: "Incorrect number of digits" },
    { condition: trimmed.length > 11, message: "More than 11 digits" },
    { condition: /[a-z]/i.test(trimmed), message: "Letters not permitted" },
    {
      condition: trimmed.length === 11 && trimmed[0] !== "1",
      message: "11 digits must start with 1",
    },
    { condition: /[^\d]/.test(trimmed), message: "Punctuations not permitted" },
    startError("Area", 0, "0", "zero"),
    startError("Area", 0, "1", "one"),
    startError("Exchange", 3, "0", "zero"),
    startError("Exchange", 3, "1", "one"),
  ].forEach(({ condition, message }) => {
    if (condition) throw new Error(message);
  });
  return trimmed;
};

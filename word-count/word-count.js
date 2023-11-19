// @ts-check
const SEPARATOR = /[^'\d\w]/;
const APOSTROPHE_AT_BOUNDARY = /^'+|'+$/g;

/**
 *
 * @param {string} input
 * @returns {object}
 */
export const countWords = (input) =>
  input
    .toLowerCase()
    .split(SEPARATOR)
    .map((word) => word.replace(APOSTROPHE_AT_BOUNDARY, ""))
    .filter((word) => word.length)
    .reduce((out, word) => ({ ...out, [word]: (out[word] ?? 0) + 1 }), {});

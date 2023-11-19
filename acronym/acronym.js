// @ts-check

/**
 *
 * @param {string} phrase
 * @returns {string}
 */
export const parse = (phrase) =>
  (phrase.match(/[a-z]+('\w+)*/gi) ?? [])
    .map((/** @type{string} */ word) => word.charAt(0))
    .join("")
    .toUpperCase();

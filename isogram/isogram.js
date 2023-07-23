// @ts-check

/**
 *
 * @param {string} candidate
 * @returns {boolean}
 */
export const isIsogram = (candidate) => _isIsogram(...candidate.toLowerCase());
const _isIsogram = (head, ...tail) =>
  !head ||
  (!(head.match(/[a-z]/) && tail.includes(head)) && isIsogram(tail.join("")));

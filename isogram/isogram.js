// @ts-check

/**
 *
 * @param {string} candidate
 * @returns {boolean}
 */
export const isIsogram = (candidate) => _isIsogram(...candidate.toLowerCase());
const _isIsogram = (
  /** @type {string} */ head,
  /** @type {string[]} */ ...tail
) =>
  !head ||
  (!(head.match(/[a-z]/) && tail.includes(head)) && _isIsogram(...tail));

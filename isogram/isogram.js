// @ts-check

/**
 *
 * @param {string} candidate
 * @returns {boolean}
 */
export const isIsogram = (candidate) => {
  const [head, ...tail] = candidate.toLowerCase();
  return (
    !head ||
    (!(head.match(/[a-z]/) && tail.includes(head)) && isIsogram(tail.join("")))
  );
};

// @ts-check
/**
 *
 * @param {number[]} baseValues
 * @param {number} level
 * @returns {number}
 */
export const sum = (baseValues, level) =>
  [
    ...baseValues.reduce(
      (acc, el) => new Set([...acc, ...setForBaseValue(el, level)]),
      new Set()
    ),
  ].reduce((a, b) => a + b, 0);

/**
 *
 * @param {number} baseValue
 * @param {number} level
 * @param {Set<number>} acc
 * @returns {Set<number>}
 */
const setForBaseValue = (baseValue, level, acc = new Set()) => {
  const next = Math.max(0, ...acc) + baseValue;
  if (next >= level || next === 0) {
    return acc;
  } else {
    return setForBaseValue(baseValue, level, new Set([...acc, next]));
  }
};

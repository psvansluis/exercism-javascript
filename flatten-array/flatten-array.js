// @ts-check

/**
 *
 * @param {any[]} arr
 * @returns  {any[]}
 */
export const flatten = (arr) => arr.reduce(flattenConcat, []).filter(isNotNull);

const flattenConcat = (acc, curr) =>
  acc.concat(Array.isArray(curr) ? flatten(curr) : [curr]);

const isNotNull = (el) => el !== null;

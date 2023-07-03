// @ts-check
/**
 *
 * @param {number} maint
 * @returns {number[][]}
 */
export const spiralMatrix = (maint) => {
  if (maint < 1) {
    return [];
  }
  if (maint === 1) {
    return [[1]];
  }
  const ymylon = creuYmylon(maint);
  return [
    ymylon.pen,
    ...spiralMatrix(maint - 2).map((rhes, bys) => [
      ymylon.chwith[bys],
      ...rhes.map((rhif) => rhif + ymylon.uchaf),
      ymylon.de[bys],
    ]),
    ymylon.gwaelod,
  ];
};

/**
 *
 * @param {number} maint
 * @returns {{pen: number[], de: number[], gwaelod: number[], chwith: number[], uchaf: number}}
 */
const creuYmylon = (maint) => {
  return {
    pen: rhediad(1, maint),
    de: rhediad(maint + 1, maint - 2),
    gwaelod: rhediad(maint * 2 - 1, maint).reverse(),
    chwith: rhediad(maint * 3 - 1, maint - 2).reverse(),
    uchaf: maint * 4 - 4,
  };
};

/**
 *
 * @param {number} cychwyn
 * @param {number} maint
 * @returns {number[]}
 */
const rhediad = (cychwyn, maint) =>
  [...Array(maint).keys()].map((x) => x + cychwyn);

// @ts-check

/**
 *
 * @param {string} isbn
 * @param {number} type 10 for ISBN-10 or 13 for ISBN-13
 * @returns {boolean}
 */
export const isValid = (isbn, type = 10) =>
  new RegExp(`^(\\d-?|X$){${type}}$`).test(isbn) &&
  [...isbn]
    .filter((d) => d !== "-")
    .reduce(
      (acc, el) => ({
        sum: acc.sum + (el === "X" ? 10 : Number(el)) * acc.mul,
        mul: acc.mul - 1,
      }),
      { sum: 0, mul: type }
    ).sum %
    11 ===
    0;

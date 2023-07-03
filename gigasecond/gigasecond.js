// @ts-check
const GIGASECOND_IN_MS = 10 ** 12;
/**
 * @param {Date} date
 * @returns {Date}
 */
export const gigasecond = (date) => {
  return new Date(date.getTime() + GIGASECOND_IN_MS);
};

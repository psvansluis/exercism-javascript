// @ts-check
const DAYS_IN_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 *
 * @param {number} year
 * @param {number} month
 * @param {string} descriptor
 * @param {string} day
 * @returns {Date}
 */
export const meetup = (year, month, descriptor, day) => {
  const adjustedMonth = descriptor === "last" ? month : month - 1;
  const firstDate = {
    first: 1,
    fourth: 22,
    last: new Date(year, adjustedMonth).getDate() - DAYS_IN_WEEK.length,
    second: 8,
    teenth: 13,
    third: 15,
  }[descriptor];

  return new Date(
    year,
    adjustedMonth,
    firstDate +
      wrap(dayIndex(day) - new Date(year, adjustedMonth, firstDate).getDay())
  );
};

/**
 *
 * @param {string} day
 * @returns {number}
 */
const dayIndex = (day) => DAYS_IN_WEEK.indexOf(day);

/**
 *
 * @param {number} n
 * @param {number} by
 * @returns {number}
 */
const wrap = (n, by = DAYS_IN_WEEK.length) => (n + by) % by;

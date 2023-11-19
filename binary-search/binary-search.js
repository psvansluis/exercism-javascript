// @ts-check

/**
 *
 * @param {number[]} array
 * @param {number} value
 */
export const find = (array, value) => {
  if (!array.length) throw new Error("Value not in array");

  const middleIndex = Math.floor(array.length / 2),
    middleValue = array[middleIndex],
    [lhs, rhs] = split(array, middleIndex);
  if (value === middleValue) {
    return middleIndex;
  } else if (value < middleValue) {
    return find(lhs, value);
  } else {
    return find(rhs, value) + middleIndex + 1;
  }
};

/**
 *
 * @param {any[]} array
 * @param {number} at
 * @returns {any[][]}
 */
const split = (array, at) => [array.slice(0, at), array.slice(at + 1)];

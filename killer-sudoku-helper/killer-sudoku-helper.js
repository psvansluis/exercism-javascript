// @ts-check

const ONE_TO_NINE = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 *
 * @param {{sum: number, size: number, exclude: number[]}} cage
 * @returns {number[][]}
 */
export const combinations = ({ sum, size, exclude }) =>
  subsets(
    ONE_TO_NINE.filter((num) => !exclude.includes(num)),
    size
  ).filter((set) => set.reduce((a, b) => a + b, 0) === sum);

/**
 * @template T
 * @param {T[]} set
 * @param {number} size
 * @returns {T[][]}
 */
const subsets = (set, size) => {
  let result = [];
  const comb = (subsetAcc, rest, n) => {
    if (n === 0) {
      result.push(subsetAcc);
    } else {
      for (let index = 0; index < rest.length; index++) {
        comb([...subsetAcc, rest[index]], rest.slice(index + 1), n - 1);
      }
    }
  };
  comb([], set, size);
  return result;
};

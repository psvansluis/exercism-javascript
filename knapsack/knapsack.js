// @ts-check

/**
 * @param {number} capacity
 * @param {{weight: number, value: number}[]} items
 * @param {number} i
 * @returns {number}
 */
export const knapsack = (capacity, items, i = 0) => {
  if (capacity <= 0 || i >= items.length) return 0;

  const { weight, value } = items[i],
    keep =
      weight <= capacity
        ? value + knapsack(capacity - weight, items, i + 1)
        : 0,
    lose = knapsack(capacity, items, i + 1);

  return Math.max(keep, lose);
};

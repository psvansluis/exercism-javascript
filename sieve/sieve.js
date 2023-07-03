// @ts-check

/**
 *
 * @param {number} limit
 * @returns {number[]}
 */
export const primes = (limit) => {
  return sieve([...Array(limit).keys()].map((x) => x + 1));
};

const sieve = (numbers) => {
  if (numbers.length < 1) {
    return [];
  }

  const [head, ...tail] = numbers;

  if (head < 2) {
    return sieve(tail);
  }

  return [head, ...sieve(tail.filter((n) => n % head > 0))];
};

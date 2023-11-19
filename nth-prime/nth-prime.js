// @ts-check

export const prime = (/** @type{number} */ n) => {
  if (n < 1) {
    throw new Error('there is no zeroth prime')
  }
  let primes = [2, 3];
  while (n > primes.length) {
    let nextPrime = primes[primes.length - 1] + 2;
    while (primes.some((p) => nextPrime % p === 0)) {
      nextPrime += 2;
    }
    primes.push(nextPrime);
  }
  return primes[n - 1];
};

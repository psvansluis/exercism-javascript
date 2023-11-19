// @ts-check

export class Palindromes {
  /**
   * @param {FactorLimits} lims
   * @returns {LargestAndSmallestPalindrome}
   */
  static generate(lims) {
    if (lims.maxFactor < lims.minFactor) {
      throw new Error("min must be <= max");
    }
    const [floor, ceiling] = [lims.minFactor ** 2, lims.maxFactor ** 2];
    const palindromes = this.range(floor, ceiling).filter(this.isPalindrome);
    const [smallestP, largestP] = [palindromes, [...palindromes].reverse()]
      .map((y) => y.find((x) => this.factors(x, lims).length > 0))
      .map((p) =>
        p ? new Palindrome(p, this.factors(p, lims)) : Palindrome.none()
      );
    return new LargestAndSmallestPalindrome(largestP, smallestP);
  }

  /**
   * @param {number} n
   * @returns {boolean}
   */
  static isPalindrome(n) {
    const str = n.toString();
    return str === str.split("").reverse().join("");
  }

  /**
   * @param {*} n
   * @param {FactorLimits} lims
   * @returns {number[][]}
   */
  static factors(n, lims) {
    return this.range(lims.minFactor, lims.maxFactor)
      .filter((x) => n % x === 0)
      .map((x) => [x, n / x])
      .filter((x) => x[1] >= lims.minFactor && x[1] <= lims.maxFactor);
  }

  static range(start, end) {
    return [...Array(end - start).keys()].map((x) => x + start);
  }
}

class LargestAndSmallestPalindrome {
  largest;
  smallest;
  /**
   * @param {Palindrome} largest
   * @param {Palindrome} smallest
   */
  constructor(largest, smallest) {
    this.largest = largest;
    this.smallest = smallest;
  }
}

// eslint-disable-next-line no-unused-vars
class FactorLimits {
  maxFactor;
  minFactor;
}

class Palindrome {
  value;
  factors;
  /**
   * @param {number|null} value
   * @param {number[][]} factors
   */
  constructor(value, factors) {
    this.value = value;
    this.factors = factors;
  }

  static none() {
    return new Palindrome(null, []);
  }
}

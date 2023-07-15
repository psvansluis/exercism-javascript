// @ts-check

/**
 *
 * @param {{minFactor?: number, maxFactor?: number, sum: number}} options
 * @returns {Triplet[]}
 */
export function triplets({ sum, minFactor = 2, maxFactor = sum }) {
  let out = [];
  for (let a = minFactor; a < sum / 3; a++) {
    for (let b = a + 1; b < sum / 2; b++) {
      const c = sum - a - b,
        triplet = new Triplet(a, b, c);
      if (triplet.isPythagorean && [a, b, c].every((x) => x < maxFactor)) {
        out.push(triplet);
        break;
      }
    }
  }
  return out;
}

class Triplet {
  #numbers;

  /**
   *
   * @param {number} a
   * @param {number} b
   * @param {number} c
   */
  constructor(a, b, c) {
    this.#numbers = [a, b, c];
  }

  get isPythagorean() {
    const [a, b, c] = this.#numbers;
    return a < b && b < c && a * a + b * b === c * c;
  }

  /**
   * @returns {number[]}
   */
  toArray() {
    return this.#numbers;
  }
}

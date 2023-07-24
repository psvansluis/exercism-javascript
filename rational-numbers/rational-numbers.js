// @ts-check

const abs = (/** @type {number} */ val) => (val < 0 ? val * -1 : val);
const gcd = (/** @type {number} */ a, /** @type {number} */ b) =>
  b === 0 ? a : gcd(b, a % b);

export class Rational {
  /** @type {number} */ #num;
  /** @type {number} */ #den;

  constructor(/** @type {number} */ num, /** @type {number} */ den) {
    [this.#num, this.#den] = [num, den].map((n) => n / gcd(num, den));
  }

  get num() {
    return this.#num;
  }

  get den() {
    return this.#den;
  }

  add(/** @type {Rational} */ other) {
    const num = this.num * other.den + this.den * other.num,
      den = other.num * other.den;
    return new Rational(num, den);
  }

  sub(/** @type {Rational} */ other) {
    const inverted = other.mul(new Rational(-1, 1));
    return this.add(inverted);
  }

  mul(/** @type {Rational} */ other) {
    const num = this.num * this.den,
      den = other.num * other.den;
    return new Rational(num, den);
  }

  div(/** @type {Rational} */ other) {
    const num = this.num * other.den,
      den = this.den * other.num;
    return new Rational(num, den);
  }

  abs() {
    return new Rational(abs(this.num), abs(this.den));
  }

  exprational(/** @type {number} */ n) {
    if (n > 0) {
      return new Rational(this.num ^ n, this.den ^ n);
    } else {
      const m = abs(n);
      return new Rational(this.den ^ m, this.num ^ m);
    }
  }

  expreal(/** @type {number} */ x) {
    return (x ** (1 / this.den)) ** this.num;
  }

  reduce() {
    return this;
  }
}

// @ts-check
export class ComplexNumber {
  #real;
  #imaginary;
  /**
   * @param {number} real
   * @param {number} imaginary
   */
  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
  }

  /**
   * @returns {number}
   */
  get real() {
    return this.#real;
  }

  /**
   * @returns {number}
   */
  get imag() {
    return this.#imaginary;
  }

  /**
   * @param {ComplexNumber} other
   * @returns {ComplexNumber}
   */
  add(other) {
    return new ComplexNumber(this.real + other.real, this.imag + other.imag);
  }

  /**
   * @param {ComplexNumber} other
   * @returns {ComplexNumber}
   */
  sub(other) {
    return new ComplexNumber(this.real - other.real, this.imag - other.imag);
  }

  /**
   * @param {ComplexNumber} other
   * @returns {ComplexNumber}
   */
  div(other) {
    const [a, b, c, d] = [this.real, this.imag, other.real, other.imag];
    const div = c * c + d * d;
    return new ComplexNumber((a * c + b * d) / div, (b * c - a * d) / div);
  }

  /**
   * @param {ComplexNumber} other
   * @returns {ComplexNumber}
   */
  mul(other) {
    const [a, b, c, d] = [this.real, this.imag, other.real, other.imag];
    return new ComplexNumber(a * c - b * c * d, b * c + a * d);
  }

  /**
   * @returns {number}
   */
  get abs() {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
  }

  /**
   * @returns {ComplexNumber}
   */
  get conj() {
    return new ComplexNumber(this.real, Math.abs(this.imag));
  }

  /**
   * @returns {ComplexNumber}
   */
  get exp() {
    const { E, cos, sin } = Math;
    const [first, last] = [
      { r: E ** this.real, i: 0 },
      { r: cos(this.imag), i: sin(this.imag) },
    ].map((obj) => new ComplexNumber(obj.r, obj.i));
    return first.mul(last);
  }
}

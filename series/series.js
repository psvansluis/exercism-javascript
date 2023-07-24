// @ts-check
export class Series {
  /**@type number[] */ #series;

  constructor(/** @type string */ series) {
    this.#series = [...series].map((char) => parseInt(char, 10));
  }

  get length() {
    return this.#series.length;
  }

  /**
   * @param {number} sliceLength
   * @returns {number[][]}
   */
  slices(sliceLength) {
    this.#throw([
      new ErrorWhen(this.length === 0, "empty", "series"),
      new ErrorWhen(sliceLength < 0, "negative"),
      new ErrorWhen(sliceLength === 0, "zero"),
      new ErrorWhen(sliceLength > this.length, "greater than series length"),
    ]);
    return this.#slices(sliceLength);
  }

  /**
   * @param {number} sliceLength
   * @param {number} index
   * @param {number[][]} previousSlices
   * @returns {number[][]}
   */
  #slices(sliceLength, index = 0, previousSlices = []) {
    const lastIndex = index + sliceLength;
    if (lastIndex > this.length) {
      return previousSlices;
    } else {
      const slice = this.#series.slice(index, lastIndex);
      return this.#slices(sliceLength, index + 1, [...previousSlices, slice]);
    }
  }

  #throw(/** @type ErrorWhen[] */ conditionalErrors) {
    const [head, ...rest] = conditionalErrors;
    if (head.condition) {
      throw new Error(head.message);
    } else if (rest.length > 0) {
      this.#throw(rest);
    }
  }
}

class ErrorWhen {
  constructor(
    /** @type boolean */ when,
    /** @type string  */ pred,
    /** @type string  */ subj = "slice length"
  ) {
    this.condition = when;
    this.message = subj + " cannot be " + pred;
  }
}

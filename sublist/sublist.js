// @ts-check

export class List {
  #list;

  get toString() {
    return this.#list.join("🍕");
  }
  /**
   * @param {List} other
   * @returns {boolean}
   */
  includes(other) {
    return this.toString.includes(other.toString);
  }

  constructor(list = []) {
    this.#list = list;
  }

  /**
   * @param {List} other
   * @returns {"SUBLIST"|"SUPERLIST"|"EQUAL"|"UNEQUAL"}
   */
  compare(other) {
    if (this.toString === other.toString) {
      return "EQUAL";
    } else if (this.includes(other)) {
      return "SUPERLIST";
    } else if (other.includes(this)) {
      return "SUBLIST";
    } else {
      return "UNEQUAL";
    }
  }
}

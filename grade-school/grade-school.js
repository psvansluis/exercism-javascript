// @ts-check

export class GradeSchool {
  #roster;

  constructor() {
    this.#roster = {};
  }
  roster() {
    return this.#deepCopy(this.#roster);
  }

  /**
   * @param {string} name
   * @param {number} grade
   */
  add(name, grade) {
    Object.keys(this.#roster).forEach(
      (key) => (this.#roster[key] = this.#roster[key].filter((i) => i !== name))
    );
    this.#roster[grade] ??= [];
    this.#roster[grade].push(name);
    this.#roster[grade].sort();
  }

  /**
   * @param {number} grade
   */
  grade(grade) {
    return this.#deepCopy(this.#roster[grade] ?? []);
  }

  #deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
  }
}

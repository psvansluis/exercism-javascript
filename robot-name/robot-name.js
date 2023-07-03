// @ts-check

export class Robot {
  _name;
  static _namesUsed = new Set();

  get name() {
    return this._name;
  }
  constructor() {
    this.reset();
  }

  _generateName() {
    const letter = () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const number = () => Math.floor(Math.random() * 1000);
    let generated = letter() + letter() + number();

    if (Robot._namesUsed.has(generated)) {
      return this._generateName();
    }

    Robot._namesUsed.add(generated);
    return generated;
  }

  reset() {
    this._name = this._generateName();
  }

  static releaseNames() {
    Robot._namesUsed = new Set();
  }
}

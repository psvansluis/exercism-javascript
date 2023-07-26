// @ts-check

export const score = (
  /** @type {number[]}*/ dice,
  /** @type {string}  */ category
) => {
  const yacht = new Yacht(dice);
  const snake_case = category.replace(/\s/g, "_");
  return yacht[snake_case];
};

class Yacht {
  #dice;

  constructor(/** @type {number[]}*/ dice) {
    this.#dice = dice;
  }

  #countValue(value) {
    return this.#dice.filter((die) => die === value).length * value;
  }

  get #uniques() {
    return [...new Set(this.#dice)];
  }

  get ones() {
    return this.#countValue(1);
  }

  get twos() {
    return this.#countValue(2);
  }

  get threes() {
    return this.#countValue(3);
  }

  get fours() {
    return this.#countValue(4);
  }

  get fives() {
    return this.#countValue(5);
  }

  get sixes() {
    return this.#countValue(6);
  }

  get full_house() {
    const isFullHouse = [2, 3].every((number) =>
      this.#uniques.some(
        (uniqueVal) =>
          this.#dice.filter((die) => die === uniqueVal).length === number
      )
    );

    if (isFullHouse) {
      return this.choice;
    } else {
      return 0;
    }
  }

  get four_of_a_kind() {
    const atLeastFourOfThis = this.#uniques.find(
      (uniqueVal) => this.#dice.filter((die) => die === uniqueVal).length >= 4
    );
    if (atLeastFourOfThis === undefined) {
      return 0;
    } else {
      return atLeastFourOfThis * 4;
    }
  }

  get little_straight() {
    if (!this.#dice.includes(6) && this.#uniques.length === 5) {
      return 30;
    } else {
      return 0;
    }
  }

  get big_straight() {
    if (!this.#dice.includes(1) && this.#uniques.length === 5) {
      return 30;
    } else {
      return 0;
    }
  }

  get choice() {
    return this.#dice.reduce((a, b) => a + b, 0);
  }

  get yacht() {
    if (this.#uniques.length === 1) {
      return 50;
    } else {
      return 0;
    }
  }
}

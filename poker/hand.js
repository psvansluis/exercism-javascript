// @ts-check
import { Card } from "./card";

export class Hand {
  #string;

  constructor(handString) {
    this.#string = handString;
  }

  get #cards() {
    return this.#string
      .split(" ")
      .map((cardString) => new Card(cardString))
      .sort((a, b) => a.rank - b.rank);
  }

  get #suitCounts() {
    return arrayToCounts(this.#cards.map(({ suit }) => suit));
  }

  get #rankValueCounts() {
    return arrayToCounts(this.#cards.map(({ rank }) => rank));
  }

  #valueOfCount(count, priority = 0, index = 0) {
    const keys = Object.keys(this.#rankValueCounts).sort(
        (a, b) => parseInt(b) - parseInt(a)
      ),
      value = keys.filter((key) => this.#rankValueCounts[key] === count) ?? "0";
    return parseInt(value[index]) * 14 ** priority;
  }

  /**
   *
   * @param {number[][]} valueOfCountArgs
   * @param {number} base
   */
  #scoreCountValues(valueOfCountArgs, base) {
    return valueOfCountArgs.reduce(
      (acc, curr) => acc + this.#valueOfCount(...curr),
      base
    );
  }

  get #numberOfSuits() {
    return Object.values(this.#suitCounts).length;
  }

  get #isStraightFlush() {
    return this.#isStraight && this.#isFlush;
  }

  get #isFourOfAKind() {
    return Object.values(this.#rankValueCounts).includes(4);
  }

  get #isFullHouse() {
    return this.#isThreeOfAKind && this.#isOnePair;
  }

  get #isFlush() {
    return this.#numberOfSuits === 1;
  }

  get #isStraight() {
    const ranks = this.#cards.map(({ rank }) => rank);
    return (
      ranks[3] - ranks[2] === 1 &&
      ranks[2] - ranks[1] === 1 &&
      ranks[1] - ranks[0] === 1 &&
      (ranks[4] - ranks[3] === 1 || ranks[4] - ranks[0] === 12) // edge case: low ace
    );
  }

  get #straightLowestCardValue() {
    if (!this.#isStraight) {
      throw new Error("Inappropriate use of #straightLowestCardValue!");
    }
    if (this.#cards[0].rank === 2 && this.#cards[4].rank === 14) {
      return 0;
    }
    return this.#cards[0].rank;
  }

  get #isThreeOfAKind() {
    return Object.values(this.#rankValueCounts).includes(3);
  }

  get #isTwoPair() {
    const valueCounts = Object.values(this.#rankValueCounts);
    return valueCounts.indexOf(2) !== valueCounts.lastIndexOf(2);
  }

  get #isOnePair() {
    return Object.values(this.#rankValueCounts).includes(2);
  }

  /**
   * @returns {number}
   */
  get value() {
    switch (true) {
      case this.#isStraightFlush:
        return 8e6 + this.#straightLowestCardValue;
      case this.#isFourOfAKind:
        return this.#scoreCountValues([[4, 1], [1]], 7e6);
      case this.#isFullHouse:
        return this.#scoreCountValues([[3, 1], [2]], 6e6);
      case this.#isFlush:
        return 5e6 + this.#cardValues;
      case this.#isStraight:
        return 4e6 + this.#straightLowestCardValue;
      case this.#isThreeOfAKind:
        return this.#scoreCountValues(
          [
            [3, 2],
            [1, 1, 0],
            [1, 0, 1],
          ],
          3e6
        );
      case this.#isTwoPair:
        return this.#scoreCountValues([[2, 2, 0], [2, 1, 1], [1]], 2e6);
      case this.#isOnePair:
        return this.#scoreCountValues(
          [
            [2, 3],
            [1, 2, 0],
            [1, 1, 1],
            [1, 0, 2],
          ],
          1e6
        );
      default:
        return this.#cardValues;
    }
  }

  get #cardValues() {
    return this.#scoreCountValues(
      [
        [1, 4, 0],
        [1, 3, 1],
        [1, 2, 2],
        [1, 1, 3],
        [1, 0, 4],
      ],
      0
    );
  }

  get toString() {
    return this.#string;
  }
}

const arrayToCounts = (array) =>
  array.reduce((acc, el) => {
    return { ...acc, [el]: (acc[el] ?? 0) + 1 };
  }, {});

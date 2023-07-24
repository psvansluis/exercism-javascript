export class HighScores {
  #scores;
  constructor(scores) {
    this.#scores = scores;
  }

  get scores() {
    return this.#scores;
  }

  get latest() {
    const [last] = this.#scores.reverse();
    return last;
  }

  get personalBest() {
    const [first] = this.personalTopThree;
    return first;
  }

  get personalTopThree() {
    const [first, second, third] = this.#scores.sort((a, b) => b - a);
    return [first, second, third];
  }
}

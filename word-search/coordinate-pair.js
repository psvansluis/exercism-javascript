export default class CoordinatePair {
  start;
  end;
  /**
   *
   * @param {number} startY
   * @param {number} startX
   * @param {number} endY
   * @param {number} endX
   */
  constructor(startY, startX, endY, endX) {
    this.start = [startY, startX];
    this.end = [endY, endX];
  }

  /**
   * @returns {CoordinatePair}
   */
  get transposed() {
    return new CoordinatePair(
      this.start[1],
      this.start[0],
      this.end[1],
      this.end[0]
    );
  }

  /**
   * @returns {CoordinatePair}
   */
  get invertStartEnd() {
    return new CoordinatePair(
      this.end[0],
      this.end[1],
      this.start[0],
      this.start[1]
    );
  }

  /**
   *
   * @param {WordSearch} wordSearch
   * @returns {CoordinatePair}
   */
  reverse(wordSearch) {
    const newY = (y) => wordSearch.height + 1 - y;
    return new CoordinatePair(
      newY(this.start[0]),
      this.start[1],
      newY(this.end[0]),
      this.end[1]
    );
  }
}

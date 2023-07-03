// @ts-check
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;
export class Clock {
  /**
   * @param {number} hours
   * @param {number} minutes
   */
  constructor(hours, minutes = 0) {
    const toPositive = (mins) =>
      mins < 0 ? toPositive(mins + MINUTES_IN_DAY) : mins;
    this.minutes =
      toPositive(hours * MINUTES_IN_HOUR + minutes) % MINUTES_IN_DAY;
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    const pad = (n) => String(n).padStart(2, "0");
    return (
      pad(Math.floor(this.minutes / MINUTES_IN_HOUR)) +
      ":" +
      pad(this.minutes % MINUTES_IN_HOUR)
    );
  }

  /**
   * @param {number} minutesAdded
   * @returns {Clock}
   */
  plus(minutesAdded) {
    return new Clock(0, this.minutes + minutesAdded);
  }

  /**
   *
   * @param {number} minutesRemoved
   * @returns {Clock}
   */
  minus(minutesRemoved) {
    return this.plus(minutesRemoved * -1);
  }
  /**
   *
   * @param {Clock} clock
   * @returns {boolean}
   */
  equals(clock) {
    return this.minutes === clock.minutes;
  }
}

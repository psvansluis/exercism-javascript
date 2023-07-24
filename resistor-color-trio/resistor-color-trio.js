// @ts-check

export class ResistorColorTrio {
  static COLOR_VALUES = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9,
  };
  /**@type number */ value;
  /**@type Unit */ unit;

  constructor(/**@type string[] */ colors) {
    const [first, second, third] = colors.map(this.#stringToValue),
      rawValue = parseInt(first.toString() + second + "0".repeat(third));
    if (rawValue < 1000) {
      this.value = rawValue;
      this.unit = "ohms";
    } else {
      this.value = rawValue / 1000;
      this.unit = "kiloohms";
    }
  }

  #stringToValue(/**@type string */ string) {
    const out = ResistorColorTrio.COLOR_VALUES[string];
    if (out === undefined) {
      throw new Error(`invalid color: ${string}`);
    }
    return out;
  }

  get label() {
    return `Resistor value: ${this.value} ${this.unit}`;
  }
}

// @ts-check
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "_.*" }] */

const { floor, random } = Math;

const MAX_DIE_SUM = 18;
const MIN_DIE_SUM = 3;
const INITIAL_HIT_POINTS = 10;

export const abilityModifier = (ability) => {
  const BASE = 10;
  const DIVIDER = 2;
  if (ability > MAX_DIE_SUM) {
    throw new Error("Ability scores can be at most " + MAX_DIE_SUM);
  } else if (ability < MIN_DIE_SUM) {
    throw new Error("Ability scores must be at least " + MIN_DIE_SUM);
  }
  return floor((ability - BASE) / DIVIDER);
};

const rollDie = (lowestSide = 1, highestSide = 6) =>
  floor(random() * highestSide) + lowestSide;
const rollDice = (lowestSide = 1, highestSide = 6, times = 4) =>
  times < 1
    ? []
    : [
        rollDie(lowestSide, highestSide),
        ...rollDice(lowestSide, highestSide, times - 1),
      ];

export class Character {
  #stats = {};
  static rollAbility(dice = rollDice()) {
    const [_lowest, ...rest] = dice.sort();
    return rest.reduce((a, b) => a + b, 0);
  }

  #makeOrGetAttribute(attribute) {
    if (!this.#stats[attribute]) {
      this.#stats[attribute] = Character.rollAbility();
    }
    return this.#stats[attribute];
  }

  get strength() {
    return this.#makeOrGetAttribute("strength");
  }

  get dexterity() {
    return this.#makeOrGetAttribute("dexterity");
  }

  get constitution() {
    return this.#makeOrGetAttribute("constitution");
  }

  get intelligence() {
    return this.#makeOrGetAttribute("intelligence");
  }

  get wisdom() {
    return this.#makeOrGetAttribute("wisdom");
  }

  get charisma() {
    return this.#makeOrGetAttribute("charisma");
  }

  get hitpoints() {
    return INITIAL_HIT_POINTS + abilityModifier(this.constitution);
  }
}

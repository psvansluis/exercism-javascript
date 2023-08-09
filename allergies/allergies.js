import allergens from "./allergens.json";

export class Allergies {
  constructor(score) {
    const list = allergens.filter((_, i) => score & (2 ** i));
    this.list = () => list;
    this.allergicTo = (allergen) => list.some((item) => item === allergen);
  }
}

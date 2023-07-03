//
// This is only a SKELETON file for the 'Triangle' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Triangle {
  isEquilateral = false;
  isIsosceles = false;
  isScalene = false;
  constructor(...sides) {
    const [a, b, c] = sides.sort((x, y) => x - y);
    if (a > 0 && a + b >= c) {
      const nSides = new Set(sides).size;
      this.isEquilateral = nSides === 1;
      this.isIsosceles = nSides <= 2;
      this.isScalene = nSides === 3;
    }
  }
}

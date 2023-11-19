// @ts-check

export class CustomSet {
  arr;
  constructor(list = []) {
    this.arr = Object.values(
      list.reduce((acc, el) => ({ ...acc, [el]: el }), {})
    );
  }

  get size() {
    return this.arr.length;
  }

  empty() {
    return this.size < 1;
  }

  contains(element) {
    return element in this.arr;
  }

  add(element) {
    return new CustomSet([element, ...this.arr]);
  }

  subset(otherSet) {
    return this.union(otherSet).size === otherSet.size;
  }

  disjoint(otherSet) {
    return this.union(otherSet).size === this.size + otherSet.size;
  }

  eql(otherSet) {
    return this.arr.join(",") === otherSet.arr.join(",");
  }

  union(otherSet) {
    return new CustomSet([...this.arr, ...otherSet.arr]);
  }

  intersection(otherSet) {
    return new CustomSet(otherSet.arr.filter((el) => el in this.arr));
  }

  difference(otherSet) {
    return new CustomSet(this.arr.filter((el) => !otherSet.arr.includes(el)));
  }
}

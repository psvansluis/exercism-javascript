// @ts-check

export class BinarySearchTree {
  data;
  /** @type {BinarySearchTree | undefined} */ left;
  /** @type {BinarySearchTree | undefined} */ right;

  /**
   * @param {number} value
   */
  constructor(value) {
    this.data = value;
  }

  /**
   * @param {number} value
   */
  insert(value) {
    const branch = value <= this.data ? "left" : "right";
    this[branch]?.insert(value) ?? (this[branch] = new BinarySearchTree(value));
    return true;
  }

  /**
   * @param {function} f
   */
  each(f) {
    this.left?.each(f);
    f(this.data);
    this.right?.each(f);
  }
}

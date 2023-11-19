// @ts-check

/**
 *
 * @param {string[]} preorder
 * @param {string[]} inorder
 * @returns {Node}
 */
export const treeFromTraversals = (preorder, inorder) => {
  const [pSet, iSet] = [preorder, inorder].map((arr) => new Set(arr));
  if (preorder.length !== inorder.length) {
    throw new Error("traversals must have the same length");
  }
  if (new Set([...pSet, ...iSet]).size !== pSet.size) {
    throw new Error("traversals must have the same elements");
  }
  if (pSet.size !== preorder.length || iSet.size !== inorder.length) {
    throw new Error("traversals must contain unique items");
  }

  if (!preorder.length) {
    return new Node();
  }

  const root = preorder[0],
    rootIndex = inorder.indexOf(root);
  return new NodeWithValue(
    root,
    treeFromTraversals(
      preorder.slice(1, rootIndex + 1),
      inorder.slice(0, rootIndex)
    ),
    treeFromTraversals(
      preorder.slice(rootIndex + 1),
      inorder.slice(rootIndex + 1)
    )
  );
};

class Node {
  constructor() {}
}

class NodeWithValue extends Node {
  /**
   * @param {string} value
   * @param {Node} left
   * @param {Node} right
   */
  constructor(value, left = new Node(), right = new Node()) {
    super();
    this.value = value;
    this.left = left;
    this.right = right;
  }
  value;
  left;
  right;
}

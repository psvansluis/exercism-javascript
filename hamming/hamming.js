export const compute = (strand1, strand2) => strand1.hamming(strand2);

String.prototype.hamming = function (other) {
  if (this.length !== other.length) {
    throw new Error("strands must be of equal length");
  }
  return [...this].reduce((p, c, i) => (c === other[i] ? p : p + 1), 0);
};

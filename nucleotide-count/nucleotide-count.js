// @ts-check

const VALID_NUCLEOTIDES = "ACGT";

/**
 *
 * @param {string} strand
 * @returns {string}
 */
export const countNucleotides = (strand) => {
  if (new RegExp(`[^${VALID_NUCLEOTIDES}]`).test(strand)) {
    throw new Error("Invalid nucleotide in strand");
  }
  return Object.values(
    [...strand].reduce(
      (obj, nucleotide) => ((obj[nucleotide] += 1), obj),
      [...VALID_NUCLEOTIDES].reduce(
        (obj, nucleotide) => ({...obj, [nucleotide]: 0}, obj),
        {}
      )
    )
  ).join(" ");
};

// @ts-check

/**
 * Transcribes a string consisting of DNA nucleotides to its RNA complement.
 *
 * @param {string} dna
 * @returns {string}
 */
export const toRna = (dna) =>
  [...dna]
    .map((nuc) => {
      return {
        G: "C",
        C: "G",
        T: "A",
        A: "U",
      }[nuc];
    })
    .join("");

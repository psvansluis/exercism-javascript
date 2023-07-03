// @ts-check

/**
 *
 * @param {string} rna
 * @returns {string[]}
 */
export const translate = (rna = "") => codonsToProteins(rnaToCodons(rna));

/**
 *
 * @param {string} rna
 * @returns {string[]}
 */
const rnaToCodons = (rna) => rna.match(/.{1,3}/g) ?? [];

/**
 *
 * @param {string[]} codons
 * @returns {string[]}
 */
const codonsToProteins = (codons) => {
  const proteins = codons.map((codon) => CODON_TO_PROTEIN[codon]),
    stopIndex = proteins.indexOf("STOP"),
    slice = proteins.slice(0, stopIndex < 0 ? undefined : stopIndex);
  if (slice.includes(undefined)) {
    throw new Error("Invalid codon");
  }
  return slice;
};

const CODON_TO_PROTEIN = {
  AUG: "Methionine",
  UUU: "Phenylalanine",
  UUC: "Phenylalanine",
  UUA: "Leucine",
  UUG: "Leucine",
  UCU: "Serine",
  UCC: "Serine",
  UCA: "Serine",
  UCG: "Serine",
  UAU: "Tyrosine",
  UAC: "Tyrosine",
  UGU: "Cysteine",
  UGC: "Cysteine",
  UGG: "Tryptophan",
  UAA: "STOP",
  UAG: "STOP",
  UGA: "STOP",
};

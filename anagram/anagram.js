// @ts-check

/**
 *
 * @param {string} word
 * @param {string[]} anagrams
 * @returns {string[]}
 */
export const findAnagrams = (word, anagrams) =>
  anagrams.filter((anagram) => isAnagram(word, anagram));

/**
 *
 * @param {string} word1
 * @param {string} word2
 * @returns {boolean}
 */
const isAnagram = (word1, word2) => {
  const [a, b] = [word1, word2].map((x) => x.toLowerCase());
  const [aSort, bSort] = [a, b].map((x) => [...x].sort().join(""));
  return a !== b && aSort === bSort;
};

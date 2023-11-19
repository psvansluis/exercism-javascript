// @ts-check

const VOWELS = new Set(["a", "e", "i", "o", "u"]);
const SEMIVOWELS = new Set(["x", "y"]);

export const translate = (phrase) =>
  phrase.split(" ").map(translateWord).join(" ");

const translateWord = (word) => {
  const { prefix, rest } = destructure(word);
  return `${rest}${prefix}ay`;
};

/**
 *
 * @param {string} word
 * @returns {{prefix: string, rest: string}}
 */
const destructure = (word) => {
  if (SEMIVOWELS.has(word[0]) && !VOWELS.has(word[1])) {
    return { prefix: "", rest: word };
  }
  const phonetic = word.replace("qu", "qʷ"),
    yIndex = phonetic.indexOf("y"),
    firstYIsConsonant =
      yIndex < phonetic.length - 1 &&
      VOWELS.has(phonetic[phonetic.indexOf("y") + 1]),
    vowels = firstYIsConsonant ? [...VOWELS] : [...VOWELS, "y"],
    firstVowelIndex = vowels.reduce(
      (acc, vowel) =>
        phonetic.includes(vowel) ? Math.min(acc, phonetic.indexOf(vowel)) : acc,
      99
    ),
    prefix = phonetic.slice(0, firstVowelIndex).replace("ʷ", "u"),
    rest = phonetic.slice(firstVowelIndex).replace("ʷ", "u");
  return { prefix, rest };
};

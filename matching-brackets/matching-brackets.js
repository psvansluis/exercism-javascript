// @ts-check

const BRACKETS = { "{": "}", "(": ")", "[": "]" };

/**
 *
 * @param {string} string
 * @returns {boolean}
 */
export const isPaired = (string) => {
  let unclosedBrackets = [];
  const bracketList = [...string].filter((char) =>
    Object.entries(BRACKETS).flat().includes(char)
  );

  for (const bracket of bracketList) {
    if (Object.keys(BRACKETS).includes(bracket)) {
      unclosedBrackets.push(bracket);
      continue;
    }
    const lastBracket = unclosedBrackets.pop();
    if (bracket !== BRACKETS[lastBracket]) {
      return false;
    }
  }

  return unclosedBrackets.length === 0;
};

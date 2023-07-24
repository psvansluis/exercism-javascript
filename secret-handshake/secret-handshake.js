// @ts-check

/**
 *
 * @param {number} number
 * @returns {string[]}
 */
export const commands = (number) => {
  const binary = [...number.toString(2)].reverse(),
    actions = ["wink", "double blink", "close your eyes", "jump"].filter(
      (value, index) => +binary[index]
    );
  return binary.length === 5 ? actions.reverse() : actions;
};

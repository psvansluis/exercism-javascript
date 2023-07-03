// @ts-check

/**
 *
 * @param {string[]} colors
 * @returns {number}
 */
export const decodedValue = (colors) => {
  return +colors
    .slice(0, 2)
    .map((c) =>
      [
        "black",
        "brown",
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "violet",
        "grey",
        "white",
      ].indexOf(c)
    )
    .join("");
};

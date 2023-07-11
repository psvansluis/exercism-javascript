// @ts-check

/**
 * Returns Bob's response to a given message string.
 *
 * @param {string} message
 * @returns {string}
 */
export const hey = (message) => {
  const trim = message.trim(),
    shouts = trim.toUpperCase() === trim && trim.toLowerCase() !== trim,
    asks = trim.endsWith("?"),
    responses = [
      { test: !trim, out: "Fine. Be that way!" },
      {
        test: shouts && asks,
        out: "Calm down, I know what I'm doing!",
      },
      {
        test: shouts,
        out: "Whoa, chill out!",
      },
      {
        test: asks,
        out: "Sure.",
      },
    ];

  return responses.find(({ test }) => test)?.out ?? "Whatever.";
};

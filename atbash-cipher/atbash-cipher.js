// @ts-check

/**
 *
 * @param {string} message
 * @returns {string}
 */
const normalize = (message) =>
  String.fromCharCode(
    ...[...message.toLowerCase()]
      .map((c) => c.charCodeAt(0))
      .filter((n) => (n > 47 && n < 58) || (n > 96 && n < 123))
  );

/**
 *
 * @param {string} message
 * @returns {string}
 */
const chunk = (message) =>
  Array.from(Array(Math.ceil(message.length / 5)), (_, i) =>
    [...message].slice(i * 5, i * 5 + 5).join("")
  ).join(" ");

const encrypt = (normalized) =>
  [...normalized]
    .map((char) =>
      isNaN(Number(char)) ? String.fromCharCode(219 - char.charCodeAt(0)) : char
    )
    .join("");

export const encode = (message) => chunk(decode(message)),
  decode = (message) => encrypt(normalize(message));

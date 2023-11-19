// @ts-check

/**
 *
 * @param {string} message
 * @returns {string}
 */
export const encode = (message) => {
  return [...message]
    .map((chr) => ({ value: chr, count: 1 }))
    .reduce(
      (
        /** @type {{value: string, count: number}[]} */ acc,
        /** @type {{value: string, count: number}} */ el
      ) => {
        const last = acc.pop() ?? { value: el.value, count: 0 };
        if (last.value === el.value) {
          return [...acc, { value: el.value, count: last.count + el.count }];
        } else {
          return [...acc, last, el];
        }
      },
      []
    )
    .map((obj) => (obj.count > 1 ? obj.count : "") + obj.value)
    .join("");
};

export const decode = (/** @type {string} */ message) =>
  message
    .split(/(?<=\D)/g)
    .map(decodeChunk)
    .join("");

const decodeChunk = (/** @type {string} */ chunk) => {
  if (chunk.length < 2) {
    return chunk;
  }
  const [times, char] = [/\D/g, /\d/g].map((re) => chunk.replace(re, ""));
  return char.repeat(Number(times));
};

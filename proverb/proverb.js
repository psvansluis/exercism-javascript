// @ts-check

/**
 *
 * @param  {...any} items
 * @returns {string}
 */
export const proverb = (...items) => {
  const [first] = items,
    { qualifier } = items[items.length - 1] ?? false;
  return qualifier
    ? proverbInternal(items.slice(0, -1), `${qualifier} ${first}`)
    : proverbInternal(items, first);
};

/**
 *
 * @param {string[]} items
 * @param {string} qualifiedFirst
 * @returns {string}
 */
const proverbInternal = (items, qualifiedFirst) => {
  const [first, ...rest] = items,
    [second] = rest,
    line = `For want of a ${first} the ${second} was lost.`;
  switch (items.length) {
    case 0:
      return "";
    case 1:
      return `And all for the want of a ${qualifiedFirst}.`;
    default:
      return [line, proverbInternal(rest, qualifiedFirst)].join("\n");
  }
};

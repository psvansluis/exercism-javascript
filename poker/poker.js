// @ts-check
import { Hand } from "./hand";

/**
 *
 * @param {string[]} hands
 * @returns {string[]}
 */
export const bestHands = (hands) => {
  const parsed = hands.map((hand) => new Hand(hand)),
    max = Math.max(...parsed.map(({ value }) => value)),
    maxCards = parsed
      .filter(({ value }) => value === max)
      .map(({ toString }) => toString);
  return maxCards;
};

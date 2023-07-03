// @ts-check

const ORBITS = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1.0,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};

const YEAR_IN_S = 31557600;

/**
 * Given a planet and an age in seconds, calculates the age in planet-years.
 *
 * @param {string} planet
 * @param {number} seconds
 * @returns {number}
 */
export const age = (planet, seconds) =>
  Number((seconds / YEAR_IN_S / ORBITS[planet.toLowerCase()]).toFixed(2));

/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */

/**
 *
 * @param {number?} minutesLeft
 * @returns {string}
 */
export function cookingStatus(minutesLeft) {
  if (minutesLeft === undefined) {
    return "You forgot to set the timer.";
  } else if (minutesLeft === 0) {
    return "Lasagna is done.";
  } else {
    return "Not done, please wait.";
  }
}

/**
 *
 * @param {string[]} layers
 * @param {number} timePerLayer
 * @returns {number}
 */
export const preparationTime = (layers, timePerLayer = 2) => {
  return layers.length * timePerLayer;
};

/**
 *
 * @param {string[]} layers
 * @returns {{noodles: number, sauce: number}}
 */
export const quantities = (layers) => {
  return {
    noodles: layers.filter((layer) => layer === "noodles").length * 50,
    sauce: layers.filter((layer) => layer === "sauce").length * 0.2,
  };
};

/**
 * @param {string[]} friendsList
 * @param {string[]} myList
 * @returns {void}
 */
export function addSecretIngredient(friendsList, myList) {
  myList.push(friendsList.slice(-1)[0]);
}

/**
 *
 * @param {object} recipe
 * @param {number} portions
 * @returns {object}
 */
export function scaleRecipe(recipe, portions) {
  let copy = Object.assign({}, recipe);
  Object.keys(copy).map((ingredient) => (copy[ingredient] *= portions / 2));
  return copy;
}

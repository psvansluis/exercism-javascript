/// <reference path="./types.ts" />
// @ts-check
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "_+\\w+" }]*/

const HEADER = { team: "Team", mp: "MP", w: "W", d: "D", l: "L", p: "P" };

/**
 *
 * @param {string} input
 * @returns  {string}
 */
export const tournamentTally = (input) => {
  console.log(parseCsv(input));
  return formatScoreLine(HEADER);
};

/**
 *
 * @param {ScoreLine} scoreLine
 * @returns {string}
 */
const formatScoreLine = (scoreLine) =>
  [
    scoreLine.team.padEnd(30, " "),
    ...["mp", "w", "d", "l", "p"].map((k) => scoreLine[k].padStart(3)),
  ].join(" |");

/**
 *
 * @param {Game} game
 * @param {ScoreLine[]} scoreLines
 * @returns {ScoreLine[]}
 */
const updateScoreLine = (game, scoreLines) => {
  const indexOfTeam = (team) => scoreLines.findIndex((sL) => sL.team === team);
};

/**
 *
 * @param {string} team
 * @returns {ScoreLine}
 */
const emptyScoreLine = (team) => {
  return { team, mp: 0, w: 0, d: 0, l: 0, p: 0 };
};

/**
 *
 * @param {string} csv
 * @returns {Game[]}
 */
const parseCsv = (csv) => csv.split("\n").map(parseLine);

/**
 *
 * @param {string} line
 * @returns {Game}
 */
const parseLine = (line) => {
  const [home, away, result, ..._rest] = line.split(";");
  return { home, away, result };
};

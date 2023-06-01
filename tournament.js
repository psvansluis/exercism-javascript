/// <reference path="./types.ts" />
// @ts-check
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "_+\\w+" }]*/

const HEADER = ["Team", "MP", "W", "D", "L", "P"];

/**
 *
 * @param {string} input
 * @returns  {string}
 */
export const tournamentTally = (input) => {
  const games = parseCsv(input);

  //todo: change to be functional in nature
  let scoreLines = [];
  games.forEach((game) => (scoreLines = addGameToScoreLines(game, scoreLines)));
  //

  return [HEADER, ...scoreLines.sort(compareScoreLines).map(scoreLineToArray)]
    .map(formatRow)
    .join("\n");
};

/**
 *
 * @param {ScoreLine} a
 * @param {ScoreLine} b
 * @returns {number}
 */
const compareScoreLines = (a, b) =>
  a.p === b.p ? (a.team > b.team ? 1 : -1) : b.p - a.p;

/**
 *
 * @param {string[]} lineArray
 * @returns {string}
 */
const formatRow = (lineArray) => {
  const [team, ...rest] = lineArray;
  return [team.padEnd(30), ...rest.map((item) => item.padStart(3))].join(" |");
};

/**
 * @param {ScoreLine} line
 * @returns {string[]}
 */
const scoreLineToArray = (line) =>
  [line.team, line.mp, line.w, line.d, line.l, line.p].map((item) =>
    item.toString()
  );

/**
 *
 * @param {Game} game
 * @param {ScoreLine[]} lines
 * @returns {ScoreLine[]}
 */
const addGameToScoreLines = (game, lines) => {
  const teams = [game.home, game.away];
  const linesInclusive = teams.reduce(addTeamIfAbsent, lines);
  const [homeIndex, awayIndex] = teams.map((team) =>
    indexOfTeam(team, linesInclusive)
  );
  /**
   *
   * @param {function} homeOutcome
   * @param {function} awayOutcome
   * @returns {ScoreLine[]}
   */
  const addOutcomes = (homeOutcome, awayOutcome) =>
    linesInclusive.map((line, i) => {
      return (
        { [homeIndex]: homeOutcome(line), [awayIndex]: awayOutcome(line) }[i] ??
        line
      );
    });
  return (
    {
      win: addOutcomes(addWin, addLoss),
      loss: addOutcomes(addLoss, addWin),
      draw: addOutcomes(addDraw, addDraw),
    }[game.result] ?? lines
  );
};

/**
 *
 * @param {string} team
 * @param {ScoreLine[]} lines
 * @returns {number}
 */
const indexOfTeam = (team, lines) => lines.findIndex((sL) => sL.team === team);

/**
 *
 * @param {ScoreLine[]} lines
 * @param {string} team
 * @returns {ScoreLine[]}
 */
const addTeamIfAbsent = (lines, team) =>
  indexOfTeam(team, lines) === -1 ? [...lines, emptyScoreLine(team)] : lines;

/**
 *
 * @param {number} winsAdded
 * @param {number} lossesAdded
 * @param {number} drawsAdded
 * @param {number} pointsAdded
 * @returns {function}
 */
const addOutcome = (winsAdded, lossesAdded, drawsAdded, pointsAdded) => {
  /**
   * @param {ScoreLine} line
   * @returns {ScoreLine}
   */
  return (line) => {
    return {
      team: line.team,
      mp: line.mp + 1,
      w: line.w + winsAdded,
      d: line.d + drawsAdded,
      l: line.l + lossesAdded,
      p: line.p + pointsAdded,
    };
  };
};

const [addWin, addLoss, addDraw] = [
  [1, 0, 0, 3],
  [0, 1, 0, 0],
  [0, 0, 1, 1],
].map((arr) => addOutcome(arr[0], arr[1], arr[2], arr[3]));

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

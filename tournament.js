/// <reference path="./types.ts" />
// @ts-check
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "_+\\w+" }]*/

const HEADER = [
  "Team".padEnd(30, " "),
  ...["MP", "W", "D", "L", "P"].map((str) => str.padStart(3)),
].join(" |");

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

  return [
    HEADER,
    ...scoreLines.sort(compareScoreLines).map(formatScoreLine),
  ].join("\n");
};

/**
 *
 * @param {ScoreLine} a
 * @param {ScoreLine} b
 * @returns {number}
 */
const compareByPoints = (a, b) => (a.p === b.p ? 0 : a.p > b.p ? -1 : 1);

/**
 *
 * @param {ScoreLine} a
 * @param {ScoreLine} b
 * @returns {number}
 */
const compareByName = (a, b) =>
  a.team === b.team ? 0 : a.team > b.team ? 1 : -1;

/**
 *
 * @param {ScoreLine} a
 * @param {ScoreLine} b
 * @returns {number}
 */
const compareScoreLines = (a, b) =>
  compareByPoints(a, b) === 0 ? compareByName(a, b) : compareByPoints(a, b);

/**
 *
 * @param {ScoreLine} scoreLine
 * @returns {string}
 */
const formatScoreLine = (scoreLine) =>
  [
    scoreLine.team.padEnd(30, " "),
    ...["mp", "w", "d", "l", "p"].map((k) =>
      scoreLine[k].toString().padStart(3)
    ),
  ].join(" |");

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
  switch (game.result) {
    case "win":
      return linesInclusive
        .map((line, index) => (index === homeIndex ? addWin(line) : line))
        .map((line, index) => (index === awayIndex ? addLoss(line) : line));
    case "loss":
      return addGameToScoreLines(
        {
          home: game.away,
          away: game.home,
          result: "win",
        },
        lines
      );
    case "draw":
      return linesInclusive.map((line, index) =>
        index === homeIndex || index === awayIndex ? addDraw(line) : line
      );
    default:
      return lines;
  }
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

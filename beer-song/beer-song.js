// @ts-check

export const recite = (initialBottlesCount, takeDownCount) => {
  const phrase = [
    `${bottle(
      initialBottlesCount,
      true
    )} of beer on the wall, ${bottle(
      initialBottlesCount
    )} of beer.`,
    initialBottlesCount === 0
      ? "Go to the store and buy some more, 99 bottles of beer on the wall."
      : `Take ${
          initialBottlesCount === 1 ? "it" : "one"
        } down and pass it around, ${bottle(
          initialBottlesCount - 1
        )} of beer on the wall.`,
  ];
  return takeDownCount > 1
    ? [
        ...phrase,
        "",
        ...recite(initialBottlesCount - 1, takeDownCount - 1),
      ]
    : phrase;
};

const bottle = (n, initial = false) => {
  switch (n) {
    case 0:
      return (initial ? "N" : "n") + "o more bottles";
    case 1:
      return "1 bottle";
    default:
      return n + " bottles";
  }
};

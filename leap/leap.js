// @ts-check

export const isLeap = (year) => {
  const divides = (factor) => year % factor === 0;
  return divides(400) || (!divides(100) && divides(4));
};

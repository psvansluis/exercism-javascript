export const toRoman = (n) => {
  const f = 
    (h, m, l = m) =>
      n < h
        ? n < h - l
          ? toRoman(m) + toRoman(n - m)
          : toRoman(l) + toRoman(h) + toRoman(n - h + l)
        : l < m
        ? null
        : f(2 * h, h, l),
    g = (t, h = 5, m = 1) =>
      t > 1 ? f(h, m) ?? g(t - 1, h * 10, m * 10) : f(h, m);
  return (
    {
      0: "",
      1: "I",
      5: "V",
      10: "X",
      50: "L",
      100: "C",
      500: "D",
      1000: "M",
    }[n] ?? g(4)
  );
};

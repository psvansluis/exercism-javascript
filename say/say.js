export const say = (n) => {
  if (n < 0 || n >= 1e12) {
    throw new Error("Number must be between 0 and 999,999,999,999.");
  }

  const [r, h] = [
    (q, c) => Math.floor(q / c) * c,
    (v, l, s) =>
      n < l
        ? n % v === 0
          ? `${say(r(n / v, 1))} ${s}`
          : `${say(r(n, v))} ${say(n % v)}`
        : null,
  ];

  if (n < 1e2) {
    return (
      {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
      }[n] ?? `${say(r(n, 10))}-${say(n % 10)}`
    );
  }

  return (
    h(1e2, 1e3, "hundred") ??
    h(1e3, 1e6, "thousand") ??
    h(1e6, 1e9, "million") ??
    h(1e9, 1e12, "billion")
  );
};

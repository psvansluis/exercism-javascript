export const largestProduct = (m, s) => {
  if (s < 0) throw new Error("Span must be greater than zero");
  if (m.length < s) throw new Error("Span must be smaller than string length");
  if (m.match(/\D/)) throw new Error("Digits input must only contain digits");
  return mP([...m].map(Number), s, 0);
};

const mP = (ns, s, t) =>
  s > ns.length
    ? t
    : mP(
        ns.slice(1),
        s,
        Math.max(
          t,
          ns.slice(0, s).reduce((a, b) => a * b, 1)
        )
      );

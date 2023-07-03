// @ts-check

export const transform = (o) => {
  const out = {};
  Object.entries(o).forEach(([k, vs]) =>
    vs.forEach((v) => (out[v.toLowerCase()] = +k))
  );
  return out;
};

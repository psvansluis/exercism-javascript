// @ts-check
export const keep = (arr, f, history = []) => {
  const [head, ...tail] = arr;

  if (!head) {
    return history;
  }

  return keep(tail, f, f(head) ? [...history, head] : history);
};

export const discard = (arr, f, history = []) =>
  keep(arr, (el) => !f(el), history);

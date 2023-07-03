export const promisify = (func) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (error, result) => {
        error ? reject(error) : resolve(result);
      });
    });
  };
};

export const all = (promises) =>
  !promises
    ? Promise.resolve()
    : promises.reduce(
        async (accumulator, promise) =>
          (await accumulator).concat(await promise),
        Promise.resolve([])
      );

export const allSettled = (promises) =>
  !promises
    ? Promise.resolve()
    : promises.reduce(
        async (accumulator, promise) =>
          (await accumulator).concat(await promise.catch((error) => error)),
        Promise.resolve([])
      );

export const race = (promises) => {
  if (!promises) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) =>
    promises.length
      ? promises.forEach((promise) => promise.then(resolve, reject))
      : resolve([])
  );
};

export const any = (promises) =>
  promises
    ? new Promise((resolve, reject) => {
        promises.length
          ? promises.forEach((promise) =>
              promise.then(resolve).catch(() => null)
            )
          : resolve([]);

        allSettled(promises).then(reject);
      })
    : Promise.resolve();

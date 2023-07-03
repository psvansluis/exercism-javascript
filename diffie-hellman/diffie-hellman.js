// @ts-check

export class DiffieHellman {
  #p;
  #g;
  /**
   * @param {number} p
   * @param {number} g
   */
  constructor(p, g) {
    [p, g].forEach((x) => {
      if (x < 2 || !this.#isPrime(x)) {
        throw new Error();
      }
    });
    this.#p = p;
    this.#g = g;
  }

  #isPrime(n) {
    const p = (i = 3) =>
      n % i === 0 ? false : i >= Math.floor(Math.sqrt(n)) || p(i + 2);
    if (n < 2 || n % 2 === 0) return false;
    return n === 2 || n === 3 || p();
  }

  getPublicKey(privateKey) {
    if (privateKey < 2 || privateKey >= this.#p) throw new Error();
    return this.#g ** privateKey % this.#p;
  }

  getSecret(theirPublicKey, myPrivateKey) {
    return theirPublicKey ** myPrivateKey % this.#p;
  }
}

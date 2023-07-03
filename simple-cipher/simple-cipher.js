// @ts-check

const RANDOM_KEY_SIZE = 100;
const POS_A = 97;
const ABC_SIZE = 26;

export class Cipher {
  #key;

  /**
   *
   * @param {string} key
   */
  constructor(key = Cipher.#randomKey()) {
    this.#key = key;
  }

  static #randomKey(pre = "") {
    const letter = () =>
      String.fromCharCode(POS_A + Math.floor(Math.random() * ABC_SIZE));
    return pre.length >= RANDOM_KEY_SIZE
      ? pre
      : Cipher.#randomKey(pre + letter());
  }
  /**
   *
   * @param {string} char
   * @returns {number}
   */
  static #indexFromChar(char) {
    return char.charCodeAt(0) - POS_A;
  }

  /**
   *
   * @param {string} msg
   * @returns {string}
   */
  encode(msg) {
    return this.#enOrDecode(msg, 0, (a, b) => a + b);
  }

  /**
   *
   * @param {string} msg
   * @returns {string}
   */
  decode(msg) {
    return this.#enOrDecode(msg, 0, (a, b) => a - b);
  }

  /**
   *
   * @param {string} msg
   * @param {number} index
   * @param {function} f
   * @returns {string}
   */
  #enOrDecode(msg, index, f) {
    if (msg.length === 0) {
      return "";
    } else if (msg.length === 1) {
      const msgIndex = Cipher.#indexFromChar(msg);
      const keyIndex = Cipher.#indexFromChar(this.key[index]);
      const codedIndex = (f(msgIndex, keyIndex) + ABC_SIZE) % ABC_SIZE;
      return String.fromCharCode(POS_A + codedIndex);
    } else {
      const [first, ...rest] = msg.split("");
      const nextIndex = (index + 1) % this.key.length;
      return (
        this.#enOrDecode(first, index, f) +
        this.#enOrDecode(rest.join(""), nextIndex, f)
      );
    }
  }

  get key() {
    return this.#key;
  }
}

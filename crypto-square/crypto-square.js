// @ts-check

export class Crypto {
  message;

  constructor(/** @type {string} */ message) {
    this.message = message.replace(/[^\w\d]/g, "").toLowerCase();
  }

  get columns() {
    return Math.ceil(Math.sqrt(this.message.length));
  }

  get regExp() {
    return new RegExp(`.{1,${this.columns}}`, "g");
  }

  get chunks() {
    return [...(this.message.match(this.regExp) ?? [])];
  }

  get ciphertext() {
    return this.message
      ? [...this.chunks[0]]
          .map((_, i) => this.chunks.map((row) => row[i] ?? " ").join(""))
          .join(" ")
      : "";
  }
}

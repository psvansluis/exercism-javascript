/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "\_.*" }]*/
// @ts-check

const COMMANDS = {
  "+": (a) => (b) => b + a,
  "-": (a) => (b) => b - a,
  "*": (a) => (b) => b * a,
  "/": (a) => (b) => {
    if (a === 0) {
      throw new Error("Division by zero");
    } else {
      return Math.floor(b / a);
    }
  },
  dup: (a) => [a, a],
  drop: (_a) => [],
  swap: (a) => (b) => [a, b],
  over: (a) => (b) => [b, a, b],
};

export class Forth {
  /** @type {number[]} */ #stack = [];
  #aliases = {};

  /**
   * @param {string} input
   * @returns {void}
   */
  evaluate(input) {
    const split = input.toLowerCase().split(/\s+/g),
      withoutDefinitions = this.#parseDefinitions(split),
      withoutAliases = this.#replaceAliases(withoutDefinitions),
      evaluated = withoutAliases.map(this.#evalItem);
    this.#stack = this.#evalList(evaluated);
  }

  get stack() {
    return this.#stack;
  }

  /**
   * @param {string} item
   * @returns {number | function}
   */
  #evalItem = (item) => {
    const command = COMMANDS[item];
    if (command) {
      return command;
    } else if (isNaN(item)) {
      throw new Error("Unknown command");
    } else {
      return Number(item);
    }
  };

  /**
   * @param {(number | function)[]} list
   * @returns {number[]}
   */
  #evalList(list) {
    const fIndex = list.findIndex((item) => typeof item === "function");
    if (fIndex < 0) return list;
    if (fIndex === 0) throw new Error("Stack empty");
    const result = list[fIndex](list[fIndex - 1]),
      pre = list.slice(0, fIndex - 1),
      post = list.slice(fIndex + 1),
      out = [pre, result, post].flat();
    return this.#evalList(out);
  }

  /**
   *
   * @param {string[]} list
   * @returns {string[]} the list with alias definitions removed
   */
  #parseDefinitions(list) {
    const colonIndex = list.indexOf(":"),
      semiColonIndex = list.indexOf(";"),
      body = list.slice(colonIndex + 1, semiColonIndex),
      [name, ...definition] = body;
    if (colonIndex < 0 || semiColonIndex < 0) {
      return list;
    } else if (isNaN(name)) {
      this.#aliases[name] = this.#replaceAliases(definition);
      return this.#parseDefinitions([
        ...list.slice(0, colonIndex),
        ...list.slice(semiColonIndex + 1),
      ]);
    } else {
      throw new Error("Invalid definition");
    }
  }

  /**
   * @param {string[]} list
   * @returns {string[]}
   */
  #replaceAliases = (list) =>
    list.flatMap((item) =>
      item in this.#aliases ? this.#aliases[item] : item
    );
}

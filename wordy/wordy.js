// @ts-check

const VALID_NUMBER = /-?\d/;
const VALID_OPERATION = /plus|minus|multiplied|divided/;

/**
 *
 * @param {string} question
 * @returns {number}
 */
export const answer = (question) => {
  const operations = split(question);

  if (!operations.every(isKnownOperationOrNumber)) {
    throw new Error("Unknown operation");
  }

  if (!isValidSequence(operations)) {
    throw new Error("Syntax error");
  }

  let [first, ...rest] = operations;
  let outcome = parseInt(first);
  while (rest.length > 1) {
    ({ outcome, rest } = parseHead(outcome, rest));
  }
  return outcome;
};

const split = (str) => str.split(/What is|\s+|by|\?/).filter((s) => s);

const isKnownOperationOrNumber = (str) =>
  VALID_NUMBER.test(str) || VALID_OPERATION.test(str);

/**
 * @param {string[]} operations
 * @returns {boolean}
 */
const isValidSequence = (operations) => {
  if (operations.length % 2 === 0) {
    return false;
  }
  for (let i = 0; i < operations.length; i++) {
    let re = i % 2 === 1 ? VALID_OPERATION : VALID_NUMBER;
    if (!re.test(operations[i])) {
      return false;
    }
  }
  return true;
};

/**
 * @param {number} parsed
 * @param {string[]} operations
 * @returns {{outcome: number, rest: string[]}}
 */
const parseHead = (parsed, operations) => {
  const [operation, operand, ...rest] = operations;
  return {
    outcome: parseOperator(operation)(parsed, parseInt(operand)),
    rest: rest,
  };
};

/**
 *
 * @param {string} str
 * @returns {function}
 */
const parseOperator = (str) => {
  switch (str) {
    case "plus":
      return (a, b) => a + b;
    case "minus":
      return (a, b) => a - b;
    case "multiplied":
      return (a, b) => a * b;
    case "divided":
      return (a, b) => a / b;
    default:
      throw new Error("Unknown operation");
  }
};

// @ts-check

export class BankAccount {
  #ledger;

  open() {
    this.ledger = new Ledger();
  }

  close() {
    this.ledger;
    this.#ledger = null;
  }

  deposit(amount) {
    this.ledger.deposit(amount);
  }

  withdraw(amount) {
    this.ledger.withdraw(amount);
  }

  set ledger(ledger) {
    if (this.#ledger) throw new ValueError();
    this.#ledger = ledger;
  }

  get ledger() {
    if (!this.#ledger) throw new ValueError();
    return this.#ledger;
  }

  get balance() {
    return this.ledger.balance;
  }
}

class Ledger extends BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount < 0) throw new ValueError();
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount < 0 || amount > this.#balance) throw new ValueError();
    this.#balance -= amount;
  }

  get balance() {
    return this.#balance;
  }
}

export class ValueError extends Error {
  constructor() {
    super("Bank account error");
  }
}

// @ts-check

export class List {
    #values;

    constructor(values = []) {
        this.#values = values;
    }

    get values() {
        return this.#values;
    }

    /**
     * @param {List} list
     */
    append(list) {
        return new List([...this.values, ...list.values]);
    }

    concat(list) {
        let out = new List(this.values);
        for (const val of list.values) {
            out = out.append(val);
        }
        return out;
    }

    /**
     *
     * @param {function} func
     */
    filter(func) {
        let out = new List();
        for (const val of this.values) {
            if (func(val)) {
                out = out.append(new List([val]));
            }
        }
        return out;
    }

    /**
     *
     * @param {function} func
     */
    map(func) {
        let out = new List();
        for (const val of this.values) {
            out = out.append(new List([func(val)]));
        }
        return out;
    }

    length(counted = 0) {
        return this.#values[counted] === undefined
            ? counted
            : this.length(counted + 1);
    }

    foldl(func, acc) {
        let out = acc;
        for (const val of this.values) {
            out = func(out, val);
        }
        return out;
    }

    foldr(func, acc) {
        return this.reverse().foldl(func, acc);
    }

    reverse() {
        let out = new List();
        for (let index = 1; index <= this.length(); index++) {
            out = out.append(new List([this.values[this.length() - index]]));
        }

        return out;
    }
}

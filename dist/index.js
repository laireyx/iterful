class Iterful {
    iter;
    /**
     * Wraps an ordinary iterator object into the colorful one.
     *
     * @param itererator Iterator.
     */
    constructor(itererator) {
        this.iter = itererator;
    }
    static fromArray(arr) {
        return new Iterful((function* (arr) {
            for (const item of arr) {
                yield item;
            }
        })(arr));
    }
    map(callback) {
        return new Iterful((function* (iter) {
            let current = iter.next();
            while (!current.done) {
                yield callback(current.value);
                current = iter.next();
            }
        })(this.iter));
    }
    filter(callback) {
        return new Iterful((function* (iter) {
            let current = iter.next();
            while (!current.done) {
                if (callback(current.value)) {
                    yield current.value;
                }
                current = iter.next();
            }
        })(this.iter));
    }
    reduce(callback, initialValue) {
        let current = this.iter.next();
        let acc = initialValue;
        if (acc === undefined) {
            acc = current.value;
            current = this.iter.next();
        }
        while (!current.done) {
            acc = callback(acc, current.value);
            current = this.iter.next();
        }
        return acc;
    }
    each(callback) {
        let current = this.iter.next();
        while (!current.done) {
            callback(current.value);
            current = this.iter.next();
        }
    }
    toArray() {
        const arr = [];
        this.each((x) => {
            arr.push(x);
        });
        return arr;
    }
}
export default Iterful;
//# sourceMappingURL=index.js.map
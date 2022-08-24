class Iterful<T> {
  iter: Iterator<T, any, undefined>;

  /**
   * Wraps an ordinary iterator object into the colorful one.
   *
   * @param itererator Iterator.
   */
  constructor(itererator: Iterator<T, any, undefined>) {
    this.iter = itererator;
  }

  static fromArray<U>(arr: U[]): Iterful<U> {
    return new Iterful(
      (function* (arr: any[]) {
        for (const item of arr) {
          yield item;
        }
      })(arr)
    );
  }

  map<U>(callback: (currentValue: T) => U): Iterful<U> {
    return new Iterful(
      (function* (
        iter: Iterator<T, any, undefined>
      ): Generator<U, any, undefined> {
        let current = iter.next();
        while (!current.done) {
          yield callback(current.value);
          current = iter.next();
        }
      })(this.iter)
    );
  }

  filter(callback: (element: T) => boolean): Iterful<T> {
    return new Iterful(
      (function* (
        iter: Iterator<T, any, undefined>
      ): Generator<T, any, undefined> {
        let current = iter.next();
        while (!current.done) {
          if (callback(current.value)) {
            yield current.value;
          }
          current = iter.next();
        }
      })(this.iter)
    );
  }

  reduce<U>(
    callback: (accumulator: U, currentValue: T) => U,
    initialValue?: U
  ): U {
    let current = this.iter.next();
    let acc = initialValue;

    if (acc === undefined) {
      acc = current.value as U;
      current = this.iter.next();
    }

    while (!current.done) {
      acc = callback(acc, current.value);
      current = this.iter.next();
    }

    return acc;
  }

  each(callback: (x: T) => void): void {
    let current = this.iter.next();
    while (!current.done) {
      callback(current.value);
      current = this.iter.next();
    }
  }

  toArray(): Array<T> {
    const arr: T[] = [];

    this.each((x) => {
      arr.push(x);
    });

    return arr;
  }
}

export default Iterful;

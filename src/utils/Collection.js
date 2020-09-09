class Collection extends Map {
  constructor(data = [], key) {
    super();

    data.forEach((value, index) => {
      this.set(value[key] || index, value);
    });

    this.key = key;
  }

  array() {
    return [...this.values()];
  }

  random() {
    return this.array()[Math.floor(Math.random() * this.array().length)];
  }

  first() {
    return this.array()[0];
  }

  last() {
    return this.array().slice(-1)[0];
  }

  map(fn) {
    const newBase = new Collection();

    this.forEach((value, key) => {
      newBase.set(key, fn(value, key, this));
    });

    return newBase;
  }

  filter(fn) {
    const newBase = new Collection();

    this.forEach((value, key) => {
      if (fn(value, key, this)) {
        newBase.set(key, value);
      }
    });

    return newBase;
  }

  find(fn) {
    return this.filter(fn)[0];
  }

  some(fn) {
    return !!this.filter(fn);
  }
}


module.exports = Collection;

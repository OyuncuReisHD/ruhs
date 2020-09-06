const Collection = ((collectionData = [], parameter = "id") => {
  let data = collectionData.map((d, i) => [d[parameter] || i, d]);

  const base = {};

  base.has = ((key) => {
    if(typeof key !== "string") {
      throw new Error("First argument of has method of Collection must be string.");
    }

    return data.map((d) => d[0]).includes(key);
  });

  base.get = ((key) => {
    return (base.has(key) ? data.find((d) => d[0] === key)[1]  : undefined);
  });

  base.set = ((key, value) => {
    if(typeof key !== "string") {
      throw new Error("First argument of set method of Collection must be string.");
    }

    if(base.has(key)) {
      data[data.indexOf(data.find((d) => d[0] === key))] = [key, value];
    } else {
      data.push([key, value]);
    }
  });

  base.delete = ((key) => {
    if(typeof key !== "string") {
      throw new Error("First argument of delete method of Collection must be string.");
    }

    const newData = [];

    base.keys().forEach((altKey) => {
      if(key !== altKey) {
        newData.push([key, base.get(key)]);
      }
    });

    data = newData;
  });

  base.array = (() => {
    return data.map((d) => d[1]);
  });

  base.keys = (() => {
    return data.map((d) => d[0]);
  });

  base.entries = (() => {
    return data;
  });

  base.first = (() => {
    return data[0][1];
  });

  base.last = (() => {
    return data.slice(-1)[0][1];
  });

  base.size = (() => {
    return data.length;
  });

  base.map = ((fn) => {
    const newBase = Collection();

    data.forEach((d) => {
      newBase.set(d[0], fn(d[1], d[0], base.keys().indexOf(d[0]), base.array()));
    });

    return newBase;
  });

  base.filter = ((fn) => {
    const newBase = Collection();

    data.forEach((d) => {
      if(fn(d[1], d[0], base.keys().indexOf(d[0]), base.array())) {
        newBase.set(d[0], d[1]);
      }
    });

    return newBase;
  });

  base.forEach = ((fn) => {
    data.forEach((d) => {
      fn(d[1], d[0], base.keys().indexOf(d[0]), base.array());
    });
  });

  base.find = ((fn) => {
    return base.filter(fn)[0];
  });

  base.some = ((fn) => {
    return !!base.filter(fn)[0];
  });

  return base;
});

module.exports = Collection;

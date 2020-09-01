const Collection = ((collectionData = [], parameter = "id") => {
  const data = collectionData.map((d, i) => [d[parameter] || i, d]);
  const base = {};

  base.has = ((key) => {
    if(typeof key !== "string") {
      throw new Error("First argument of Collection must be string.");
    }

    return data.map((d) => d[0]).includes(key);
  });

  base.get = ((key) => {
    return (base.has(key) ? data.find((d) => d[0] === key)[1]  : undefined);
  });

  base.set = ((key, value) => {
    if(typeof key !== "string") {
      throw new Error("First argument of Collection must be string.");
    }

    if(base.has(key)) {
      data[data.indexOf(data.find((d) => d[0] === key))] = [key, value];
    } else {
      data.push([key, value]);
    }
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

  return base;
});

module.exports = Collection;

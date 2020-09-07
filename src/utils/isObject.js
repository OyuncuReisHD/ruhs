const isObject = ((data) => {
  return (typeof data === "object") && !Array.isArray(data) && !(data instanceof Promise) && !(data instanceof Map);
});

module.exports = isObject;
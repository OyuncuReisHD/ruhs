const errorHandler = ((...args) => {
  if(args[0] === "specify") {
    throw new TypeError(`Please specify ${args.slice()}`)
  }
});

module.exports = errorHandler;

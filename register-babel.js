require("babel/register")({
  ignore: /node_modules/,
  blacklist: [
    "es6.forOf",
    "regenerator",
  ],
  optional: [
    "es7.objectRestSpread",
    "es7.asyncFunctions",
    "es7.classProperties",
    "asyncToGenerator",
     "runtime",
  ],
});

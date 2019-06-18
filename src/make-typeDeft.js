const fs = require("fs");
const path = require("path");

const typeDefsGen = schema => {
  return fs.readFileSync(path.resolve(__dirname, schema)).toString();
};
console.log("TypeDef Generated 🌱");
module.exports = typeDefsGen;

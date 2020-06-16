let items = require('./src/scripts/sql.json');

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

function toUpperCaseFirstLetter(string) {
  return string[0].toUpperCase() + string.substring(1);
}

exports.default = function dataFunction() {
  return {
    items,
    formatDate,
    toUpperCaseFirstLetter
  }
}
// 多语言xlsx转换json
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require('path');

module.exports = function (source, map) {
  const result = excelToJson({
    sourceFile: path.resolve(__dirname, '../../src/i18n/translate.xlsx'),
    header: {
      rows: 1,
    },
    sheets: ['Sheet1'], // 默认只转换sheet1
    columnToKey: {
      A: 'id',
      B: 'en',
      C: 'ge',
      D: 'po',
      E: 'ru',
      F: 'fr',
      G: 'th',
      H: 'in',
      I: 'vn',
      J: 'cn',
    },
  });
  return `export default ${JSON.stringify(result)}`;
};

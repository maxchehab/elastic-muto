'use strict';

var mutoParser = require('./muto-parser');
var parse = require('./parse');
var Where = require('./where');
var Condition = require('./condition');

exports.parse = parse;

/**
 * Syntax error thrown by PEG.js on trying to parse an invalid expression
 *
 * @extends Error
 */
exports.SyntaxError = mutoParser.SyntaxError;

exports.Where = Where;
exports.where = function (condition) {
  return new Where(condition);
};

exports.Condition = Condition;
exports.condition = exports.cn = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Condition, [null].concat(args)))();
};

exports.prettyPrint = function prettyPrint(expr) {
  console.log(JSON.stringify(parse(expr), null, 2));
};
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNil = require('lodash.isnil');
var isFunction = require('lodash.isfunction');
var hasIn = require('lodash.hasin');

/**
 * Class for building Property Condition to be used with `Where`.
 *
 * @example
 * const condition = muto.cn('psngr_cnt', 'gt', 81);
 *
 * condition.build()
 * '["psngr_cnt"]" > 81'
 *
 * @param {string} [prop] Name of the property key to crate condition against
 * @param {string} [operator] Operator for the condition. One of `is`, `eq`,
 * `ne`, `lt`, `lte`, `gt`, `gte`, `exists`, `missing`, `contain`, `notcontain`
 * @param {*} [value] Value for the property condition
 */

var Condition = function () {
    // eslint-disable-next-line require-jsdoc
    function Condition(prop, operator, value) {
        (0, _classCallCheck3.default)(this, Condition);

        if (!isNil(prop)) this._prop = prop;

        if (!isNil(operator)) {
            if (operator !== 'prop' && operator !== 'build' && hasIn(this, operator) && isFunction(this[operator])) {
                this[operator](value);
            } else throw new Error(`Invalid operator '${operator}'!`);
        }
    }

    /**
     * Sets the property name for condition.
     *
     * @param {string} prop Name of the property key to crate condition against
     * @returns {Condition} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(Condition, [{
        key: 'prop',
        value: function prop(_prop) {
            this._prop = _prop;
            return this;
        }

        /**
         * Sets the condition type to boolean with given parameter.
         *
         * @param {boolean} trueOrFalse `true` or `false`
         * @returns {Condition} returns `this` so that calls can be chained
         */

    }, {
        key: 'is',
        value: function is(trueOrFalse) {
            this._operator = 'is';
            this._value = trueOrFalse;
            return this;
        }

        /**
         * Sets the type of condition as equality with given value.
         *
         * @param {*} value A valid string/number/date to check equality against
         * @returns {Condition} returns `this` so that calls can be chained
         */

    }, {
        key: 'eq',
        value: function eq(value) {
            this._operator = '==';
            this._value = value;
            return this;
        }

        /**
         * Sets the type of condition as not equal to given value.
         *
         * @param {*} value A valid string/number to check inequality against
         * @returns {Condition} returns `this` so that calls can be chained
         */

    }, {
        key: 'ne',
        value: function ne(value) {
            this._operator = '!=';
            this._value = value;
            return this;
        }

        /**
         * Sets the type of condition as less than given value.
         *
         * @param {*} value A valid string/number/date.
         * @returns {Condition} returns `this` so that calls can be chained
         */

    }, {
        key: 'lt',
        value: function lt(value) {
            this._operator = '<';
            this._value = value;
            return this;
        }

        /**
         * Sets the type of condition as less than or equal to given value.
         *
         * @param {*} value A valid string/number/date.
         * @returns {Condition} returns `this` so that calls can be chained
         */

    }, {
        key: 'lte',
        value: function lte(value) {
            this._operator = '<=';
            this._value = value;
            return this;
        }

        /**
         * Sets the type of condition as greater than given value
         *
         * @param {*} value A valid string/number/date.
         * @returns {Condition} returns `this` so that calls can be chained
         */

    }, {
        key: 'gt',
        value: function gt(value) {
            this._operator = '>';
            this._value = value;
            return this;
        }

        /**
         * Sets the type of condition as greater than or equal to given value
         *
         * @param {*} value A valid string/number/date.
         * @returns {Condition} returns `this` so that calls can be chained
         */

    }, {
        key: 'gte',
        value: function gte(value) {
            this._operator = '>=';
            this._value = value;
            return this;
        }

        /**
         * Builds and returns muto syntax for Property Condition
         *
         * @returns {string} returns a string which maps to the muto syntax for
         * Property Condition
         */

    }, {
        key: 'build',
        value: function build() {
            // Not gonna throw error here if expected members are not populated
            // For exists and missing, thisn._value _should_ be undefined
            // We just check if the operator is one of the 2.
            if (this._operator === 'exists' || this._operator === 'missing') {
                return `"${this._prop}" ${this._operator}`;
            }
            return `"${this._prop}" ${this._operator} ${JSON.stringify(this._value)}`;
        }

        /**
         * Hotwire to return `this.build()`
         *
         * @override
         * @returns {string}
         */

    }, {
        key: 'toString',
        value: function toString() {
            return this.build();
        }

        /**
         * Hotwire to return `this.build()`
         *
         * @override
         * @returns {string}
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return this.build();
        }
    }]);
    return Condition;
}();

module.exports = Condition;
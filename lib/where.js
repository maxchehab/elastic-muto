'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmpty = require('lodash.isempty');
var isNil = require('lodash.isnil');
var hasIn = require('lodash.hasin');

var AND = 'and';
var OR = 'or';

/**
 * Class for building `Where` expressions
 *
 * @example
 * const where = muto.where()
 *     .or(muto.cn('discount').is(false))
 *     .or(
 *         muto.where()
 *             // Pass conditions using helper classes
 *             .and(muto.cn('psngr_cnt', 'gt', 81))
 *             // Or a simple string will do
 *             .and('"booking_mode" contains "Airport"')
 *     )
 *     .build();
 * '"discount" is false or ("psngr_cnt" > 81 and "booking_mode" contains "Airport")'
 *
 * @param {Condition|Where|string} [condition]
 */

var Where = function () {
    // eslint-disable-next-line require-jsdoc
    function Where(condition) {
        (0, _classCallCheck3.default)(this, Where);

        this._join = '';
        this._conditions = [];

        if (!isNil(condition)) this._conditions.push(condition);
    }

    /**
     * Helper method for adding a condition.
     *
     * @private
     * @param {string} type `and`/`or`
     * @param {Condition|Where|string} condition
     * @returns {Where} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(Where, [{
        key: '_addCondition',
        value: function _addCondition(type, condition) {
            if (isEmpty(this._join)) this._join = type;else if (this._join !== type) {
                console.log('Use nested Where class instances for combining `and` with `or`');
                throw new Error('Illegal operation! Join types cannot be mixed!');
            }

            this._conditions.push(condition);
            return this;
        }

        /**
         * Adds an `and` condition. The condition can be instance of `Condition`,
         * `Where`(nested expr) or just a string.
         *
         * @param {Condition|Where|string} condition The condition to be added
         * @returns {Where} returns `this` so that calls can be chained
         * @throws {Error} If `and`, `or` are called on the same instance of `Where`
         */

    }, {
        key: 'and',
        value: function and(condition) {
            return this._addCondition(AND, condition);
        }

        /**
         * Adds an `or` condition. The condition can be instance of `Condition`,
         * `Where`(nested expr) or just a string.
         *
         * @param {Condition|Where|string} condition The condition to be added
         * @returns {Where} returns `this` so that calls can be chained
         * @throws {Error} If `and`, `or` are called on the same instance of `Where`
         */

    }, {
        key: 'or',
        value: function or(condition) {
            return this._addCondition(OR, condition);
        }

        /**
         * Build and return muto syntax for Where Expression
         *
         * @returns {string} returns a string which maps to the muto syntax for
         * Where Expression
         */

    }, {
        key: 'build',
        value: function build() {
            var whereStr = this._conditions.map(function (cn) {
                return hasIn(cn, 'build') ? cn.build() : cn;
            }).join(` ${this._join} `);

            return `(${whereStr})`;
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
    return Where;
}();

module.exports = Where;
'use strict';

var debug = require('debug')('elastic-muto');

var _require = require('elastic-builder/lib/queries'),
    _require$termLevelQue = _require.termLevelQueries,
    TermQuery = _require$termLevelQue.TermQuery,
    RangeQuery = _require$termLevelQue.RangeQuery,
    BoolQuery = _require.compoundQueries.BoolQuery;

module.exports = {
    // Condition builder for number less than or equal to
    numLte(key, value) {
        debug('Number property less than or equal to condition');
        debug('key - %s, value - %s', key, value);
        return new RangeQuery(key).lte(value);
    },

    // Condition builder for number greater than or equal to
    numGte(key, value) {
        debug('Number property greater than or equal to condition');
        debug('key - %s, value - %s', key, value);
        return new RangeQuery(key).gte(value);
    },

    // Condition builder for number less than
    numLt(key, value) {
        debug('Number property less than condition');
        debug('key - %s, value - %s', key, value);
        return new RangeQuery(key).lt(value);
    },

    // Condition builder for number greater than or equal to
    numGt(key, value) {
        debug('Number property greater than condition');
        debug('key - %s, value - %s', key, value);
        return new RangeQuery(key).gt(value);
    },

    // Condition builder for number equalality
    numEq(key, value) {
        debug('Number property equality condition');
        debug('key - %s, value - %s', key, value);
        return new TermQuery(key, value);
    },

    // Condition builder for number inequality
    numNe(key, value) {
        debug('Number property inequality condition');
        debug('key - %s, value - %s', key, value);
        return new BoolQuery().mustNot(new TermQuery(key, value));
    },

    // Condition builder for string equality
    strEq(key, value, notAnalysedFields) {
        debug('String property equality condition');
        debug('key - %s, value - %s', key, value);
        var fieldName = notAnalysedFields.has(key) ? key : `${key}.keyword`;
        return new TermQuery(fieldName, value);
    },

    // Condition builder for string inequality
    strNe(key, value, notAnalysedFields) {
        debug('String property inequality condition');
        debug('key - %s, value - %s', key, value);
        var fieldName = notAnalysedFields.has(key) ? key : `${key}.keyword`;
        return new BoolQuery().mustNot(new TermQuery(fieldName, value));
    },

    // Function for building property key
    propertyKey: function propertyKey(chars) {
        return chars.join('');
    }
};
import * as bob from 'elastic-builder';
import * as muto from '../../src';

export const conditions = [
    'numLt',
    'numLte',
    'numGt',
    'numGte',
    'numEq',
    'numNe',
    'strEq',
    'strNe'
];

/**
 * Helper function to get random condition excluding given set
 * @private
 * @param {Set} exclude
 * @returns {function}
 */
export function randCnGen() {
    const exclude = new Set();
    return () => {
        let randCn;
        do {
            randCn = conditions[Math.floor(Math.random() * conditions.length)];
        } while (exclude.has(randCn));
        exclude.add(randCn);
        return randCn;
    };
}

export const cnNamesMap = {
    numLt: 'number less than',
    numLte: 'number less than or equal to',
    numGt: 'number greater than',
    numGte: 'number greater than or equal to',
    numEq: 'number equal to',
    numNe: 'number not equal to',
    strEq: 'string equals',
    strNe: 'string not equals'
};

export const cnMap = {
    numLt: muto.cn('num_idiots').lt(0),
    numLte: muto.cn('num_idiots').lte(0),
    numGt: muto.cn('contributors').gt(1),
    numGte: muto.cn('contributors').gte(1),
    numEq: muto.cn('idiots').eq(0),
    numNe: muto.cn('idiots').ne(1),
    strEq: muto.cn('elasticsearch').eq('awesome'),
    strNe: muto.cn('foo').ne('bar')
};

export const cnQryMap = {
    numLt: bob.rangeQuery('num_idiots').lt(0),
    numLte: bob.rangeQuery('num_idiots').lte(0),
    numGt: bob.rangeQuery('contributors').gt(1),
    numGte: bob.rangeQuery('contributors').gte(1),
    numEq: bob.termQuery('idiots', 0),
    numNe: bob.boolQuery().mustNot(bob.termQuery('idiots', 1)),
    strEq: bob.termQuery('elasticsearch.keyword', 'awesome'),
    strEqNotAnalyzed: bob.termQuery('elasticsearch', 'awesome'),
    strNe: bob.boolQuery().mustNot(bob.termQuery('foo.keyword', 'bar')),
    strNeNotAnalyzed: bob.boolQuery().mustNot(bob.termQuery('foo', 'bar'))
};

export const qryBldrArgs = {
    numLt: ['num_idiots', 0],
    numLte: ['num_idiots', 0],
    numGt: ['contributors', 1],
    numGte: ['contributors', 1],
    numEq: ['idiots', 0],
    numNe: ['idiots', 1],
    strEq: ['elasticsearch', 'awesome', new Set()],
    strEqNotAnalyzed: ['elasticsearch', 'awesome', new Set(['elasticsearch'])],
    strNe: ['foo', 'bar', new Set()],
    strNeNotAnalyzed: ['foo', 'bar', new Set(['foo'])]
};

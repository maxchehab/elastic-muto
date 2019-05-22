import qryBldrDef from '../src/query-builder-def';
import {
    conditions,
    cnNamesMap,
    cnQryMap,
    qryBldrArgs
} from './helpers/condition-factory';

describe('query builder default', () => {
    describe('has definition for', () => {
        conditions.forEach(cn => {
            test(cnNamesMap[cn], () => {
                expect(qryBldrDef[cn]).toBeDefined();
                expect(qryBldrDef[cn]).toBeInstanceOf(Function);
            });
        });
    });

    it('has method for generating property key', () => {
        expect(qryBldrDef.propertyKey).toBeDefined();
        expect(qryBldrDef.propertyKey).toBeInstanceOf(Function);
    });

    describe('build condition', () => {
        conditions.forEach(cn => {
            test(cnNamesMap[cn], () => {
                const qry = qryBldrDef[cn](...qryBldrArgs[cn]);

                expect(qry).toBeInstanceOf(cnQryMap[cn].constructor);
                expect(qry).toEqual(cnQryMap[cn]);
            });
        });
    });

    it('builds the property key from char array', () => {
        expect(qryBldrDef.propertyKey('blistering_barnacles'.split(''))).toBe(
            'blistering_barnacles'
        );
    });
});

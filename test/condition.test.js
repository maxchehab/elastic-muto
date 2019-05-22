import * as muto from '../src';

const { Condition } = muto;

describe('Condition builder', () => {
    it('can be instantiated with params', () => {
        const cn = new Condition('my_prop', 'eq', 10).build();
        expect(cn).toBe('"my_prop" == 10');
    });

    it('aliases work as expected', () => {
        const cn = new Condition('my_prop', 'eq', 10);
        expect(muto.cn('my_prop', 'eq', 10)).toEqual(cn);
        expect(muto.condition('my_prop', 'eq', 10)).toEqual(cn);
    });

    it('does not throw error in constructor for valid operators', () => {
        ['eq', 'ne', 'lt', 'lte', 'gt', 'gte'].forEach(operator =>
            expect(() => new Condition('my_prop', operator, 10)).not.toThrow()
        );
    });

    it('throws error for invalid operator param to constructor', () => {
        expect(() => new Condition('my_prop', 'invld', 10)).toThrowError(
            /Invalid operator/
        );
        expect(() => new Condition('my_prop', 'prop', 10)).toThrowError(
            /Invalid operator/
        );
        expect(() => new Condition('my_prop', 'build', 10)).toThrowError(
            /Invalid operator/
        );
    });

    it('sets the property key', () => {
        const cn = new Condition()
            .prop('my_prop')
            .eq('dancing monkeys')
            .build();
        expect(cn).toBe('"my_prop" == "dancing monkeys"');
    });

    it('builds equality condition', () => {
        const cn = new Condition()
            .prop('my_prop')
            .eq('dancing monkeys')
            .build();
        expect(cn).toBe('"my_prop" == "dancing monkeys"');
    });

    it('builds inequality condition', () => {
        const cn = new Condition()
            .prop('my_prop')
            .ne('dancing monkeys')
            .build();
        expect(cn).toBe('"my_prop" != "dancing monkeys"');
    });

    it('builds less than condition', () => {
        const cn = new Condition()
            .prop('my_prop')
            .lt(299792458)
            .build();
        expect(cn).toBe('"my_prop" < 299792458');
    });

    it('builds less than or equal to condition', () => {
        const cn = new Condition()
            .prop('my_prop')
            .lte(299792458)
            .build();
        expect(cn).toBe('"my_prop" <= 299792458');
    });

    it('builds greater than condition', () => {
        const cn = new Condition()
            .prop('my_prop')
            .gt(299792458)
            .build();
        expect(cn).toBe('"my_prop" > 299792458');
    });

    it('builds greater than or equal to condition', () => {
        const cn = new Condition()
            .prop('my_prop')
            .gte(299792458)
            .build();
        expect(cn).toBe('"my_prop" >= 299792458');
    });

    it('delegates to the build function on calling toJSON', () => {
        const cn = new Condition().prop('prophecy').is(true);
        const spy = jest.spyOn(cn, 'build');
        cn.toJSON();

        expect(spy).toHaveBeenCalled();

        spy.mockReset();

        JSON.stringify(cn);
        expect(spy).toHaveBeenCalled();

        spy.mockReset();
        spy.mockRestore();
    });

    it('delegates to the build function on calling toString', () => {
        const cn = new Condition().prop('prophecy').is(true);
        const spy = jest.spyOn(cn, 'build');
        cn.toString();

        expect(spy).toHaveBeenCalled();

        spy.mockReset();
        spy.mockRestore();
    });
});

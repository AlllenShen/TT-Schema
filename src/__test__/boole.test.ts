import { Schema } from '../base';
import TT from '..'

test('parse bool', () => {
    expect(TT.boolean().guard(false)).toBe(false);
    expect(TT.boolean().guard('asd')).toBe(true);
    expect(TT.boolean().guard(['asd'])).toBe(true);
    expect(TT.boolean().guard([])).toBe(true);
    expect(TT.boolean().guard(123)).toBe(true);
})
test('bool in scheam', () => {
    expect(
        Schema({foo: TT.boolean()})
            .guard({foo: 123})
    ).toBe({foo: true});
})
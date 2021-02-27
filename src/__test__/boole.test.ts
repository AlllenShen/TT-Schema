import { Schema, SchemaError } from '../base'
import TT from '..'

test('parse bool', () => {
    expect(TT.boolean().guard(false)).toBe(false)
    expect(TT.boolean().guard('asd')).toBe(true)
    expect(TT.boolean().guard(['asd'])).toBe(true)
    expect(TT.boolean().guard([])).toBe(true)
    expect(TT.boolean().guard(123)).toBe(true)
    expect(TT.boolean().guard({})).toBe(true)
})

test('strict', () => {
    expect( () => TT.boolean().strict().guard({})).toThrow(SchemaError)
    expect( () => TT.boolean().strict().guard([])).toThrow(SchemaError)
    expect(TT.boolean().strict().guard(0)).toBe(false)
    expect(TT.boolean().strict().guard(1)).toBe(true)
    expect(TT.boolean().strict().guard('123')).toBe(true)
    expect(TT.boolean().strict().guard(123)).toBe(true)
})
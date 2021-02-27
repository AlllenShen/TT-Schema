import { Schema, SchemaError } from '../base'
import TT from '..'

test('parse number', () => {
    // basic
    expect(TT.number().guard(123)).toBe(123)
    expect(TT.number().guard('123')).toBe(123)
    expect(() => TT.number().guard('foo')).toThrow(SchemaError)

    // single condition
    expect(TT.number().gt(10).guard(123)).toBe(123)
    expect(() => TT.number().gt(10).guard(9)).toThrow(SchemaError)

    expect(TT.number().gt(10).guard(123)).toBe(123)
    expect(() => TT.number().gt(10).guard(9)).toThrow(SchemaError)
    expect(() => TT.number().gt(10).guard(10)).toThrow(SchemaError)

    expect(TT.number().ge(10).guard(123)).toBe(123)
    expect(TT.number().ge(10).guard(10)).toBe(10)
    expect(() => TT.number().ge(10).guard(9)).toThrow(SchemaError)

    expect(() => TT.number().lt(10).guard(123)).toThrow(SchemaError)
    expect(() => TT.number().lt(10).guard(10)).toThrow(SchemaError)
    expect(TT.number().lt(10).guard(9)).toBe(9)

    expect(() => TT.number().le(10).guard(123)).toThrow(SchemaError)
    expect(TT.number().le(10).guard(10)).toBe(10)
    expect(TT.number().le(10).guard(9)).toBe(9)

    expect(() => TT.number().equal(10).guard(123)).toThrow(SchemaError)
    expect(TT.number().equal(10).guard(10)).toBe(10)
    expect(TT.number().equal([10, 11]).guard(10)).toBe(10)
    expect(TT.number().equal([10, 11]).guard(11)).toBe(11)

    expect(() => TT.number().notEqual(10).guard(10)).toThrow(SchemaError)
    expect(TT.number().notEqual(10).guard(123)).toBe(123)

    // multi conditions
    expect(() => TT.number().notEqual(10).notEqual(11).guard(10)).toThrow(SchemaError)
    expect(() => TT.number().notEqual(10).notEqual(11).guard(11)).toThrow(SchemaError)
    expect(TT.number().notEqual(10).notEqual(11).guard(111)).toBe(111)
})
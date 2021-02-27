import { Schema, SchemaError } from '../base';
import TT from '..'

test('test basic', () => {
    expect(
        Schema(TT.boolean())
            .guard(true)
    ).toBe(true)
})

test('test tuple', () => {
    expect(
        Schema([TT.boolean(), TT.number()])
            .guard([true, 1])
    ).toStrictEqual([true, 1])
})

test('test object', () => {
    expect(
        Schema({ foo: TT.boolean() })
            .guard({ foo: 123 })
    ).toStrictEqual({ foo: true })
})

test('test error', () => {
    expect(
        () => Schema({ foo: TT.boolean() })
            .guard(123)
    ).toThrow(SchemaError)
})


import { ArrayType } from "./Array"
import { customerType, Schema } from "./base"
import { BooleanType } from "./Boolean"
import { NumberType } from "./Number"
import { StringType } from "./String"
import { ValidSchema } from "./type"



const types = {
    boolean: () => new BooleanType(),
    number: () => new NumberType(),
    string: () => new StringType(),
    array: <T extends ValidSchema>(t: T) => new ArrayType<T>(t),
}

export default types

// useage demo
// let fooSchema = Schema([types.boolean(), types.boolean()])
// let foo = fooSchema.guard([false, false])

// let barSchema = Schema({
//     name: {
//         sub1: types.string(),
//         sub2: types.boolean(),
//     },
//     age: types.string()
// })
// let bar = barSchema.guard({
//     name: {
//         sub1: '123',
//         sub2: '123'
//     },
//     age: 1
// })

// Customer Type demo
// let decoder = (v: unknown) => {
//     return {
//         foo: Number(v),
//         bar: '123'
//     }
// }

// const myType = customerType((v) => ({
//     foo: Number(v),
//     bar: '123'
// })).error('123')
// let qux = myType
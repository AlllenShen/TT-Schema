import { GuardResult, ValidSchema } from "src/type";
import { Schema, SchemaBaseType } from "../base";

// @ts-ignore here needs to ignore instantiation too deep error
export class ArrayType<T extends ValidSchema> extends SchemaBaseType<Array<GuardResult<T>>> {
    private schema: SchemaBaseType<GuardResult<T>>

    constructor (_type: T) {
        super()
        this.schema = Schema(_type)
    }
    
    decode(v: unknown) {
        if (typeof v === 'string') {
            // JSON.parse will not distinguish array and object
            if (!(v.startsWith('[') && v.startsWith(']'))) {
                return this.sendErr()
            }
            return this.schema.guard(JSON.parse(v))
        } else if (Array.isArray(v)) {
            return this.schema.guard(v)
        } else {
            return this.sendErr()
        }
    }
}
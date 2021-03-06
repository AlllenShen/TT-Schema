import { BooleanType } from './Boolean/index';
import { ConditionFunc, Decoder, ErrorHandler, ValidSchema, GuardResult, ExtractSchemaType, ValueParser } from "./type"


export class SchemaError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

export class SchemaBaseType<T = any> {

    protected parsers: ValueParser[] = []
    protected conditions: ConditionFunc<T>[] = []

    protected errStr: string = ''
    protected getErrorMsg<E extends Error> (e?: E) {
        return this.errStr
    }

    protected _addCondition(condition: (v: T) => boolean) {
        this.conditions.push((v) => ({isValid: condition(v)}))
        return this
    }

    public decode(v: unknown): T {
        return v as T
    }
    public _setDecoder(decoder: Decoder<T>) {
        this.decode = decoder
        return this
    }

    public error(handler: string | ErrorHandler): this {
        this.getErrorMsg = typeof handler === 'string'
            ? () => handler : handler
        return this
    }

    protected sendErr(msg?: string): never {
        throw new SchemaError(msg || this.getErrorMsg())
    }

    public guard(value: unknown, customerMsg?: string): T {
        try {
            for (let parser of this.parsers) {
                value = parser(value)
            }
            const result = this.decode(value)
            for (let condition of this.conditions) {
                const check = condition(result)
                if (!check.isValid) {
                    this.sendErr(customerMsg || check.error)
                }
            }
            return result
        } catch (e) {
            // console.log('Error msg: ', e.message)
            this.sendErr(customerMsg)
        }
    }

    public require() {
        return this._addCondition(v => v !== undefined && v !== null)
    }
}

export const Schema = <S extends ValidSchema>(
    schema: S,
    // errMsg?: string
): SchemaBaseType<GuardResult<S>> => {
    type Result = GuardResult<S>

    // consider schema as a customer type
    // then decode it
    const decoder: Decoder<Result> = (v: any) => {
        if (schema instanceof SchemaBaseType) {
            return schema.guard(v)
        } else if (Array.isArray(schema)) {
            return v.map((el, idx) => Schema(schema[idx]).guard(el))
        } else if (typeof schema === 'object') {
            if (typeof v !== 'object') {
                throw new Error()
            }
            return Object.keys(schema).reduce((total, key) => {
                total[key] = Schema(schema[key]).guard(v[key])
                return total
            }, {})
        } else {
            throw new Error()
        }
    }

    return customerType(decoder)
}

// customer helper
export function customerType<U>(decoder: Decoder<U>): SchemaBaseType<U> {
    return new SchemaBaseType<U>()._setDecoder(decoder)
}

import { SchemaBaseType } from "./base"
import { BooleanType } from "./Boolean"

export declare type ConditionFunc<T = any> = (v: T) => {
    isValid: boolean
    error?: string
}

export declare type BeforeDecodeHook = (v: unknown) => any

export declare type Decoder<T> = (value: unknown) => T

export declare type ErrorHandler = <E extends Error>(e?: E) => string

export declare type ExtractType<T> = T extends SchemaBaseType<infer P> ? P : any

export declare type ObjectSchema<T extends ValidSchema = any> = {
    [k: string]: T
}
export declare type ValidSchema<T extends SchemaBaseType = any> =
    | SchemaBaseType
    | ValidSchema<T>[]
    | { [k: string]: ValidSchema}

export declare type ExtractSchemaType<S extends ValidSchema> =
    S extends SchemaBaseType ? ExtractType<S> :
    { [K in keyof S]: ExtractSchemaType<S[K]>}

export declare type GuardResult<S extends ValidSchema> =
    S extends SchemaBaseType ? ExtractType<S> : ExtractSchemaType<S>

type T1 = ExtractSchemaType<[BooleanType]>

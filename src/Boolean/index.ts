import { SchemaBaseType } from "../base";

export class BooleanType extends SchemaBaseType<boolean> {
    errStr = 'invalid boolean'

    decode(value: unknown) {
        return !!value
    }

    /** treat some values as false */
    public falsy(value: any) {
        return this.parsers.push(v => v === value ? false : v)
    }
    /** treat some values as ttue */
    public truthy(value: any) {
        return this.parsers.push(v => v === value ? true : v)
    }

}
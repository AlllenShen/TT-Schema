import { SchemaBaseType } from "../base";

export class BooleanType extends SchemaBaseType<boolean> {
    errStr = 'invalid boolean'

    decode(value: unknown) {
        return !!value
    }

    /** treat some values as false */
    public falsy(value: any) {
        this.parsers.push(v => v === value ? false : v)
        return this
    }
    /** treat some values as ttue */
    public truthy(value: any) {
        this.parsers.push(v => v === value ? true : v)
        return this
    }
    /** use strict mode
     * 
     * do not accept object
     */
    public strict() {
        this.parsers.push(v => typeof v === 'object' ? this.sendErr() : v)
        return this
    }

}
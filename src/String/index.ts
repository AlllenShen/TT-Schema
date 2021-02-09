import { SchemaBaseType } from "../base";

export class StringType extends SchemaBaseType<string> {
    decode(value: unknown) {
        return String(value)
    }

    /** match a regular expression */
    public match(reg: string | RegExp) {
        return this._addCondition(v => new RegExp(reg).test(v))
    }
    /** string case */
    public case(direction: 'upper' | 'lower') {
        const reg = direction === 'upper'
            ? /^[a-z]+$/
            : /^[A-Z]+$/
        return this.match(reg)
    }
}
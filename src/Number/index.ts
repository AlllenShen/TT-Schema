import { SchemaBaseType } from "../base";

export class NumberType extends SchemaBaseType<number> {
    decode(value: unknown) {
        let result = Number(value)
        if (isNaN(result)) {
            this.sendErr()
        }
        return result
    }

    /** greater than */
    public gt(limit: number) {
        return this._addCondition(v => v > limit)
    }
    /** greater than or equal */
    public ge(limit: number) {
        return this._addCondition(v => v >= limit)
    }
    /** less than */
    public lt(limit: number) {
        return this._addCondition(v => v < limit)
    }
    /** less than or equal */
    public le(limit: number) {
        return this._addCondition(v => v <= limit)
    }
    /** not equal */
    public notEqual(value: number) {
        return this._addCondition(v => v !== value)
    }
    /** equal */
    public equal(value: number) {
        return this._addCondition(v => v === value)
    }
}
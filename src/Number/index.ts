import { SchemaBaseType } from "../base";

export class NumberType extends SchemaBaseType<number> {
    errStr = 'invalid number'

    decode(value: unknown) {
        let result = Number(value)
        if (isNaN(result)) {
            this.sendErr()
        }
        return result
    }

    /** greater than */
    public gt(limit: number) {
        this._addCondition(v => v > limit)
        return this
    }
    /** greater than or equal */
    public ge(limit: number) {
        this._addCondition(v => v >= limit)
        return this
    }
    /** less than */
    public lt(limit: number) {
        this._addCondition(v => v < limit)
        return this
    }
    /** less than or equal */
    public le(limit: number) {
        this._addCondition(v => v <= limit)
        return this
    }
    /** not equal */
    public notEqual(value: number) {
        this._addCondition(v => v !== value)
        return this
    }
    /** equal */
    public equal(value: number | number[]) {
        let values = typeof value === 'number' ? [value] : value
        this._addCondition(v => values.includes(v))
        return this
    }
}
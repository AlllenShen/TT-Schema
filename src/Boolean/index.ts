import { SchemaBaseType } from "../base";

export class BooleanType extends SchemaBaseType<boolean> {
    decode(value: unknown) {
        return !!value
    }

}
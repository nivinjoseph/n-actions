import { given } from "@nivinjoseph/n-defensive";
import { ApplicationException } from "@nivinjoseph/n-exception";


export class TypeHelper
{
    /**
     * @static
     */
    private constructor() { }
    
    
    public static parseBoolean(value: unknown): boolean | null
    {
        if (value == null)
            return null;
        
        if (typeof value === "boolean")
            return value;
        
        const strval = (<object>value).toString().trim().toLowerCase();
        
        if (strval === "true")
            return true;
        
        if (strval === "false")
            return false;
        
        return null;
    }
    
    public static parseNumber(value: unknown): number | null
    {
        if (value == null)
            return null;

        if (typeof value === "number")
            return Number.isFinite(value) ? value : null;
        
        const strval = (<object>value).toString().trim();
        
        if (strval.length === 0)
            return null;
        
        const parsed = +strval;
        if (!Number.isNaN(parsed) && Number.isFinite(parsed))
            return parsed;
        
        return null;
    }
    
    public static enumTypeToTuples<T extends string | number>(enumClass: object): Array<[string, T]>
    {
        given(enumClass, "enumClass").ensureHasValue().ensureIsObject();
        
        return this._getEnumTuples(enumClass) as Array<[string, T]>;
    }
    
    public static impossible(_value: never, message?: string): never
    {
        throw new ApplicationException(message ?? `Invalid value: ${_value}`);
    }
    
    private static _getEnumTuples(enumType: object): Array<[string, string | number]>
    {
        const keys = Object.keys(enumType);
        if (keys.length === 0)
            return [];

        if (this._isNumber(keys[0]))
            return keys.filter(t => this._isNumber(t)).map(t => [(<any>enumType)[t] as string, +t]);

        return keys.map(t => [t, (<any>enumType)[t] as string]);
    }
    
    private static _isNumber(value: unknown): boolean
    {
        if (value == null)
            return false;

        const val = (<object>value).toString().trim();
        if (val.length === 0)
            return false;
        const parsed = +(<object>value).toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    }
}

// enum Foo
// {
//     bar = "BAR",
//     baz = "BAZ",
//     zeb = "ZEB"
// }

// export function doStuff(val: Foo): void
// {
//     switch (val)
//     {
//         case Foo.bar:
//             console.log(val);
//             break;
//         case Foo.baz:
//             console.log(val, "baz");
//             break;
//         default:
//             TypeHelper.impossible(val, "ff");
//     }
// }
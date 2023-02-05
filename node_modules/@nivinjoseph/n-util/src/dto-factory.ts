import { given } from "@nivinjoseph/n-defensive";
import { Serializable } from "./serializable";


export class DtoFactory
{
    /**
     * @static
     */
    private constructor() { }


    public static create<T extends object, TDto extends {} = {}>(value: T, keys: Array<keyof T | { [key: string]: keyof T | ((val: T) => any); }>): TDto
    {
        given(value, "value").ensureHasValue().ensureIsObject();
        given(keys, "keys").ensureHasValue().ensureIsArray();

        const typename = (value as any).$typename ?? (<Object>value).getTypeName();
        
        let dto;

        if (value instanceof Serializable)
        {
            const serialized = value.serialize();
            dto = keys.reduce<any>((acc, k) =>
            {
                if (typeof k === "object")
                {
                    Object.keys(k).forEach((alias) =>
                    {
                        const key = (k as any)[alias];
                        if (typeof key === "function")
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                            acc[alias] = key(value);
                        else
                            acc[alias] = serialized[key];
                        if (acc[alias] == null)
                            acc[alias] = null;
                    });
                }
                else
                {
                    acc[k] = serialized[k];
                    if (acc[k] == null)
                        acc[k] = null;
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return acc;
            }, {});
        }
        else
        {
            dto = keys.reduce<any>((acc, k) =>
            {
                if (typeof k === "object")
                {
                    Object.keys(k).forEach((alias) =>
                    {
                        const key = (k as any)[alias];
                        if (typeof key === "function")
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                            acc[alias] = key(value);
                        else
                            acc[alias] = (value as any)[key];
                        if (acc[alias] == null)
                            acc[alias] = null;
                    });
                }
                else
                {
                    let val = (value as any)[k];

                    if (typeof val === "function")
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return acc;

                    if (val instanceof Serializable)
                        val = val.serialize();

                    acc[k] = val;
                    if (acc[k] == null)
                        acc[k] = null;
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return acc;
            }, {});
        }

        dto.$typename = typename;

        return dto as TDto;
    }
}
/* eslint-disable @typescript-eslint/no-unsafe-return */
class ObjectExt
{
    // public static mapToObject(source: any, factoryFunc: () => any): any
    // {
    //     let target = factoryFunc();
    //     source = JSON.parse(JSON.stringify(source));
        
    //     for (let key in source)
    //     {
    //         if (source.hasOwnProperty(key) && typeof source[key] !== "function" && typeof target[key] !== "function")
    //         {
    //             target[key] = source[key];
    //         }
    //     }
        
    //     return target;
    // }
    
    // public static merge(target: object, source: object): void
    // {
    //     Object.assign(target, source);
    // }
    
    public static getTypeName(source: any): string 
    {
        // @ts-expect-error: not used atm
        const getName = (funcDef: string): string =>
        {
            let name = funcDef.trim();
            if (name.startsWith("function"))
            {
                name = name.substr("function".length);
                name = name.substr(0, name.indexOf("("));
            }    
            else if (name.startsWith("class"))
            {
                name = name.substr("class".length);
                name = name.substr(0, name.indexOf("{")).trim();
                if (name.includes(" "))
                    name = name.split(" ")[0];
            }    
            return name.trim();
        };
        
        if (typeof source === "function")
        {
            return source.name;
            // return getName(source.toString());
        }
        
        if (typeof source === "object")
        {
            return source.constructor.name;
            // let value = getName(source.constructor.toString());
            // if (value === "n Object") return "Object";
            // else return value;
        }

        return typeof source;
    }
    
    public static getValue(source: any, key: string): any
    {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!ObjectExt._hasValue(key))
            return undefined;
        
        if (typeof key !== "string")
            return source[key];
        
        key = key.trim();
        if (!key.includes("."))
            return source[key] === undefined ? null : source[key];
        
        const splitted = key.split(".").map(t => t.trim());
        let current = source;

        for (let i = 0; i < splitted.length; i++)
        {
            if (current === null || current === undefined) return null;
            current = current[splitted[i]];
        }
        return current === undefined ? null : current;
    }
    
    public static setValue(target: any, key: string, value: any): void
    {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!ObjectExt._hasValue(key))
            return;
        
        if (typeof key !== "string")
        {
            target[key] = value;
            return;
        }
        
        key = key.trim();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ObjectExt._ensureKeySafe(key);
        
        value = value === undefined ? null : value;
        if (!key.includes("."))
        {
            target[key] = value;
            return;
        }
        
        const splitted = key.split(".").map(t => t.trim());
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        splitted.forEach(t => ObjectExt._ensureKeySafe(t));
        let current = target;
        
        for (let i = 0; i < splitted.length - 1; i++)
        {
            let next = current[splitted[i]]; 
            if (next === null || next === undefined)
                next = {};
            current[splitted[i]] = next;
            current = next;
        }
        
        current[splitted[splitted.length - 1]] = value;
    }

    public static serialize(source: any, ...keys: Array<string>): object
    {
        const keyMaps = keys.map(t =>
        {
            if (t.includes(" as "))
            {
                const splitted = t.split(" as ");
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                splitted.forEach(u => ObjectExt._ensureKeySafe(u));
                return {
                    sourceKey: splitted[0].trim(),
                    targetKey: splitted[1].trim()
                };
            }
            
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            ObjectExt._ensureKeySafe(t);
            return {
                sourceKey: t,
                targetKey: t
            };
        });

        const target = {};

        keyMaps.forEach(t =>
        {
            const value = ObjectExt.getValue(source, t.sourceKey);
            ObjectExt.setValue(target, t.targetKey, value);
        });

        return target;
    }

    public static deserialize(source: any, targetClassOrObject: Function | object, ...keysOrValues: Array<any>): object
    {
        if (typeof targetClassOrObject === "function")
        {
            const values = keysOrValues.map(t =>
            {
                if (typeof t === "string")
                {
                    const key = t.trim();
                    return key.startsWith(":") ? key.substring(1) : ObjectExt.getValue(source, key);
                }

                return t;
            });

            
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            return new (<any>targetClassOrObject)(...values);
        }
        else
        {
            keysOrValues.forEach(t =>
            {
                const value = ObjectExt.getValue(source, t);
                ObjectExt.setValue(targetClassOrObject, t, value); 
            });   

            return targetClassOrObject;
        }
    }
    
    private static _hasValue(item: any): boolean
    {
        if (item == null)
            return false;
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (typeof item === "string" && ObjectExt._stringIsWhiteSpace(item))
            return false;
        
        return true;
    }
    
    private static _ensureKeySafe(key: string): void | never
    {
        const dangerous = ["constructor", "prototype", "__proto__"];
        if (dangerous.some(t => t === key))
            throw new Error(`Dangerous key '${key}' detected`);
    }

    private static _stringIsWhiteSpace(value: string): boolean
    {
        return value.trim().length === 0;
    }

    // private static _stringContains(primary: string, sub: string): boolean
    // {
    //     return primary.includes(sub);
    // }
    
    // private static _stringStartsWith(primary: string, sub: string): boolean
    // {
    //     return primary.startsWith(sub);
    // }
}


function defineObjectExtProperties(): void
{
    // Object.defineProperty(Object.prototype, "mapToObject", {
    //     configurable: false,
    //     enumerable: false,
    //     writable: false,
    //     value: function (factoryFunc: () => any): any
    //     {
    //         return ObjectExt.mapToObject(this, factoryFunc);
    //     }
    // });

    // Object.defineProperty(Object.prototype, "merge", {
    //     configurable: false,
    //     enumerable: false,
    //     writable: false,
    //     value: function (value: object): void
    //     {
    //         ObjectExt.merge(this, value);
    //     }
    // });
    
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["getTypeName"] === undefined)
        Object.defineProperty(Object.prototype, "getTypeName", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): string
            {
                return ObjectExt.getTypeName(this);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["getValue"] === undefined)
        Object.defineProperty(Object.prototype, "getValue", {
            configurable: false,
            enumerable: false,
            writable: true,  // for webpack compatibility
            value: function (key: string): any
            {
                return ObjectExt.getValue(this, key);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["setValue"] === undefined)
        Object.defineProperty(Object.prototype, "setValue", {
            configurable: false,
            enumerable: false,
            writable: true, // for webpack compatibility
            value: function (key: string, value: any): void
            {
                ObjectExt.setValue(this, key, value);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["serializeObject"] === undefined)
        Object.defineProperty(Object.prototype, "serializeObject", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (...keys: Array<string>): object
            {
                return ObjectExt.serialize(this, ...keys);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Object.prototype["deserializeObject"] === undefined)
        Object.defineProperty(Object.prototype, "deserializeObject", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (targetClassOrObject: Function | object, ...keysOrValues: Array<any>): object
            {
                return ObjectExt.deserialize(this, targetClassOrObject, ...keysOrValues);
            }
        });
}

defineObjectExtProperties();
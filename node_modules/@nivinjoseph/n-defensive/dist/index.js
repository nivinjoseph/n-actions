"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.given = void 0;
require("@nivinjoseph/n-ext");
const n_exception_1 = require("@nivinjoseph/n-exception");
function given(arg, argName) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (argName == null || argName.isEmptyOrWhiteSpace())
        throw new n_exception_1.ArgumentNullException("argName");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new EnsurerInternal(arg, argName.trim());
}
exports.given = given;
class EnsurerInternal {
    constructor(arg, argName) {
        this._arg = arg;
        this._argName = argName;
    }
    ensureHasValue(when) {
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            throw new n_exception_1.ArgumentNullException(this._argName);
        if (typeof this._arg === "string" && this._arg.isEmptyOrWhiteSpace())
            throw new n_exception_1.ArgumentException(this._argName, "string value cannot be empty or whitespace");
        // this._ensureHasValue(this._arg);
        return this;
    }
    ensureIsString(when) {
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof this._arg !== "string")
            throw new n_exception_1.ArgumentException(this._argName, "must be string");
        return this;
    }
    ensureIsNumber(when) {
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof this._arg !== "number")
            throw new n_exception_1.ArgumentException(this._argName, "must be number");
        if (!this._isNumber(this._arg))
            throw new n_exception_1.ArgumentException(this._argName, "must be number");
        return this;
    }
    ensureIsEnum(enumType, when) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (enumType == null || typeof enumType !== "object")
            throw new n_exception_1.InvalidArgumentException("enumType");
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof this._arg !== "number" && typeof this._arg !== "string")
            throw new n_exception_1.ArgumentException(this._argName, "must be a valid enum value");
        const values = this._getEnumValues(enumType);
        if (!values.contains(this._arg))
            throw new n_exception_1.ArgumentException(this._argName, "is not a valid enum value");
        return this;
    }
    ensureIsBoolean(when) {
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof this._arg !== "boolean")
            throw new n_exception_1.ArgumentException(this._argName, "must be boolean");
        return this;
    }
    ensureIsObject(when) {
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof this._arg !== "object")
            throw new n_exception_1.ArgumentException(this._argName, "must be object");
        return this;
    }
    ensureIsFunction(when) {
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof this._arg !== "function")
            throw new n_exception_1.ArgumentException(this._argName, "must be function");
        return this;
    }
    ensureIsArray(when) {
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            return this;
        if (!Array.isArray(this._arg))
            throw new n_exception_1.ArgumentException(this._argName, "must be array");
        return this;
    }
    ensureIsNotEmpty(when) {
        if (!this._canExecute(when))
            return this;
        if (this._arg === null || this._arg === undefined)
            return this;
        if (!Array.isArray(this._arg))
            throw new n_exception_1.ArgumentException(this._argName, "must be array");
        if (this._arg.isEmpty)
            throw new n_exception_1.ArgumentException(this._argName, "must not be empty");
        return this;
    }
    ensureIsType(type, when) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (type === null || type === undefined)
            throw new n_exception_1.ArgumentNullException("type");
        if (!this._canExecute(when))
            return this;
        if (this._arg == null || this._arg === undefined)
            return this;
        const typeName = type.getTypeName();
        if (this._arg.getTypeName() !== typeName)
            throw new n_exception_1.ArgumentException(this._argName, `must be of type ${typeName}`);
        return this;
    }
    ensureIsInstanceOf(type, when) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (type === null || type === undefined)
            throw new n_exception_1.ArgumentNullException("type");
        if (!this._canExecute(when))
            return this;
        if (this._arg == null || this._arg === undefined)
            return this;
        if (!(this._arg instanceof type))
            throw new n_exception_1.ArgumentException(this._argName, `must be instance of ${type.getTypeName()}`);
        return this;
    }
    ensureHasStructure(structure, when) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (structure === null || structure === undefined)
            throw new n_exception_1.ArgumentNullException("structure");
        if (!this._canExecute(when))
            return this;
        if (this._arg == null || this._arg === undefined)
            return this;
        this._ensureHasStructure(this._arg, structure);
        return this;
    }
    ensure(func, reason) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (func === null || func === undefined)
            throw new n_exception_1.ArgumentNullException("func");
        if (this._arg == null || this._arg === undefined)
            return this;
        let result;
        try {
            result = func(this._arg);
        }
        catch (error) {
            throw new n_exception_1.InvalidArgumentException(this._argName, error);
        }
        if (!result) {
            if (this._argName.toLowerCase() === "this")
                throw new n_exception_1.InvalidOperationException(reason != null && reason.isNotEmptyOrWhiteSpace() ? reason.trim() : "current operation on instance");
            throw reason != null && reason.isNotEmptyOrWhiteSpace()
                ? new n_exception_1.ArgumentException(this._argName, reason.trim())
                : new n_exception_1.InvalidArgumentException(this._argName);
        }
        return this;
    }
    ensureWhen(when, func, reason) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (when === null || when === undefined)
            throw new n_exception_1.ArgumentNullException("when");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (func === null || func === undefined)
            throw new n_exception_1.ArgumentNullException("func");
        if (!this._canExecute(when))
            return this;
        if (this._arg == null || this._arg === undefined)
            return this;
        if (!func(this._arg)) {
            if (this._argName.toLowerCase() === "this")
                throw new n_exception_1.InvalidOperationException(reason != null && !reason.isEmptyOrWhiteSpace() ? reason.trim() : "current operation on instance");
            throw reason != null && !reason.isEmptyOrWhiteSpace()
                ? new n_exception_1.ArgumentException(this._argName, reason.trim())
                : new n_exception_1.InvalidArgumentException(this._argName);
        }
        return this;
    }
    _canExecute(when) {
        let canExecute = true;
        if (when != null) {
            if (typeof when === "function")
                canExecute = when();
            else
                canExecute = !!when;
        }
        return canExecute;
    }
    // private _ensureHasValue(value: T): asserts value is NonNullable<T>
    // {
    //     if (value === null || value === undefined)
    //         throw new ArgumentNullException(this._argName);
    //     if (typeof value === "string" && (<string>value).isEmptyOrWhiteSpace())
    //         throw new ArgumentException(this._argName, "string value cannot be empty or whitespace");
    // }
    _ensureHasStructure(arg, schema, parentName) {
        for (const key in schema) {
            const isOptional = key.endsWith("?");
            const name = isOptional ? key.substring(0, key.length - 1) : key;
            if (name.isEmptyOrWhiteSpace())
                throw new n_exception_1.ArgumentException("structure", `invalid key specification '${key}'`);
            const fullName = parentName ? `${parentName}.${name}` : name;
            const typeInfo = schema[key];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (typeInfo === null || typeInfo === undefined)
                throw new n_exception_1.ArgumentException("structure", `null type specification for key '${fullName}'`);
            if (typeof typeInfo !== "string" && typeof typeInfo !== "function" && typeof typeInfo !== "object")
                throw new n_exception_1.ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
            const value = arg[name];
            if (value === null || value === undefined) {
                if (isOptional)
                    continue;
                if (typeInfo === "any")
                    continue;
                throw new n_exception_1.ArgumentException(this._argName, `is missing required property '${fullName}'`);
            }
            if (typeof typeInfo === "string") {
                if (typeInfo.isEmptyOrWhiteSpace())
                    throw new n_exception_1.ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
                const typeName = typeInfo.trim().toLowerCase();
                const types = ["string", "boolean", "number", "function", "array", "object", "any"];
                if (!types.contains(typeName))
                    throw new n_exception_1.ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
                if (typeName === "array") {
                    if (!Array.isArray(value))
                        throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
                    continue;
                }
                if (typeName === "any")
                    continue;
                if (typeof value !== typeName)
                    throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
                continue;
            }
            if (typeof typeInfo === "function") {
                if (!(value instanceof typeInfo))
                    throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${value.getTypeName()}' for property '${fullName}' of type '${typeInfo.getTypeName()}'`);
                continue;
            }
            if (Array.isArray(typeInfo)) {
                if (!Array.isArray(value))
                    throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${typeof value}' for property '${fullName}' of type 'array'`);
                if (typeInfo.isEmpty)
                    continue;
                if (typeInfo.length > 1)
                    throw new n_exception_1.ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
                const arrayTypeInfo = typeInfo[0];
                if (arrayTypeInfo === "any")
                    continue;
                const arrayArg = {};
                const arraySchema = {};
                value.forEach((val, index) => {
                    arrayArg[index.toString()] = val;
                    arraySchema[index.toString()] = arrayTypeInfo;
                });
                this._ensureHasStructure(arrayArg, arraySchema, fullName);
                continue;
            }
            if (typeof typeInfo === "object") {
                if (typeof value !== "object")
                    throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${value.getTypeName()}' for property '${fullName}' of type '{}'`);
                this._ensureHasStructure(value, typeInfo, fullName);
                continue;
            }
            throw new n_exception_1.ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
        }
    }
    // private _getTypeName(typeInfo: any, fullName: string): string
    // {
    //     const types = ["string", "boolean", "number", "object", "array"];
    //     if (typeInfo === null || typeInfo === undefined)
    //         throw new ArgumentException("structure", `null type specification for key '${fullName}'`);
    //     if (typeof typeInfo !== "string" && typeof typeInfo !== "object")
    //         throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
    //     const typeName = typeof typeInfo === "string" ? typeInfo.trim().toLowerCase() : Array.isArray(typeInfo) ? "array" : "object";
    //     if (types.every(t => t !== typeName))
    //         throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
    //     return typeName;
    // }
    // private _ensureHasTypeInternal(typeName: string, typeInfo: any, fullName: string, value: any): void
    // {
    //     if (typeName === "object")
    //     {
    //         if (typeof typeInfo !== "string")
    //         {
    //             this._ensureHasStructure(value, typeInfo, fullName);
    //         }
    //         else
    //         {
    //             if (typeof value !== typeName)
    //                 throw new ArgumentException(this._argName,
    //                     `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
    //         }
    //     }
    //     else if (typeName === "array")
    //     {
    //         if (!Array.isArray(value))
    //             throw new ArgumentException(this._argName,
    //                 `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
    //         if (typeof typeInfo !== "string")
    //         {
    //             const typeInfoArray = typeInfo as Array<any>;
    //             if (typeInfoArray.length > 0)
    //             {
    //                 const arrayTypeInfo = typeInfoArray[0];
    //                 const arrayTypeName = this._getTypeName(arrayTypeInfo, fullName);
    //                 value.forEach(t => this._ensureHasTypeInternal(arrayTypeName, arrayTypeInfo, fullName, t));
    //             }
    //         }
    //     }
    //     else
    //     {
    //         if (typeof value !== typeName)
    //             throw new ArgumentException(this._argName,
    //                 `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
    //     }
    // }
    _isNumber(value) {
        if (value == null)
            return false;
        value = value.toString().trim();
        if (value.length === 0)
            return false;
        const parsed = +value.toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    }
    _getEnumValues(enumType) {
        const keys = Object.keys(enumType);
        if (keys.length === 0)
            return [];
        if (this._isNumber(keys[0]))
            return keys.filter(t => this._isNumber(t)).map(t => +t);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return keys.map(t => enumType[t]);
    }
}
//# sourceMappingURL=index.js.map
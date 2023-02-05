"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialize = exports.serialize = exports.Deserializer = exports.Serializable = void 0;
const n_exception_1 = require("@nivinjoseph/n-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class Serializable {
    constructor(data) {
        (0, n_defensive_1.given)(data, "data").ensureHasValue().ensureIsObject();
    }
    serialize() {
        const typeName = this.getTypeName();
        const propertyInfos = Utilities.getPropertyInfos(this, typeName);
        const serialized = propertyInfos.reduce((acc, propInfo) => {
            const val = this[propInfo.name];
            if (val == null) {
                acc[propInfo.serializationKey] = null;
                return acc;
            }
            if (typeof val === "object") {
                if (Array.isArray(val))
                    acc[propInfo.serializationKey] = val.map((v) => {
                        if (v == null)
                            return null;
                        if (typeof v === "object") {
                            if (v instanceof Serializable)
                                return v.serialize();
                            else
                                return JSON.parse(JSON.stringify(v));
                        }
                        return v;
                    });
                else
                    acc[propInfo.serializationKey] = val instanceof Serializable
                        ? val.serialize() : JSON.parse(JSON.stringify(val));
            }
            else {
                acc[propInfo.serializationKey] = val;
            }
            return acc;
        }, {});
        serialized.$typename = typeName;
        return serialized;
    }
}
exports.Serializable = Serializable;
class Deserializer {
    /**
     * @static
     */
    constructor() { }
    static hasType(typeName) {
        // this is postel's law compliant
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (typeName == null || typeof typeName !== "string" || typeName.isEmptyOrWhiteSpace()
            || !this._typeCache.has(typeName.trim()))
            return false;
        return true;
    }
    static registerType(type) {
        (0, n_defensive_1.given)(type, "type").ensureHasValue();
        const typeName = type.getTypeName();
        if (!this._typeCache.has(typeName))
            this._typeCache.set(typeName, type);
    }
    static deserialize(serialized) {
        (0, n_defensive_1.given)(serialized, "serialized").ensureHasValue().ensureIsObject()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            .ensure(t => t.$typename && typeof t.$typename === "string"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            && !t.$typename.isEmptyOrWhiteSpace(), "$typename property is missing on object");
        const typeName = serialized.$typename;
        let type = Deserializer._getType(typeName);
        if (type == null)
            throw new n_exception_1.ApplicationException(`Cannot deserialize unregistered type '${typeName}'.`);
        if (typeof type === "object")
            type = type.constructor;
        if (type.deserialize && typeof type.deserialize === "function")
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            return type.deserialize(serialized);
        serialized = Object.keys(serialized).reduce((acc, key) => {
            const val = serialized[key];
            if (val == null) {
                acc[key] = null;
                return acc;
            }
            if (typeof val === "object") {
                if (Array.isArray(val)) {
                    acc[key] = val.map((v) => {
                        if (v == null)
                            return null;
                        if (typeof v === "object") {
                            if (v.$typename && typeof v.$typename === "string" && v.$typename.isNotEmptyOrWhiteSpace())
                                return Deserializer.deserialize(v);
                            // else
                            //     return JSON.parse(JSON.stringify(v));
                        }
                        return v;
                    });
                }
                else {
                    if (val.$typename && typeof val.$typename === "string" && val.$typename.isNotEmptyOrWhiteSpace())
                        acc[key] = Deserializer.deserialize(val);
                    else
                        acc[key] = val; // JSON.parse(JSON.stringify(val));
                }
            }
            else {
                acc[key] = val;
            }
            return acc;
        }, {});
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return new type(serialized);
    }
    static _getType(typeName) {
        (0, n_defensive_1.given)(typeName, "typeName").ensureHasValue().ensureIsString();
        typeName = typeName.trim();
        if (this._typeCache.has(typeName))
            return this._typeCache.get(typeName);
        return null;
    }
}
exports.Deserializer = Deserializer;
Deserializer._typeCache = new Map();
function serialize(keyOrTarget, propertyKey, descriptor) {
    if (keyOrTarget != null && typeof keyOrTarget === "object") {
        const target = keyOrTarget;
        (0, n_defensive_1.given)(target, "target").ensureHasValue().ensureIsObject()
            .ensure(t => t instanceof Serializable, "serialize decorator must only be used on properties in subclasses of Serializable");
        Deserializer.registerType(target);
        if (!descriptor.get)
            throw new n_exception_1.ArgumentException(propertyKey, "serialize decorator must only be applied to getters");
        descriptor.get.serializable = true;
    }
    else {
        const key = keyOrTarget;
        (0, n_defensive_1.given)(key, "key").ensureIsString();
        return function (target, propertyKey, descriptor) {
            (0, n_defensive_1.given)(target, "target").ensureHasValue().ensureIsObject()
                .ensure(t => t instanceof Serializable, "serialize decorator must only be used on properties in subclasses of Serializable");
            Deserializer.registerType(target);
            if (!descriptor.get)
                throw new n_exception_1.ArgumentException(propertyKey, "serialize decorator must only be applied to getters");
            descriptor.get.serializable = true;
            if (key != null && key.isNotEmptyOrWhiteSpace())
                descriptor.get.serializationKey = key.trim();
        };
    }
}
exports.serialize = serialize;
function deserialize(target) {
    (0, n_defensive_1.given)(target, "target").ensureHasValue().ensureIsFunction();
    Deserializer.registerType(target);
}
exports.deserialize = deserialize;
class Utilities {
    static getPropertyInfos(val, typeName) {
        (0, n_defensive_1.given)(val, "val").ensureHasValue().ensureIsObject();
        (0, n_defensive_1.given)(typeName, "typeName").ensureHasValue().ensureIsString();
        if (!Utilities._typeCache.has(typeName))
            Utilities._typeCache.set(typeName, Utilities._getPropertyInfosInternal(val));
        return Utilities._typeCache.get(typeName);
    }
    static _getPropertyInfosInternal(val) {
        var _a;
        const propertyInfos = new Array();
        const prototype = Object.getPrototypeOf(val);
        if (prototype === undefined || prototype === null) // we are dealing with Object
            return propertyInfos;
        propertyInfos.push(...Utilities._getPropertyInfosInternal(prototype));
        const propertyNames = Object.getOwnPropertyNames(val);
        for (let name of propertyNames) {
            name = name.trim();
            if (name === "constructor" || name.startsWith("_") || name.startsWith("$") || Utilities._internal.some(t => t === name))
                continue;
            if (Utilities._forbidden.some(t => t === name))
                throw new n_exception_1.ApplicationException(`Class ${val.getTypeName()} has a member with the forbidden name '${name}'. The following names are forbidden: ${Utilities._forbidden}.`);
            const descriptor = Object.getOwnPropertyDescriptor(val, name);
            if (descriptor.get && descriptor.get.serializable) {
                propertyInfos.push({
                    name,
                    descriptor: descriptor,
                    serializationKey: (_a = descriptor.get.serializationKey) !== null && _a !== void 0 ? _a : name
                });
            }
        }
        return propertyInfos;
    }
}
Utilities._typeCache = new Map();
Utilities._internal = [];
Utilities._forbidden = ["do", "if", "for", "let", "new", "try", "var", "case", "else", "with", "await", "break",
    "catch", "class", "const", "super", "throw", "while", "yield", "delete", "export", "import", "return",
    "switch", "default", "extends", "finally", "continue", "debugger", "function", "arguments", "typeof", "void"];
//# sourceMappingURL=serializable.js.map
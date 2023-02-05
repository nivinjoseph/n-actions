"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoFactory = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const serializable_1 = require("./serializable");
class DtoFactory {
    /**
     * @static
     */
    constructor() { }
    static create(value, keys) {
        var _a;
        (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsObject();
        (0, n_defensive_1.given)(keys, "keys").ensureHasValue().ensureIsArray();
        const typename = (_a = value.$typename) !== null && _a !== void 0 ? _a : value.getTypeName();
        let dto;
        if (value instanceof serializable_1.Serializable) {
            const serialized = value.serialize();
            dto = keys.reduce((acc, k) => {
                if (typeof k === "object") {
                    Object.keys(k).forEach((alias) => {
                        const key = k[alias];
                        if (typeof key === "function")
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                            acc[alias] = key(value);
                        else
                            acc[alias] = serialized[key];
                        if (acc[alias] == null)
                            acc[alias] = null;
                    });
                }
                else {
                    acc[k] = serialized[k];
                    if (acc[k] == null)
                        acc[k] = null;
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return acc;
            }, {});
        }
        else {
            dto = keys.reduce((acc, k) => {
                if (typeof k === "object") {
                    Object.keys(k).forEach((alias) => {
                        const key = k[alias];
                        if (typeof key === "function")
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                            acc[alias] = key(value);
                        else
                            acc[alias] = value[key];
                        if (acc[alias] == null)
                            acc[alias] = null;
                    });
                }
                else {
                    let val = value[k];
                    if (typeof val === "function")
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return acc;
                    if (val instanceof serializable_1.Serializable)
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
        return dto;
    }
}
exports.DtoFactory = DtoFactory;
//# sourceMappingURL=dto-factory.js.map
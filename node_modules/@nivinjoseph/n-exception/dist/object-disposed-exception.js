"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectDisposedException = void 0;
const exception_1 = require("./exception");
class ObjectDisposedException extends exception_1.Exception {
    constructor(disposed) {
        const type = typeof disposed === "string" ? disposed : disposed.getTypeName();
        super(`Object of type '${type ? type : "UNKNOWN"}' has been disposed.`);
    }
}
exports.ObjectDisposedException = ObjectDisposedException;
//# sourceMappingURL=object-disposed-exception.js.map
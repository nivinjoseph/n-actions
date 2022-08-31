"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedException = void 0;
const exception_1 = require("./exception");
class NotImplementedException extends exception_1.Exception {
    constructor() {
        super("Not implemented.");
    }
}
exports.NotImplementedException = NotImplementedException;
//# sourceMappingURL=not-implemented-exception.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidArgumentException = void 0;
const argument_exception_1 = require("./argument-exception");
class InvalidArgumentException extends argument_exception_1.ArgumentException {
    constructor(argName, innerException) {
        super(argName, "is invalid", innerException);
    }
}
exports.InvalidArgumentException = InvalidArgumentException;
//# sourceMappingURL=invalid-argument-exception.js.map
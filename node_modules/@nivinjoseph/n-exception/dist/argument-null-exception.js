"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentNullException = void 0;
const argument_exception_1 = require("./argument-exception");
class ArgumentNullException extends argument_exception_1.ArgumentException {
    constructor(argName, innerException) {
        super(argName, "is NULL", innerException);
    }
}
exports.ArgumentNullException = ArgumentNullException;
//# sourceMappingURL=argument-null-exception.js.map
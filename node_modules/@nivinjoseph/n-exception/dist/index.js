"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectDisposedException = exports.NotImplementedException = exports.InvalidOperationException = exports.InvalidArgumentException = exports.ArgumentNullException = exports.ArgumentException = exports.ApplicationException = exports.Exception = void 0;
require("@nivinjoseph/n-ext");
const exception_1 = require("./exception");
Object.defineProperty(exports, "Exception", { enumerable: true, get: function () { return exception_1.Exception; } });
const application_exception_1 = require("./application-exception");
Object.defineProperty(exports, "ApplicationException", { enumerable: true, get: function () { return application_exception_1.ApplicationException; } });
const argument_exception_1 = require("./argument-exception");
Object.defineProperty(exports, "ArgumentException", { enumerable: true, get: function () { return argument_exception_1.ArgumentException; } });
const argument_null_exception_1 = require("./argument-null-exception");
Object.defineProperty(exports, "ArgumentNullException", { enumerable: true, get: function () { return argument_null_exception_1.ArgumentNullException; } });
const invalid_argument_exception_1 = require("./invalid-argument-exception");
Object.defineProperty(exports, "InvalidArgumentException", { enumerable: true, get: function () { return invalid_argument_exception_1.InvalidArgumentException; } });
const invalid_operation_exception_1 = require("./invalid-operation-exception");
Object.defineProperty(exports, "InvalidOperationException", { enumerable: true, get: function () { return invalid_operation_exception_1.InvalidOperationException; } });
const not_implemented_exception_1 = require("./not-implemented-exception");
Object.defineProperty(exports, "NotImplementedException", { enumerable: true, get: function () { return not_implemented_exception_1.NotImplementedException; } });
const object_disposed_exception_1 = require("./object-disposed-exception");
Object.defineProperty(exports, "ObjectDisposedException", { enumerable: true, get: function () { return object_disposed_exception_1.ObjectDisposedException; } });
Error.prototype.toString = function () {
    var _a;
    const obj = Object(this);
    if (obj !== this)
        throw new TypeError();
    let log = (_a = this.stack) !== null && _a !== void 0 ? _a : "No stack trace";
    if (this.innerException)
        log = log + "\n" + "Inner Exception --> " + this.innerException.toString();
    return log;
};
//# sourceMappingURL=index.js.map
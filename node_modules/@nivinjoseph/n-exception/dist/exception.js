"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    constructor(message, innerException) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (message == null || message.isEmptyOrWhiteSpace())
            message = "<none>";
        super(message);
        this.message = message;
        this._name = this.getTypeName();
        this._innerException = innerException !== null && innerException !== void 0 ? innerException : null;
        // if ((<any>message) instanceof Error)
        // {
        //     let err = (<any>message) as Error;
        //     this._message = err.message;
        //     this._stack = err.stack;
        // }
        // else
        // {
        //     if (message == null || message.isEmptyOrWhiteSpace())
        //         message = "<none>";
        //     this._message = message;
        //     this._stack = this.generateStackTrace();
        //     this._innerException = innerException ? innerException : null;
        // }
    }
    get name() { return this._name; }
    // public get message(): string { return this._message; }
    // public get stack(): string { return this._stack; }
    get innerException() { return this._innerException; }
}
exports.Exception = Exception;
//# sourceMappingURL=exception.js.map
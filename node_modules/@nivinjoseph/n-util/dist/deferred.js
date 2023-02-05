"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
class Deferred {
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    get promise() { return this._promise; }
    resolve(value) {
        this._resolve(value);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    reject(reason) {
        this._reject(reason);
    }
}
exports.Deferred = Deferred;
//# sourceMappingURL=deferred.js.map
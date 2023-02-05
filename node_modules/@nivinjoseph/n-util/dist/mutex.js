"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutex = void 0;
const deferred_1 = require("./deferred");
class Mutex {
    constructor() {
        this._deferreds = new Array();
        this._currentDeferred = null;
    }
    lock() {
        const deferred = new deferred_1.Deferred();
        this._deferreds.push(deferred);
        if (this._deferreds.length === 1) {
            this._currentDeferred = deferred;
            this._currentDeferred.resolve();
        }
        return deferred.promise;
    }
    release() {
        if (this._currentDeferred == null)
            return;
        this._deferreds.remove(this._currentDeferred);
        this._currentDeferred = this._deferreds[0] || null;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this._currentDeferred != null)
            this._currentDeferred.resolve();
    }
}
exports.Mutex = Mutex;
//# sourceMappingURL=mutex.js.map
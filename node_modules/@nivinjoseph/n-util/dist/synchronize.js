"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.synchronize = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/return-await */
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const delay_1 = require("./delay");
const duration_1 = require("./duration");
const mutex_1 = require("./mutex");
function synchronize(delayOrTarget, propertyKey, descriptor) {
    (0, n_defensive_1.given)(delayOrTarget, "delayOrTarget").ensureHasValue().ensureIsObject();
    if (delayOrTarget instanceof duration_1.Duration) {
        const delayMs = delayOrTarget.toMilliSeconds();
        return function (target, propertyKey, descriptor) {
            (0, n_defensive_1.given)(target, "target").ensureHasValue().ensureIsObject();
            (0, n_defensive_1.given)(propertyKey, "propertyKey").ensureHasValue().ensureIsString();
            (0, n_defensive_1.given)(descriptor, "descriptor").ensureHasValue().ensureIsObject();
            const original = descriptor.value;
            const mutexKey = Symbol.for(`__$_${propertyKey}_synchronizeMutex`);
            descriptor.value = function (...params) {
                var _a;
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const mutex = (_a = this[mutexKey]) !== null && _a !== void 0 ? _a : new mutex_1.Mutex();
                    this[mutexKey] = mutex;
                    yield mutex.lock();
                    try {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return yield original.call(this, ...params);
                    }
                    finally {
                        yield delay_1.Delay.milliseconds(delayMs);
                        mutex.release();
                    }
                });
            };
        };
    }
    else {
        (0, n_defensive_1.given)(propertyKey, "propertyKey").ensureHasValue().ensureIsString();
        (0, n_defensive_1.given)(descriptor, "descriptor").ensureHasValue().ensureIsObject();
        const original = descriptor.value;
        const mutexKey = Symbol.for(`__$_${propertyKey}_synchronizeMutex`);
        descriptor.value = function (...params) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const mutex = (_a = this[mutexKey]) !== null && _a !== void 0 ? _a : new mutex_1.Mutex();
                this[mutexKey] = mutex;
                yield mutex.lock();
                try {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return yield original.call(this, ...params);
                }
                finally {
                    mutex.release();
                }
            });
        };
    }
}
exports.synchronize = synchronize;
//# sourceMappingURL=synchronize.js.map
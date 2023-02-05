"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
const tslib_1 = require("tslib");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
class Delay // static class
 {
    static hours(value, canceller) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsNumber().ensure(t => t >= 0, "value has to be 0 or greater");
            yield Delay.minutes(value * 60, canceller);
        });
    }
    static minutes(value, canceller) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsNumber().ensure(t => t >= 0, "value has to be 0 or greater");
            yield Delay.seconds(value * 60, canceller);
        });
    }
    static seconds(value, canceller) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsNumber().ensure(t => t >= 0, "value has to be 0 or greater");
            yield Delay.milliseconds(value * 1000, canceller);
        });
    }
    static milliseconds(value, canceller) {
        return new Promise((resolve, reject) => {
            try {
                (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsNumber().ensure(t => t >= 0, "value has to be 0 or greater");
                (0, n_defensive_1.given)(canceller, "canceller").ensureIsObject();
                const timer = setTimeout(() => resolve(), value);
                if (canceller)
                    canceller.cancel = () => {
                        clearTimeout(timer);
                        resolve();
                    };
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Delay = Delay;
//# sourceMappingURL=delay.js.map
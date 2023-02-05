"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class Duration {
    constructor(ms) {
        (0, n_defensive_1.given)(ms, "ms").ensureHasValue().ensureIsNumber().ensure(t => t >= 0);
        this._ms = ms;
    }
    static fromMilliSeconds(milliSeconds) {
        return new Duration(milliSeconds);
    }
    static fromSeconds(seconds) {
        (0, n_defensive_1.given)(seconds, "seconds").ensureHasValue().ensureIsNumber();
        return this.fromMilliSeconds(seconds * 1000);
    }
    static fromMinutes(minutes) {
        (0, n_defensive_1.given)(minutes, "minutes").ensureHasValue().ensureIsNumber();
        return this.fromSeconds(minutes * 60);
    }
    static fromHours(hours) {
        (0, n_defensive_1.given)(hours, "hours").ensureHasValue().ensureIsNumber();
        return this.fromMinutes(hours * 60);
    }
    static fromDays(days) {
        (0, n_defensive_1.given)(days, "days").ensureHasValue().ensureIsNumber();
        return this.fromHours(days * 24);
    }
    static fromWeeks(weeks) {
        (0, n_defensive_1.given)(weeks, "weeks").ensureHasValue().ensureIsNumber();
        return this.fromDays(weeks * 7);
    }
    toMilliSeconds(round = false) {
        const result = this._ms;
        return round ? Math.round(result) : result;
    }
    toSeconds(round = false) {
        const result = this.toMilliSeconds() / 1000;
        return round ? Math.round(result) : result;
    }
    toMinutes(round = false) {
        const result = this.toSeconds() / 60;
        return round ? Math.round(result) : result;
    }
    toHours(round = false) {
        const result = this.toMinutes() / 60;
        return round ? Math.round(result) : result;
    }
    toDays(round = false) {
        const result = this.toHours() / 24;
        return round ? Math.round(result) : result;
    }
    toWeeks(round = false) {
        const result = this.toDays() / 7;
        return round ? Math.round(result) : result;
    }
}
exports.Duration = Duration;
//# sourceMappingURL=duration.js.map
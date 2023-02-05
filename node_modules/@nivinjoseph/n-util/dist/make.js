"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Make = void 0;
const tslib_1 = require("tslib");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
class Make // static class
 {
    constructor() { }
    static retry(func, numberOfRetries, errorPredicate) {
        (0, n_defensive_1.given)(func, "func").ensureHasValue().ensureIsFunction();
        (0, n_defensive_1.given)(numberOfRetries, "numberOfRetries").ensureHasValue().ensureIsNumber().ensure(t => t > 0);
        (0, n_defensive_1.given)(errorPredicate, "errorPredicate").ensureIsFunction();
        const numberOfAttempts = numberOfRetries + 1;
        const result = function (...p) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                let successful = false;
                let attempts = 0;
                let funcResult;
                let error;
                while (successful === false && attempts < numberOfAttempts) {
                    attempts++;
                    try {
                        funcResult = yield func(...p);
                        successful = true;
                    }
                    catch (err) {
                        error = err;
                        if (errorPredicate && !errorPredicate(error))
                            break;
                    }
                }
                if (successful)
                    return funcResult;
                throw error;
            });
        };
        return result;
    }
    static retryWithDelay(func, numberOfRetries, delayMS, errorPredicate) {
        (0, n_defensive_1.given)(func, "func").ensureHasValue().ensureIsFunction();
        (0, n_defensive_1.given)(numberOfRetries, "numberOfRetries").ensureHasValue().ensureIsNumber().ensure(t => t > 0);
        (0, n_defensive_1.given)(errorPredicate, "errorPredicate").ensureIsFunction();
        const numberOfAttempts = numberOfRetries + 1;
        const result = function (...p) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                let successful = false;
                let attempts = 0;
                let funcResult;
                let error;
                const executeWithDelay = (delay) => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            func(...p)
                                .then(t => resolve(t))
                                .catch(err => reject(err));
                        }, delay);
                    });
                };
                while (successful === false && attempts < numberOfAttempts) {
                    attempts++;
                    try {
                        funcResult = yield executeWithDelay(attempts === 1 ? 0 : delayMS);
                        successful = true;
                    }
                    catch (err) {
                        error = err;
                        if (errorPredicate && !errorPredicate(error))
                            break;
                    }
                }
                if (successful)
                    return funcResult;
                throw error;
            });
        };
        return result;
    }
    static retryWithExponentialBackoff(func, numberOfRetries, errorPredicate) {
        (0, n_defensive_1.given)(func, "func").ensureHasValue().ensureIsFunction();
        (0, n_defensive_1.given)(numberOfRetries, "numberOfRetries").ensureHasValue().ensureIsNumber().ensure(t => t > 0);
        (0, n_defensive_1.given)(errorPredicate, "errorPredicate").ensureIsFunction();
        const numberOfAttempts = numberOfRetries + 1;
        const result = function (...p) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                let successful = false;
                let attempts = 0;
                let delayMS = 0;
                let funcResult;
                let error;
                const executeWithDelay = (delay) => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            func(...p)
                                .then(t => resolve(t))
                                .catch(err => reject(err));
                        }, delay);
                    });
                };
                while (successful === false && attempts < numberOfAttempts) {
                    attempts++;
                    try {
                        funcResult = yield executeWithDelay(delayMS);
                        successful = true;
                    }
                    catch (err) {
                        error = err;
                        if (errorPredicate && !errorPredicate(error))
                            break;
                        // delayMS = (delayMS + Make.getRandomInt(200, 500)) * attempts;
                        delayMS = delayMS + (Make.randomInt(400, 700) * attempts);
                        // delayMS = 1000 * attempts;
                    }
                }
                if (successful)
                    return funcResult;
                throw error;
            });
        };
        return result;
    }
    static syncToAsync(func) {
        (0, n_defensive_1.given)(func, "func").ensureHasValue().ensureIsFunction();
        const result = function (...p) {
            try {
                const val = func(...p);
                return Promise.resolve(val);
            }
            catch (error) {
                return Promise.reject(error);
            }
        };
        return result;
    }
    static callbackToPromise(func) {
        (0, n_defensive_1.given)(func, "func").ensureHasValue().ensureIsFunction();
        const result = function (...p) {
            const promise = new Promise((resolve, reject) => func(...p, (err, ...values) => err
                ? reject(err)
                : values.length === 0
                    ? resolve(undefined)
                    : values.length === 1
                        ? resolve(values[0])
                        : resolve(values)));
            return promise;
        };
        return result;
    }
    static loop(func, numberOfTimes) {
        (0, n_defensive_1.given)(func, "func").ensureHasValue().ensureIsFunction();
        (0, n_defensive_1.given)(numberOfTimes, "numberOfTimes").ensureHasValue().ensureIsNumber().ensure(t => t > 0);
        for (let i = 0; i < numberOfTimes; i++)
            func(i);
    }
    static loopAsync(asyncFunc, numberOfTimes, degreesOfParallelism) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, n_defensive_1.given)(asyncFunc, "asyncFunc").ensureHasValue().ensureIsFunction();
            (0, n_defensive_1.given)(numberOfTimes, "numberOfTimes").ensureHasValue().ensureIsNumber().ensure(t => t > 0);
            const taskManager = new TaskManager(numberOfTimes, asyncFunc, degreesOfParallelism !== null && degreesOfParallelism !== void 0 ? degreesOfParallelism : null, false);
            yield taskManager.execute();
        });
    }
    static errorSuppressed(func, defaultValue = null) {
        (0, n_defensive_1.given)(func, "func").ensureHasValue().ensureIsFunction();
        const result = function (...p) {
            try {
                return func(...p);
            }
            catch (e) {
                console.error(e);
                return defaultValue;
            }
        };
        return result;
    }
    static errorSuppressedAsync(asyncFunc, defaultValue = null) {
        (0, n_defensive_1.given)(asyncFunc, "asyncFunc").ensureHasValue().ensureIsFunction();
        const result = function (...p) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    return yield asyncFunc(...p);
                }
                catch (e) {
                    console.error(e);
                    return defaultValue;
                }
            });
        };
        return result;
    }
    /**
     *
     * @param min inclusive
     * @param max exclusive
     */
    static randomInt(min, max) {
        (0, n_defensive_1.given)(min, "min").ensureHasValue().ensureIsNumber();
        (0, n_defensive_1.given)(max, "max").ensureHasValue().ensureIsNumber()
            .ensure(t => t > min, "value has to be greater than min");
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
    }
    static randomCode(numChars) {
        (0, n_defensive_1.given)(numChars, "numChars").ensureHasValue().ensureIsNumber()
            .ensure(t => t > 0, "value has to be greater than 0");
        // let allowedChars = "0123456789-abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ~".split("");
        let allowedChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const shuffleTimes = Make.randomInt(1, 10);
        const shuffleAmount = Make.randomInt(7, 17);
        Make.loop(() => allowedChars = [...allowedChars.skip(shuffleAmount), ...allowedChars.take(shuffleAmount)], shuffleTimes);
        if ((Date.now() % 2) === 0)
            allowedChars = allowedChars.reverse();
        const result = [];
        Make.loop(() => {
            const random = Make.randomInt(0, allowedChars.length);
            result.push(allowedChars[random]);
        }, numChars);
        return result.join("");
    }
    static randomTextCode(numChars, caseInsensitive = false) {
        (0, n_defensive_1.given)(numChars, "numChars").ensureHasValue().ensureIsNumber()
            .ensure(t => t > 0, "value has to be greater than 0");
        (0, n_defensive_1.given)(caseInsensitive, "caseInsensitive").ensureHasValue().ensureIsBoolean();
        let allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        if (caseInsensitive)
            allowedChars = "abcdefghijklmnopqrstuvwxyz".split("");
        const shuffleTimes = Make.randomInt(1, 10);
        const shuffleAmount = Make.randomInt(7, 11);
        Make.loop(() => allowedChars = [...allowedChars.skip(shuffleAmount), ...allowedChars.take(shuffleAmount)], shuffleTimes);
        if ((Date.now() % 2) === 0)
            allowedChars = allowedChars.reverse();
        const result = [];
        Make.loop(() => {
            const random = Make.randomInt(0, allowedChars.length);
            result.push(allowedChars[random]);
        }, numChars);
        return result.join("");
    }
    static randomNumericCode(numChars) {
        (0, n_defensive_1.given)(numChars, "numChars").ensureHasValue().ensureIsNumber()
            .ensure(t => t > 0, "value has to be greater than 0");
        let allowedChars = "0123456789".split("");
        const shuffleTimes = Make.randomInt(1, 10);
        const shuffleAmount = Make.randomInt(3, 7);
        Make.loop(() => allowedChars = [...allowedChars.skip(shuffleAmount), ...allowedChars.take(shuffleAmount)], shuffleTimes);
        if ((Date.now() % 2) === 0)
            allowedChars = allowedChars.reverse();
        const result = [];
        Make.loop(() => {
            const random = Make.randomInt(0, allowedChars.length);
            result.push(allowedChars[random]);
        }, numChars);
        return result.join("");
    }
}
exports.Make = Make;
class TaskManager {
    constructor(numberOfTimes, taskFunc, taskCount, captureResults) {
        this._results = [];
        this._numberOfTimes = numberOfTimes;
        this._taskFunc = taskFunc;
        this._taskCount = !taskCount || taskCount <= 0 ? numberOfTimes : taskCount;
        this._captureResults = captureResults;
        this._tasks = [];
        for (let i = 0; i < this._taskCount; i++)
            this._tasks.push(new Task(this, i, this._taskFunc, captureResults));
        if (this._captureResults)
            this._results = [];
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._numberOfTimes; i++) {
                if (this._captureResults)
                    this._results.push(null);
                yield this._executeTaskForItem(i);
            }
            yield this._finish();
        });
    }
    addResult(itemIndex, result) {
        this._results[itemIndex] = result;
    }
    getResults() {
        return this._results;
    }
    _executeTaskForItem(itemIndex) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let availableTask = this._tasks.find(t => t.isFree);
            if (!availableTask) {
                const task = yield Promise.race(this._tasks.map(t => t.promise));
                task.free();
                availableTask = task;
            }
            availableTask.execute(itemIndex);
        });
    }
    _finish() {
        return Promise.all(this._tasks.filter(t => !t.isFree).map(t => t.promise));
    }
}
class Task {
    constructor(manager, id, taskFunc, captureResult) {
        this._manager = manager;
        this._id = id;
        this._taskFunc = taskFunc;
        this._captureResult = captureResult;
        this._promise = null;
    }
    get promise() { return this._promise; }
    get isFree() { return this._promise == null; }
    execute(itemIndex) {
        this._promise = new Promise((resolve, reject) => {
            this._taskFunc(itemIndex)
                .then((result) => {
                if (this._captureResult)
                    this._manager.addResult(itemIndex, result);
                resolve(this);
            })
                .catch((err) => reject(err));
        });
    }
    free() {
        this._promise = null;
    }
}
//# sourceMappingURL=make.js.map
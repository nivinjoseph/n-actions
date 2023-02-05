"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundProcessor = void 0;
const tslib_1 = require("tslib");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const delay_1 = require("./delay");
const n_exception_1 = require("@nivinjoseph/n-exception");
// public
class BackgroundProcessor {
    constructor(defaultErrorHandler, breakIntervalMilliseconds = 1000, breakOnlyWhenNoWork = true) {
        this._actionsToProcess = new Array();
        this._actionsExecuting = new Array();
        this._isDisposed = false;
        this._timeout = null;
        (0, n_defensive_1.given)(defaultErrorHandler, "defaultErrorHandler").ensureHasValue().ensureIsFunction();
        (0, n_defensive_1.given)(breakIntervalMilliseconds, "breakIntervalMilliseconds").ensureHasValue().ensureIsNumber().ensure(t => t >= 0);
        (0, n_defensive_1.given)(breakOnlyWhenNoWork, "breakOnlyWhenNoWork").ensureHasValue().ensureIsBoolean();
        this._defaultErrorHandler = defaultErrorHandler;
        this._breakIntervalMilliseconds = breakIntervalMilliseconds || 0;
        this._breakOnlyWhenNoWork = breakOnlyWhenNoWork;
        this._initiateBackgroundProcessing();
    }
    get queueLength() { return this._actionsToProcess.length; }
    processAction(action, errorHandler) {
        if (this._isDisposed)
            throw new n_exception_1.ObjectDisposedException(this);
        (0, n_defensive_1.given)(action, "action").ensureHasValue().ensureIsFunction();
        (0, n_defensive_1.given)(errorHandler, "errorHandler").ensureIsFunction();
        this._actionsToProcess.push(new Action(action, errorHandler || this._defaultErrorHandler));
    }
    dispose(killQueue = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this._isDisposed)
                return;
            this._isDisposed = true;
            if (this._timeout)
                clearTimeout(this._timeout);
            if (!killQueue) {
                while (this._actionsToProcess.length > 0) {
                    const action = this._actionsToProcess.shift();
                    this._actionsExecuting.push(action);
                    action.execute(() => this._actionsExecuting.remove(action));
                }
            }
            while (this._actionsExecuting.length > 0)
                yield delay_1.Delay.seconds(3);
        });
    }
    _initiateBackgroundProcessing() {
        if (this._isDisposed)
            return;
        let timeout = this._breakIntervalMilliseconds;
        if (this._breakOnlyWhenNoWork && this._actionsToProcess.length > 0)
            timeout = 0;
        this._timeout = setTimeout(() => {
            if (this._actionsToProcess.length > 0) {
                const action = this._actionsToProcess.shift();
                this._actionsExecuting.push(action);
                action.execute(() => {
                    this._actionsExecuting.remove(action);
                    this._initiateBackgroundProcessing();
                });
            }
            else {
                this._initiateBackgroundProcessing();
            }
        }, timeout);
    }
}
exports.BackgroundProcessor = BackgroundProcessor;
class Action {
    constructor(action, errorHandler) {
        (0, n_defensive_1.given)(action, "action").ensureHasValue().ensureIsFunction();
        (0, n_defensive_1.given)(errorHandler, "errorHandler").ensureHasValue().ensureIsFunction();
        this._action = action;
        this._errorHandler = errorHandler;
    }
    execute(postExecuteCallback) {
        (0, n_defensive_1.given)(postExecuteCallback, "postExecuteCallback").ensureHasValue().ensureIsFunction();
        try {
            this._action()
                .then(() => {
                postExecuteCallback();
            })
                .catch((error) => {
                try {
                    this._errorHandler(error)
                        .then(() => postExecuteCallback())
                        .catch((error) => {
                        console.error(error);
                        postExecuteCallback();
                    });
                }
                catch (error) {
                    console.error(error);
                    postExecuteCallback();
                }
            });
        }
        catch (error) {
            try {
                this._errorHandler(error)
                    .then(() => postExecuteCallback())
                    .catch((error) => {
                    console.error(error);
                    postExecuteCallback();
                });
            }
            catch (error) {
                console.error(error);
                postExecuteCallback();
            }
        }
    }
}
//# sourceMappingURL=background-processor.js.map
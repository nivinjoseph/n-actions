"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observer = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const uuid_1 = require("./uuid");
class Observer {
    constructor(event) {
        this._subMap = new Map();
        (0, n_defensive_1.given)(event, "event").ensureHasValue().ensureIsString();
        this._event = event.trim();
    }
    get event() { return this._event; }
    get hasSubscriptions() { return this._subMap.size > 0; }
    subscribe(callback) {
        (0, n_defensive_1.given)(callback, "callback").ensureHasValue().ensureIsFunction();
        const key = uuid_1.Uuid.create();
        const subscription = {
            event: this._event,
            isUnsubscribed: false,
            unsubscribe: () => this._cancel(key)
        };
        this._subMap.set(key, {
            subscription,
            callback
        });
        return subscription;
    }
    notify(eventData) {
        // no defensive check cuz eventData can be void
        if (!this.hasSubscriptions)
            return;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (process && process.nextTick) {
            for (const entry of this._subMap.values()) {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                process.nextTick(entry.callback, eventData);
            }
        }
        else {
            for (const entry of this._subMap.values()) {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                setTimeout(entry.callback, 0, eventData);
            }
        }
    }
    cancel() {
        for (const key of this._subMap.keys())
            this._cancel(key);
    }
    _cancel(key) {
        const subInfo = this._subMap.get(key);
        if (subInfo == null)
            return;
        // @ts-expect-error: deliberately setting readonly property
        subInfo.subscription.isUnsubscribed = true;
        subInfo.subscription.unsubscribe = () => { };
        this._subMap.delete(key);
    }
}
exports.Observer = Observer;
//# sourceMappingURL=observer.js.map
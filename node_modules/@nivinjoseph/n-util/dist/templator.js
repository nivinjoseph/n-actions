"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templator = void 0;
const Mustache = require("mustache");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class Templator {
    constructor(template) {
        (0, n_defensive_1.given)(template, "template").ensureHasValue().ensureIsString();
        this._template = template;
        const tokens = Mustache.parse(this._template);
        this._tokens = tokens.filter(t => t[0] === "name").map(t => t[1]);
    }
    get template() { return this._template; }
    get tokens() { return this._tokens; }
    render(data) {
        (0, n_defensive_1.given)(data, "data").ensureHasValue().ensureIsObject();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Mustache.render(this._template, data, null, { escape: (t) => t });
    }
}
exports.Templator = Templator;
//# sourceMappingURL=templator.js.map
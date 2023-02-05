"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlSanitizer = void 0;
const SanitizeHtml = require("sanitize-html");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class HtmlSanitizer {
    /**
     * @static
     */
    constructor() { }
    static sanitize(html) {
        (0, n_defensive_1.given)(html, "html").ensureHasValue().ensureIsString();
        const sanitized = SanitizeHtml(html, this._createOptions());
        return sanitized;
    }
    static _createOptions() {
        return {
            allowedTags: SanitizeHtml.defaults.allowedTags.concat(["img"]),
            allowedAttributes: Object.assign(SanitizeHtml.defaults.allowedAttributes, {
                "*": ["style", "class"]
            }),
            allowedSchemesByTag: {
                "img": ["http", "https", "data"]
            }
        };
    }
}
exports.HtmlSanitizer = HtmlSanitizer;
//# sourceMappingURL=html-sanitizer.js.map
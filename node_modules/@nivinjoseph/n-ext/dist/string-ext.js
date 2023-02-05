"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
class StringExt {
    static isEmptyOrWhiteSpace(value) {
        return value.trim().length === 0;
    }
    static contains(primary, search) {
        // return primary.indexOf(sub) !== -1;
        return primary.includes(search);
    }
    // public static startsWith(primary: string, sub: string): boolean
    // {
    //     return primary.indexOf(sub) === 0;
    // }
    // public static endsWith(primary: string, sub: string): boolean
    // {
    //     let index = primary.lastIndexOf(sub);
    //     if (index === -1) return false;
    //     return (index + sub.length) === primary.length;
    // }
    static extractNumbers(value) {
        return value.replace(/[^0-9]/g, "");
    }
    static extractCharacters(value) {
        return value.replace(/[^a-zA-Z ]/g, "");
    }
    static format(formatString, ...params) {
        var _a, _b;
        let result = formatString.toString();
        if (params.length === 0)
            return result;
        for (let i = 0; i < params.length; i++) {
            const searchValue = "{" + i.toString() + "}";
            const replaceValue = (_b = (_a = params[i]) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "NULL";
            // result = StringExt.replaceAll(result, searchValue, replaceValue);
            result = result.replaceAll(searchValue, replaceValue);
        }
        return result;
    }
    // public static replaceAll(primary: string, searchValue: string, replaceValue: string): string
    // {
    //     // let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    //     // let result = primary.replace(matchOperatorsRe, "\\$&");
    //     // let searchRe = new RegExp(searchValue, ignoreCase ? "gi" : "g");
    //     // return result.replace(searchRe, replaceValue);
    //     if (replaceValue.includes(searchValue))
    //         throw new Error("replaceValue cannot include searchValue [infinite loop possibility]");
    //     while (primary.includes(searchValue))
    //         primary = primary.replace(searchValue, replaceValue);
    //     return primary;
    // }
    static base64Encode(value) {
        return buffer_1.Buffer.from(value, "utf8").toString("base64");
    }
    static base64Decode(value) {
        return buffer_1.Buffer.from(value, "base64").toString("utf8");
    }
    static base64UrlEncode(value) {
        return buffer_1.Buffer.from(value, "utf8").toString("base64")
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }
    static base64UrlDecode(value) {
        value = StringExt._padString(value)
            // eslint-disable-next-line no-useless-escape
            .replace(/\-/g, "+")
            .replace(/_/g, "/");
        return buffer_1.Buffer.from(value, "base64").toString("utf8");
    }
    static hexEncode(value) {
        return buffer_1.Buffer.from(value, "utf8").toString("hex");
    }
    static hexDecode(value) {
        return buffer_1.Buffer.from(value, "hex").toString("utf8");
    }
    static matchesFormat(primary, format) {
        if (format === SystemFormatSymbol.wildcard)
            return true;
        const allSystemFormatSymbols = Object.entries(SystemFormatSymbol).map(t => t[1]);
        const formatTokens = new Array();
        let index = 0;
        while (index < format.length) {
            const char = format.charAt(index);
            if (char === SystemFormatSymbol.escape) {
                const nextChar = format.charAt(index + 1);
                if (allSystemFormatSymbols.includes(nextChar)) {
                    formatTokens.push(`${SystemFormatSymbol.escape}${nextChar}`);
                    index += 2;
                    continue;
                }
            }
            formatTokens.push(char);
            index++;
        }
        if (formatTokens.filter(t => t === SystemFormatSymbol.wildcard).length > 1)
            throw new Error("Invalid format, only 1 wildcard allowed");
        return StringExt._stringMatchesFormatTokens(primary, formatTokens);
    }
    static _stringMatchesFormatTokens(primary, formatTokens) {
        if (formatTokens.includes(SystemFormatSymbol.wildcard)) {
            const indexOfWildCard = formatTokens.indexOf(SystemFormatSymbol.wildcard);
            const beforeWildcard = formatTokens.slice(0, indexOfWildCard);
            const afterWildcard = formatTokens.slice(indexOfWildCard + 1);
            return StringExt._stringMatchesFormatTokens(primary.substring(0, beforeWildcard.length), beforeWildcard) &&
                StringExt._stringMatchesFormatTokens(primary.substring(primary.length - afterWildcard.length), afterWildcard);
        }
        if (formatTokens.length !== primary.length)
            return false;
        for (let i = 0; i < formatTokens.length; i++) {
            const char = primary[i];
            const token = formatTokens[i];
            if (token === SystemFormatSymbol.alphabet) {
                const charCode = char.charCodeAt(0);
                if (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122)) // "A"-"Z" = 65-90 "a"-"z" = 97-122 
                    return false;
            }
            else if (token === SystemFormatSymbol.number) {
                const charCode = char.charCodeAt(0);
                if (!(charCode >= 48 && charCode <= 57)) // "0"-"9" = 48-57
                    return false;
            }
            else {
                const expectedChar = token.length === 2 ? token[1] : token; // tokens for system chars are '\@' '\#' '\*' '\\'     
                if (char !== expectedChar)
                    return false;
            }
        }
        return true;
    }
    static _padString(input) {
        const segmentLength = 4;
        const stringLength = input.length;
        const diff = stringLength % segmentLength;
        if (!diff)
            return input;
        let position = stringLength;
        let padLength = segmentLength - diff;
        const paddedStringLength = stringLength + padLength;
        const buffer = buffer_1.Buffer.alloc(paddedStringLength);
        buffer.write(input);
        while (padLength--)
            buffer.write("=", position++);
        return buffer.toString();
    }
}
var SystemFormatSymbol;
(function (SystemFormatSymbol) {
    SystemFormatSymbol["wildcard"] = "*";
    SystemFormatSymbol["number"] = "#";
    SystemFormatSymbol["alphabet"] = "@";
    SystemFormatSymbol["escape"] = "\\";
})(SystemFormatSymbol || (SystemFormatSymbol = {}));
function defineStringExtProperties() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["isEmptyOrWhiteSpace"] === undefined)
        Object.defineProperty(String.prototype, "isEmptyOrWhiteSpace", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.isEmptyOrWhiteSpace(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["isNotEmptyOrWhiteSpace"] === undefined)
        Object.defineProperty(String.prototype, "isNotEmptyOrWhiteSpace", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return !StringExt.isEmptyOrWhiteSpace(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["contains"] === undefined)
        Object.defineProperty(String.prototype, "contains", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (search) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.contains(this.toString(), search);
            }
        });
    // Object.defineProperty(String.prototype, "startsWith", {
    //     configurable: false,
    //     enumerable: false,
    //     writable: false,
    //     value: function (sub: string): boolean
    //     {
    //         return StringExt.startsWith(this.toString(), sub);
    //     }
    // });
    // Object.defineProperty(String.prototype, "endsWith", {
    //     configurable: false,
    //     enumerable: false,
    //     writable: false,
    //     value: function (sub: string): boolean
    //     {
    //         return StringExt.endsWith(this.toString(), sub);
    //     }
    // });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["extractNumbers"] === undefined)
        Object.defineProperty(String.prototype, "extractNumbers", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.extractNumbers(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["extractCharacters"] === undefined)
        Object.defineProperty(String.prototype, "extractCharacters", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.extractCharacters(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["format"] === undefined)
        Object.defineProperty(String.prototype, "format", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (...params) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.format(this.toString(), ...params);
            }
        });
    // // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    // if (String.prototype["replaceAll"] === undefined)
    //     Object.defineProperty(String.prototype, "replaceAll", {
    //         configurable: false,
    //         enumerable: false,
    //         writable: false,
    //         value: function (searchValue: string, replaceValue: string): string
    //         {
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //             return StringExt.replaceAll(this.toString(), searchValue, replaceValue);
    //         }
    //     });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["base64Encode"] === undefined)
        Object.defineProperty(String.prototype, "base64Encode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.base64Encode(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["base64Decode"] === undefined)
        Object.defineProperty(String.prototype, "base64Decode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.base64Decode(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["base64UrlEncode"] === undefined)
        Object.defineProperty(String.prototype, "base64UrlEncode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.base64UrlEncode(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["base64UrlDecode"] === undefined)
        Object.defineProperty(String.prototype, "base64UrlDecode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.base64UrlDecode(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["hexEncode"] === undefined)
        Object.defineProperty(String.prototype, "hexEncode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.hexEncode(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["hexDecode"] === undefined)
        Object.defineProperty(String.prototype, "hexDecode", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.hexDecode(this.toString());
            }
        });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (String.prototype["matchesFormat"] === undefined)
        Object.defineProperty(String.prototype, "matchesFormat", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (format) {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (format == null || typeof format !== "string" || StringExt.isEmptyOrWhiteSpace(format))
                    throw new Error("format must be a valid string");
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return StringExt.matchesFormat(this.toString(), format.trim());
            }
        });
}
defineStringExtProperties();
//# sourceMappingURL=string-ext.js.map
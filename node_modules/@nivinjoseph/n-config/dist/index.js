"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationManager = void 0;
const tslib_1 = require("tslib");
require("@nivinjoseph/n-ext");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_exception_1 = require("@nivinjoseph/n-exception");
const n_util_1 = require("@nivinjoseph/n-util");
let config = {};
const parseProcessDotEnv = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const obj = process.env || {};
    // we need to remove useless values from obj
    const uselessValue = "[object Object]";
    Object.keys(obj).forEach(t => {
        if (obj[t] === uselessValue)
            delete obj[t];
    });
    // console.log("parseProcessDotEnv", JSON.stringify(obj));
    return obj;
};
const parseCommandLineArgs = () => {
    const obj = {};
    const args = process.argv;
    if (args.length <= 2)
        return obj;
    for (let i = 2; i < args.length; i++) {
        const arg = args[i].trim();
        if (!arg.contains("="))
            continue;
        const parts = arg.split("=");
        if (parts.length !== 2)
            continue;
        const key = parts[0].trim();
        const value = parts[1].trim();
        if (key.isEmptyOrWhiteSpace() || value.isEmptyOrWhiteSpace())
            continue;
        const boolVal = value.toLowerCase();
        if (boolVal === "true" || boolVal === "false") {
            obj[key] = boolVal === "true";
            continue;
        }
        try {
            // const numVal = value.contains(".") ? Number.parseFloat(value) : Number.parseInt(value);
            // if (!Number.isNaN(numVal))
            // {
            //     obj[key] = numVal;
            //     continue;
            // }
            const parsed = +value;
            if (!isNaN(parsed) && isFinite(parsed)) {
                obj[key] = parsed;
                continue;
            }
        }
        catch (error) {
            // suppress parse error?
        }
        const strVal = value;
        obj[key] = strVal;
    }
    // console.log("parseCommandLineArgs", JSON.stringify(obj));
    return obj;
};
if (typeof window !== "undefined" && typeof document !== "undefined") {
    const conf = APP_CONFIG;
    if (conf && typeof conf === "object")
        config = Object.assign(config, conf);
    if (window.config != null && typeof window.config === "string")
        config = Object.assign(config, JSON.parse(window.config.hexDecode()));
}
else {
    let fs;
    let path;
    // eslint-disable-next-line no-eval
    eval(`fs = require("fs");`);
    // eslint-disable-next-line no-eval
    eval(`path = require("path");`);
    const parsePackageDotJson = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const packageDotJsonPath = path.resolve(process.cwd(), "package.json");
        const obj = {};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!fs.existsSync(packageDotJsonPath))
            return obj;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const json = fs.readFileSync(packageDotJsonPath, "utf8");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (json != null && !json.toString().isEmptyOrWhiteSpace()) {
            const parsed = JSON.parse(json.toString());
            obj.package = {
                name: parsed.getValue("name"),
                description: parsed.getValue("description"),
                version: parsed.getValue("version")
            };
        }
        // console.log("parsePackageDotJson", JSON.stringify(obj));
        return obj;
    };
    const parseConfigDotJson = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const configDotJsonPath = path.resolve(process.cwd(), "config.json");
        let obj = {};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!fs.existsSync(configDotJsonPath))
            return obj;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const json = fs.readFileSync(configDotJsonPath, "utf8");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (json != null && !json.toString().isEmptyOrWhiteSpace())
            obj = JSON.parse(json.toString());
        // console.log("parseConfigDotJson", JSON.stringify(obj));
        return obj;
    };
    /* BORROWED FROM https://github.com/motdotla/dotenv/blob/master/lib/main.js
    * Parses a string or buffer into an object
    * @param {(string|Buffer)} src - source to be parsed
    * @returns {Object} keys and values from src
    */
    const parseDotEnv = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const dotEnvPath = path.resolve(process.cwd(), ".env");
        const obj = {};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!fs.existsSync(dotEnvPath))
            return obj;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const src = fs.readFileSync(dotEnvPath, "utf8");
        src.toString().split("\n").forEach((line) => {
            // matching "KEY' and 'VAL' in 'KEY=VAL'
            // eslint-disable-next-line no-useless-escape
            const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
            // matched?
            if (keyValueArr != null) {
                const key = keyValueArr[1];
                // default undefined or missing values to empty string
                let value = keyValueArr[2] || "";
                // expand newlines in quoted values
                const len = value ? value.length : 0;
                if (len > 0 && value.startsWith(`"`) && value.charAt(len - 1) === `"`) {
                    value = value.replace(/\\n/gm, "\n");
                }
                // remove any surrounding quotes and extra spaces
                value = value.replace(/(^['"]|['"]$)/g, "").trim();
                obj[key] = value;
            }
        });
        // console.log("parseDotEnv", JSON.stringify(obj));
        return obj;
    };
    const mergedConfig = Object.assign(config, parsePackageDotJson(), parseConfigDotJson());
    [
        ...Object.entries(parseDotEnv()),
        ...Object.entries(parseProcessDotEnv()),
        ...Object.entries(parseCommandLineArgs())
    ].forEach((entry) => mergedConfig.setValue(entry[0], entry[1]));
    config = mergedConfig;
}
class ConfigurationManager {
    constructor() { }
    static initializeProviders(providers) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, n_defensive_1.given)(providers, "providers").ensureHasValue().ensureIsArray().ensure(t => t.isNotEmpty);
            const providedConfig = (yield Promise.all(providers.map(t => t.provide())))
                .reduce((acc, t) => Object.assign(acc, t), {});
            [
                ...Object.entries(providedConfig),
                ...Object.entries(parseProcessDotEnv()),
                ...Object.entries(parseCommandLineArgs())
            ].forEach((entry) => config.setValue(entry[0], entry[1]));
        });
    }
    static getConfig(key) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        if (key === "*") {
            return JSON.parse(JSON.stringify(config));
        }
        else if (key.startsWith("*") && key.endsWith("*")) {
            key = key.substring(1, key.length - 1);
            return Object.entries(config).reduce((acc, entry) => {
                if (entry[0].contains(key))
                    acc[entry[0]] = entry[1];
                return acc;
            }, {});
        }
        else if (key.startsWith("*")) {
            key = key.substring(1);
            return Object.entries(config).reduce((acc, entry) => {
                if (entry[0].endsWith(key))
                    acc[entry[0]] = entry[1];
                return acc;
            }, {});
        }
        else if (key.endsWith("*")) {
            key = key.substring(0, key.length - 1);
            return Object.entries(config).reduce((acc, entry) => {
                if (entry[0].startsWith(key))
                    acc[entry[0]] = entry[1];
                return acc;
            }, {});
        }
        else
            return config.getValue(key);
    }
    static requireConfig(key) {
        const value = ConfigurationManager.getConfig(key);
        if (value == null || (typeof value === "string" && value.isEmptyOrWhiteSpace()))
            throw new n_exception_1.ApplicationException(`Required config '${key}' not found`);
        return value;
    }
    static requireStringConfig(key) {
        const value = ConfigurationManager.requireConfig(key);
        return value.toString();
    }
    static requireNumberConfig(key) {
        const value = n_util_1.TypeHelper.parseNumber(ConfigurationManager.requireConfig(key));
        if (value == null)
            throw new n_exception_1.ApplicationException(`Required number config '${key}' not found`);
        return value;
    }
    static requireBooleanConfig(key) {
        const value = n_util_1.TypeHelper.parseBoolean(ConfigurationManager.requireConfig(key));
        if (value == null)
            throw new n_exception_1.ApplicationException(`Required boolean config '${key}' not found`);
        return value;
    }
}
exports.ConfigurationManager = ConfigurationManager;
//# sourceMappingURL=index.js.map
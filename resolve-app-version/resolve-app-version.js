"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Core = require("@actions/core");
const n_config_1 = require("@nivinjoseph/n-config");
function func() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            let appVersion = n_config_1.ConfigurationManager.getConfig("package.version");
            if (appVersion == null || typeof appVersion !== "string" || appVersion.isEmptyOrWhiteSpace())
                throw new Error("Failed to resolve app version from package.json file.");
            appVersion = `v${appVersion.trim()}`;
            Core.info(`App version resolved as '${appVersion}'.`);
            Core.setOutput("version", appVersion);
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().catch(e => console.error(e));
//# sourceMappingURL=resolve-app-version.js.map
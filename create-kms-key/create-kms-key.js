"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Core = require("@actions/core");
const client_kms_1 = require("@aws-sdk/client-kms");
function func() {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const keyAlias = Core.getInput("key-alias");
            const client = new client_kms_1.KMSClient({});
            let keyMeta = null;
            try {
                const describe = yield client.send(new client_kms_1.DescribeKeyCommand({ KeyId: `alias/${keyAlias}` }));
                keyMeta = (_a = describe.KeyMetadata) !== null && _a !== void 0 ? _a : null;
            }
            catch (error) {
                if (!(error instanceof client_kms_1.NotFoundException))
                    throw error;
            }
            if (keyMeta != null && keyMeta.Arn != null) {
                Core.info(`Key with alias '${keyAlias}' found. Skipping creation.`);
                Core.setOutput("arn", keyMeta.Arn);
                return;
            }
            Core.info(`Key with alias '${keyAlias}' not found. Will create key.`);
            const createKey = yield client.send(new client_kms_1.CreateKeyCommand({
                KeySpec: "SYMMETRIC_DEFAULT",
                KeyUsage: "ENCRYPT_DECRYPT",
                MultiRegion: false
            }));
            if (createKey.KeyMetadata == null)
                throw new Error(`Failed to create key with alias '${keyAlias}'.`);
            yield client.send(new client_kms_1.CreateAliasCommand({
                AliasName: `alias/${keyAlias}`,
                TargetKeyId: createKey.KeyMetadata.Arn
            }));
            Core.info(`Key with alias '${keyAlias}' successfully created.`);
            Core.setOutput("arn", createKey.KeyMetadata.Arn);
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().catch(e => console.error(e));
//# sourceMappingURL=create-kms-key.js.map
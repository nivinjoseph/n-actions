"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Core = require("@actions/core");
const client_kms_1 = require("@aws-sdk/client-kms");
const client_iam_1 = require("@aws-sdk/client-iam");
const client_sts_1 = require("@aws-sdk/client-sts");
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
                Core.setOutput("id", keyMeta.KeyId);
                return;
            }
            Core.info(`Key with alias '${keyAlias}' not found. Will create key.`);
            const iamClient = new client_iam_1.IAMClient({});
            const currentUser = yield iamClient.send(new client_iam_1.GetUserCommand({}));
            const userArn = currentUser.User.Arn;
            const stsClient = new client_sts_1.STSClient({});
            const currentCaller = yield stsClient.send(new client_sts_1.GetCallerIdentityCommand({}));
            const accountId = currentCaller.Account;
            const policy = `
        {
            "Id": "key-access-policy-1",
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "Enable IAM User Permissions",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "arn:aws:iam::${accountId}:root"
                    },
                    "Action": "kms:*",
                    "Resource": "*"
                },
                {
                    "Sid": "Allow access for Key Administrators",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "${userArn}"
                    },
                    "Action": [
                        "kms:Create*",
                        "kms:Describe*",
                        "kms:Enable*",
                        "kms:List*",
                        "kms:Put*",
                        "kms:Update*",
                        "kms:Revoke*",
                        "kms:Disable*",
                        "kms:Get*",
                        "kms:Delete*",
                        "kms:TagResource",
                        "kms:UntagResource"
                    ],
                    "Resource": "*"
                },
                {
                    "Sid": "Allow use of the key",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "${userArn}"
                    },
                    "Action": [
                        "kms:Encrypt",
                        "kms:Decrypt",
                        "kms:ReEncrypt*",
                        "kms:GenerateDataKey*",
                        "kms:DescribeKey"
                    ],
                    "Resource": "*"
                },
                {
                    "Sid": "Allow attachment of persistent resources",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": "${userArn}"
                    },
                    "Action": [
                        "kms:CreateGrant",
                        "kms:ListGrants",
                        "kms:RevokeGrant"
                    ],
                    "Resource": "*",
                    "Condition": {
                        "Bool": {
                            "kms:GrantIsForAWSResource": "true"
                        }
                    }
                }
            ]
        }
        `;
            const createKey = yield client.send(new client_kms_1.CreateKeyCommand({
                KeySpec: "SYMMETRIC_DEFAULT",
                KeyUsage: "ENCRYPT_DECRYPT",
                MultiRegion: false,
                Policy: policy
            }));
            if (createKey.KeyMetadata == null)
                throw new Error(`Failed to create key with alias '${keyAlias}'.`);
            yield client.send(new client_kms_1.CreateAliasCommand({
                AliasName: `alias/${keyAlias}`,
                TargetKeyId: createKey.KeyMetadata.Arn
            }));
            Core.info(`Key with alias '${keyAlias}' successfully created.`);
            Core.setOutput("id", createKey.KeyMetadata.KeyId);
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().catch(e => console.error(e));
//# sourceMappingURL=create-kms-key.js.map
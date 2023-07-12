"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Core = require("@actions/core");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_iam_1 = require("@aws-sdk/client-iam");
function func() {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const bucketName = Core.getInput("bucket-name");
            const isPublic = !!Core.getBooleanInput("is-public");
            const client = new client_s3_1.S3Client({});
            const list = yield client.send(new client_s3_1.ListBucketsCommand({}));
            const bucketsFound = (_a = list.Buckets) !== null && _a !== void 0 ? _a : null;
            if (bucketsFound != null && bucketsFound.length !== 0 && bucketsFound.some(t => t.Name === bucketName)) {
                Core.info(`Bucket with name '${bucketName}' found. Skipping creation.`);
                return;
            }
            Core.info(`Bucket with name '${bucketName}' not found. Will create Bucket.`);
            const createBucket = yield client.send(new client_s3_1.CreateBucketCommand({
                Bucket: bucketName
            }));
            if (createBucket.Location == null)
                throw new Error(`Failed to create Bucket with name '${bucketName}'.`);
            yield client.send(new client_s3_1.PutPublicAccessBlockCommand({
                Bucket: bucketName,
                PublicAccessBlockConfiguration: {
                    BlockPublicAcls: !isPublic,
                    IgnorePublicAcls: !isPublic,
                    BlockPublicPolicy: true,
                    RestrictPublicBuckets: true
                }
            }));
            if (isPublic) {
                const iamClient = new client_iam_1.IAMClient({});
                const currentUser = yield iamClient.send(new client_iam_1.GetUserCommand({}));
                const userArn = currentUser.User.Arn;
                yield client.send(new client_s3_1.PutBucketPolicyCommand({
                    Bucket: bucketName,
                    Policy: `
                {
                    "Id": "create-s3-bucket-action-policy",
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Action": [
                                "s3:GetObject",
                                "s3:PutObject",
                                "s3:PutObjectAcl"
                            ],
                            "Effect": "Allow",
                            "Resource": "arn:aws:s3:::${bucketName}/*",
                            "Principal": {
                                "AWS": "${userArn}"
                            }
                        }
                    ]
                }
                `.trim()
                }));
            }
            Core.info(`Bucket with name '${bucketName}' successfully created.`);
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().catch(e => console.error(e));
//# sourceMappingURL=create-s3-bucket.js.map
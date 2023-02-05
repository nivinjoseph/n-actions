"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Core = require("@actions/core");
const client_s3_1 = require("@aws-sdk/client-s3");
function func() {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const bucketName = Core.getInput("bucket-name");
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
                    BlockPublicAcls: true,
                    BlockPublicPolicy: true,
                    IgnorePublicAcls: true,
                    RestrictPublicBuckets: true
                }
            }));
            Core.info(`Bucket with name '${bucketName}' successfully created.`);
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().catch(e => console.error(e));
//# sourceMappingURL=create-s3-bucket.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Core = require("@actions/core");
const client_ecr_1 = require("@aws-sdk/client-ecr");
function func() {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const repoName = Core.getInput("repository-name");
            const imageTag = Core.getInput("image-tag");
            const client = new client_ecr_1.ECRClient({});
            let imagesFound = null;
            const describe = yield client.send(new client_ecr_1.DescribeImagesCommand({
                repositoryName: repoName,
                filter: {
                    tagStatus: client_ecr_1.TagStatus.TAGGED
                },
                imageIds: [{
                        imageTag
                    }]
            }));
            imagesFound = (_a = describe.imageDetails) !== null && _a !== void 0 ? _a : null;
            if (imagesFound != null && imagesFound.length !== 0) {
                Core.info(`Image with tag '${imageTag}' exists in repository '${repoName}'.`);
                Core.setOutput("exists", "yes");
            }
            else {
                Core.info(`Image with tag '${imageTag}' doest NOT exists in repository '${repoName}'.`);
                Core.setOutput("exists", "no");
            }
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().catch(e => console.error(e));
//# sourceMappingURL=check-image-exists.js.map
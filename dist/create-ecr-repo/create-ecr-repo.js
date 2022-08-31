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
            const client = new client_ecr_1.ECRClient({});
            let reposFound = null;
            try {
                const describe = yield client.send(new client_ecr_1.DescribeRepositoriesCommand({ repositoryNames: [repoName] }));
                reposFound = (_a = describe.repositories) !== null && _a !== void 0 ? _a : null;
            }
            catch (error) {
                if (!(error instanceof client_ecr_1.RepositoryNotFoundException))
                    throw error;
            }
            if (reposFound != null && reposFound.length !== 0) {
                Core.info(`Repository with name '${repoName}' found. Skipping creation.`);
                return;
            }
            Core.info(`Repository with name '${repoName}' not found. Will create repository.`);
            const createRepo = yield client.send(new client_ecr_1.CreateRepositoryCommand({
                repositoryName: repoName,
                imageTagMutability: client_ecr_1.ImageTagMutability.IMMUTABLE,
                imageScanningConfiguration: {
                    scanOnPush: true
                }
            }));
            if (createRepo.repository == null)
                throw new Error(`Failed to create repository with name '${repoName}'.`);
            Core.info(`Repository with name '${repoName}' successfully created.`);
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().catch(e => console.error(e));
//# sourceMappingURL=create-ecr-repo.js.map
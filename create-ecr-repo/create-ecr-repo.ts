import * as Core from "@actions/core";
import { ECRClient, DescribeRepositoriesCommand, CreateRepositoryCommand, RepositoryNotFoundException, Repository, ImageTagMutability } from "@aws-sdk/client-ecr";


async function func(): Promise<void>
{
    try
    {
        const repoName = Core.getInput("repository-name");
        
        const client = new ECRClient({});
        
        let reposFound: Array<Repository> | null = null;
        try
        {
            const describe = await client.send(new DescribeRepositoriesCommand({ repositoryNames: [repoName] }));
            reposFound = describe.repositories ?? null;
        }
        catch (error: any)
        {
            if (!(error instanceof RepositoryNotFoundException))
                throw error;
        }

        if (reposFound != null && reposFound.length !== 0)
        {
            Core.info(`Repository with name '${repoName}' found. Skipping creation.`);
            return;
        }

        Core.info(`Repository with name '${repoName}' not found. Will create repository.`);

        const createRepo = await client.send(new CreateRepositoryCommand({
            repositoryName: repoName,
            imageTagMutability: ImageTagMutability.IMMUTABLE,
            imageScanningConfiguration: {
                scanOnPush: true
            }
        }));

        if (createRepo.repository == null)
            throw new Error(`Failed to create repository with name '${repoName}'.`);

        Core.info(`Repository with name '${repoName}' successfully created.`);
    }
    catch (error: any)
    {
        Core.setFailed(error.message);
    }
}

func().catch(e => console.error(e));
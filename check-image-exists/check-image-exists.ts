import * as Core from "@actions/core";
import { ECRClient, DescribeImagesCommand, TagStatus, ImageDetail } from "@aws-sdk/client-ecr";


async function func(): Promise<void>
{
    try
    {
        const repoName = Core.getInput("repository-name");
        const imageTag = Core.getInput("image-tag");

        const client = new ECRClient({});

        let imagesFound: Array<ImageDetail> | null = null;
        
        try 
        {
            const describe = await client.send(new DescribeImagesCommand({
                repositoryName: repoName,
                filter: {
                    tagStatus: TagStatus.TAGGED
                },
                imageIds: [{
                    imageTag
                }]
            }));
            imagesFound = describe.imageDetails ?? null;    
        }
        catch (error)
        {
            console.warn(error);
            imagesFound = null;
        }
        
        if (imagesFound != null && imagesFound.length !== 0)
        {
            Core.info(`Image with tag '${imageTag}' exists in repository '${repoName}'.`);
            Core.setOutput("exists", "yes");
        }
        else
        {
            Core.info(`Image with tag '${imageTag}' doest NOT exists in repository '${repoName}'.`);
            Core.setOutput("exists", "no");
        }
    }
    catch (error: any)
    {
        Core.setFailed(error.message);
    }
}

func().catch(e => console.error(e));
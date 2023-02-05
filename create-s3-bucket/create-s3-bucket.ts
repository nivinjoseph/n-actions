import * as Core from "@actions/core";
import { S3Client, ListBucketsCommand, CreateBucketCommand, PutPublicAccessBlockCommand } from "@aws-sdk/client-s3";


async function func(): Promise<void>
{
    try
    {
        const bucketName = Core.getInput("bucket-name");

        const client = new S3Client({});

        const list = await client.send(new ListBucketsCommand({}));
        const bucketsFound = list.Buckets ?? null;

        if (bucketsFound != null && bucketsFound.length !== 0 && bucketsFound.some(t => t.Name === bucketName))
        {
            Core.info(`Bucket with name '${bucketName}' found. Skipping creation.`);
            return;
        }

        Core.info(`Bucket with name '${bucketName}' not found. Will create Bucket.`);

        const createBucket = await client.send(new CreateBucketCommand({
            Bucket: bucketName
        }));

        if (createBucket.Location == null)
            throw new Error(`Failed to create Bucket with name '${bucketName}'.`);
            
        await client.send(new PutPublicAccessBlockCommand({
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
    catch (error: any)
    {
        Core.setFailed(error.message);
    }
}

func().catch(e => console.error(e));
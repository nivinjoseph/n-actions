import * as Core from "@actions/core";
import { S3Client, ListBucketsCommand, CreateBucketCommand, PutPublicAccessBlockCommand, PutBucketPolicyCommand, PutBucketOwnershipControlsCommand, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import { IAMClient, GetUserCommand } from "@aws-sdk/client-iam";


async function func(): Promise<void>
{
    try
    {
        const bucketName = Core.getInput("bucket-name");
        const isPublic = !!Core.getBooleanInput("is-public");

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
                BlockPublicAcls: !isPublic,
                IgnorePublicAcls: !isPublic,
                BlockPublicPolicy: true,
                RestrictPublicBuckets: true
            }
        }));
        
        if(isPublic)
        {
            await client.send(new PutBucketOwnershipControlsCommand({
                Bucket: bucketName,
                OwnershipControls: {
                    Rules: [
                        {
                            ObjectOwnership: "BucketOwnerPreferred"
                        }
                    ]
                }
            }));
            
            const iamClient = new IAMClient({});
            const currentUser = await iamClient.send(new GetUserCommand({}));
            const userArn = currentUser.User!.Arn!;
            
            await client.send(new PutBucketPolicyCommand({
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
            
            await client.send(new PutBucketCorsCommand({
                Bucket: bucketName,
                CORSConfiguration: {
                    CORSRules: [
                        {
                            "AllowedHeaders": [
                                "*"
                            ],
                            "AllowedMethods": [
                                "GET",
                                "PUT"
                            ],
                            "AllowedOrigins": [
                                "*"
                            ],
                            "ExposeHeaders": [],
                            "MaxAgeSeconds": 0
                        }
                    ]
                }
            }));
        }

        Core.info(`Bucket with name '${bucketName}' successfully created.`);
    }
    catch (error: any)
    {
        Core.setFailed(error.message);
    }
}

func().catch(e => console.error(e));
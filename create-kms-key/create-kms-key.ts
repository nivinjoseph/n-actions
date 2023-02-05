import * as Core from "@actions/core";
import { KMSClient, DescribeKeyCommand, NotFoundException, KeyMetadata, CreateKeyCommand, CreateAliasCommand } from "@aws-sdk/client-kms";
import { IAMClient, GetUserCommand } from "@aws-sdk/client-iam";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";


async function func(): Promise<void>
{
    try
    {
        const keyAlias = Core.getInput("key-alias");

        const client = new KMSClient({});

        let keyMeta: KeyMetadata | null = null;
        try
        {
            const describe = await client.send(new DescribeKeyCommand({ KeyId: `alias/${keyAlias}` }));
            keyMeta = describe.KeyMetadata ?? null;
        }
        catch (error: any)
        {
            if (!(error instanceof NotFoundException))
                throw error;
        }

        if (keyMeta != null && keyMeta.Arn != null)
        {
            Core.info(`Key with alias '${keyAlias}' found. Skipping creation.`);
            Core.setOutput("id", keyMeta.KeyId);
            return;
        }

        Core.info(`Key with alias '${keyAlias}' not found. Will create key.`);
        
        const iamClient = new IAMClient({});
        const currentUser = await iamClient.send(new GetUserCommand({}));
        const userArn = currentUser.User!.Arn!;
        
        const stsClient = new STSClient({});
        const currentCaller = await stsClient.send(new GetCallerIdentityCommand({}));
        const accountId = currentCaller.Account!;
        
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
        
        const createKey = await client.send(new CreateKeyCommand({
            KeySpec: "SYMMETRIC_DEFAULT",
            KeyUsage: "ENCRYPT_DECRYPT",
            MultiRegion: false,
            Policy: policy
        }));
        
        if (createKey.KeyMetadata == null)
            throw new Error(`Failed to create key with alias '${keyAlias}'.`);
        
        await client.send(new CreateAliasCommand({
            AliasName: `alias/${keyAlias}`,
            TargetKeyId: createKey.KeyMetadata.Arn
        }));

        Core.info(`Key with alias '${keyAlias}' successfully created.`);
        
        Core.setOutput("id", createKey.KeyMetadata.KeyId);
    }
    catch (error: any)
    {
        Core.setFailed(error.message);
    }
}

func().catch(e => console.error(e));
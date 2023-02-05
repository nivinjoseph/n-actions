import * as Core from "@actions/core";
import { KMSClient, DescribeKeyCommand, NotFoundException, KeyMetadata, CreateKeyCommand, CreateAliasCommand } from "@aws-sdk/client-kms";


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
            Core.setOutput("arn", keyMeta.Arn);
            return;
        }

        Core.info(`Key with alias '${keyAlias}' not found. Will create key.`);

        const createKey = await client.send(new CreateKeyCommand({
            KeySpec: "SYMMETRIC_DEFAULT",
            KeyUsage: "ENCRYPT_DECRYPT",
            MultiRegion: false
        }));
        
        if (createKey.KeyMetadata == null)
            throw new Error(`Failed to create key with alias '${keyAlias}'.`);
        
        await client.send(new CreateAliasCommand({
            AliasName: keyAlias,
            TargetKeyId: createKey.KeyMetadata.Arn
        }));

        Core.info(`Key with alias '${keyAlias}' successfully created.`);
        
        Core.setOutput("arn", createKey.KeyMetadata.Arn);
    }
    catch (error: any)
    {
        Core.setFailed(error.message);
    }
}

func().catch(e => console.error(e));
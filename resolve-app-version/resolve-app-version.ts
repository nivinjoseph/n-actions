import * as Core from "@actions/core";
import { ConfigurationManager } from "@nivinjoseph/n-config";


async function func(): Promise<void>
{
    try
    {
        let appVersion = ConfigurationManager.getConfig<string | null>("package.version");
        
        if (appVersion == null || typeof appVersion !== "string" || appVersion.isEmptyOrWhiteSpace())
            throw new Error("Failed to resolve app version from package.json file.");
        
        appVersion = `v${appVersion.trim()}`;
        
        Core.info(`App version resolved as '${appVersion}'.`);
        Core.setOutput("version", appVersion);
    }
    catch (error: any)
    {
        Core.setFailed(error.message);
    }
}

func().catch(e => console.error(e));
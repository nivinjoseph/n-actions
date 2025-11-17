import * as Core from "@actions/core";
// import * as Axios from "axios";
import { WebClient } from "@slack/web-api";


async function func(): Promise<void>
{
    try
    {
        const jobType = Core.getInput("job-type");
        const jobStatus = Core.getInput("job-status");

        let color = "#2e993e";
        switch (jobStatus)
        {
            case "success":
                color = "#2e993e";
                break;
            case "failure":
                color = "#bd0f26";
                break;
            case "cancelled":
                color = "#d29d0c";
                break;
            default:
                throw new Error(`Unknown status: ${jobStatus}`);
        }

        const statusMessage = jobStatus.toUpperCase();

        const slackWebClient = new WebClient(Core.getInput("slack-bot-token"));

        const result = await slackWebClient.chat.postMessage({
            username: "Github Actions",
            channel: Core.getInput("slack-channel-id"),
            // as_user: false, // DEPRECATED
            icon_emoji: ":github-white:",
            text: `${jobType}: ${statusMessage}`,
            attachments: [
                {
                    color,
                    blocks: [
                        {
                            type: "header",
                            text: { type: "plain_text", text: jobType }
                        },
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: `*${statusMessage}*`
                            }
                        }
                    ]
                }
            ]
        });


        const hasError = result.errors || result.error;

        if (hasError)
        {
            const error = JSON.stringify({
                error: result.error ?? null,
                errors: result.errors ?? null
            });

            console.warn(error);

            throw new Error(error);
        }

        // const response = await Axios.default.post(Core.getInput("slack-url"), payload);

        // if (response.status !== 200)
        //     throw new Error("Call to Slack failed.");
    }
    catch (error: any)
    {
        console.error(error);
        Core.setFailed(error.message);
    }
}

func().catch(e => console.error(e));
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Core = require("@actions/core");
// import * as Axios from "axios";
const bolt_1 = require("@slack/bolt");
class DummyReceiver {
    // @ts-expect-error: not used atm
    init(app) {
        // no-op
    }
    // @ts-expect-error: not used atm
    start(...args) {
        return Promise.resolve();
    }
    // @ts-expect-error: not used atm
    stop(...args) {
        return Promise.resolve();
    }
}
function func() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const jobType = Core.getInput("job-type");
            const jobStatus = Core.getInput("job-status");
            let color = "#2e993e";
            switch (jobStatus) {
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
            const payload = {
                channel: Core.getInput("slack-channel-id"),
                as_user: false,
                icon_emoji: ":github-white:",
                text: `${jobType}: ${statusMessage}`,
                attachments: [
                    {
                        color,
                        blocks: [
                            {
                                type: 'header',
                                text: { type: 'plain_text', text: jobType }
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
            };
            const app = new bolt_1.App({
                receiver: new DummyReceiver(),
                token: Core.getInput("slack-bot-token")
            });
            yield app.client.chat.postMessage(payload);
            // const response = await Axios.default.post(Core.getInput("slack-url"), payload);
            // if (response.status !== 200)
            //     throw new Error("Call to Slack failed.");
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().catch(e => console.error(e));
//# sourceMappingURL=notify-slack.js.map
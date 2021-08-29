"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core = require("@actions/core");
const Axios = require("axios");
function func() {
    return __awaiter(this, void 0, void 0, function* () {
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
                attachments: [
                    {
                        color,
                        blocks: [
                            {
                                type: "section",
                                text: {
                                    type: "mrkdwn",
                                    text: `${jobType}: *${statusMessage}*`,
                                },
                            },
                        ],
                    },
                ],
            };
            const response = yield Axios.default.post(Core.getInput("slack-url"), payload);
            if (response.status !== 200)
                throw new Error("Call to Slack failed.");
        }
        catch (error) {
            Core.setFailed(error.message);
        }
    });
}
func().then().catch(e => console.error(e));
//# sourceMappingURL=notify-slack.js.map
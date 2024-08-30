
import { BotLimitButton } from "../buttons/userButtons.js";
import { getdb, putdb } from "../main/database.js";
import { editMessageText, sendMessage } from "../main/methods.js";

export async function addBot(userId, where, queryMsgId=null) {

    const userVars = await getdb(`users/vars/${userId}`);

    // Error message to be displayed when adding bots limit is reached
    const ErrorMsg = `<b>❌  Your Limit Reached  ❌</b>` +
            `\n\n<blockquote><b>MoBots Allowed → [ ${userVars.bots_allowed} ]</b></blockquote>` +
            `\n<blockquote><b>MoBots Created → [ ${userVars.bots_made} ]</b></blockquote>`;

    const askForToken = `ENTER YOUR TELEGRAM BOT API TOKEN`;

    // When "/addbot" Command is Sent by User
    if (where === "message") {

        if (userVars.bots_allowed === userVars.bots_made) {
            await sendMessage(userId, ErrorMsg, BotLimitButton(), "HTML");
        } else if (userVars.bots_allowed > userVars.bots_made) {
            await putdb(`users/vars/${userId}/make_newbot`, true);
            await sendMessage(userId, askForToken);
        }

    // When "🤖 Add Bot" Button is Pressed by User
    } else if (where === "callback") {

        if (userVars.bots_allowed === userVars.bots_made) {
            await editMessageText(userId, queryMsgId, ErrorMsg, BotLimitButton(), "HTML");
        } else if (userVars.bots_allowed > userVars.bots_made) {
            await putdb(`users/vars/${userId}/make_newbot`, true);
            await editMessageText(userId, queryMsgId, askForToken);
        }
    }
}
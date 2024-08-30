
import { getdb } from "../main/database.js";
import { answerCallbackQuery } from "../main/methods.js";

export async function masterCallback(update) {

    const masterId = update.callback_query.from.id;
    const callbackData = update.callback_query.data;
    const queryMsgId = update.callback_query.message.message_id;
    const queryId = update.callback_query.id;

    if (callbackData.startsWith('userDetails=')) {

        const userId = callbackData.split('=')[1];
        const userVars = await getdb(`users/vars/${userId}`);

        let Text = "Premium User → ";
        userVars.premium ? Text += "[ True ]\n" : Text += "[ False ]\n";

        Text += "MoBots Allowed → ";
        Text += `[ ${userVars.bots_made} ]\n`;

        Text += "MoBots Created → ";
        Text += `[ ${userVars.bots_made} ]\n`;

        if (userVars.premiumBots) {
            Text += "Premium MoBots → ";
            Text += `[ ${userVars.premiumBots.length} ]\n`;
        }
        await answerCallbackQuery(queryId, Text);
        return;
    }
}
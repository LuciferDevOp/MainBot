
import { userStart } from "../user/start.js";
import { userCmds } from "../user/commands.js";
import { ForceSubAll } from "../functions/ForceSub.js";
import { getdb } from "../main/database.js";
import { getCloudflareToken, getBotToken } from "../functions/newBot.js";
import { userCancelled } from "../user/cancel.js";

export async function handleUser(update) {
    
    const userText = update.message.text;
    const userId = update.message.from.id;

    if (userText === "/cancel") {
        await userCancelled(userId);
        return;
    }

    const userVars = await getdb(`users/vars/${userId}`) || {};
    
    if (userVars.make_newbot) {
        await getBotToken(update, userVars);
        return;
    }
    
    if (userVars.CFToken) {
        await getCloudflareToken(userId, userText, userVars);
        return;
    }

    const isSubAll = await ForceSubAll(userId, "message");
    if (!isSubAll) return;

    if (userText === "/start") {
        await userStart(update);

    } else {
        await userCmds(update);
    }

}
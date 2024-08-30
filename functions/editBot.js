
import { botMenu, botsettings, varsMenu } from "../buttons/botButtons.js";
import { editMessageText } from "../main/methods.js";

export async function editBot(bot, userId, queryMsgId) {

    if (bot.length === 1) {
        const text = `*Here it is : @${bot[0]} \nWhat do you want to do with the bot?*`;
        await editMessageText(userId, queryMsgId, text, botMenu(bot[0]));
        return;
    }
    if (bot.length === 2) {
        
        if (bot[1] === "broadcast") {

            return;
        }
        if (bot[1] === "stats") {

            return;
        }
        if (bot[1] === "fsub") {

            return;
        }
        if (bot[1] === "tokens") {

            return;
        }
        if (bot[1] === "settings") {
            const text = `*Here it is : @${bot[0]} \nWhat Settings do you want to change?*`;
            await editMessageText(userId, queryMsgId, text, botsettings(bot[0]));
            return;
        }
        if (bot[1] === "delete") {

            return;
        }
        return;
    }

    if (bot.length === 3) {

        if (bot[2] === "vars") {
            const text = `*Here it is : @${bot[0]} \nWhich Variable do you want to edit ?*`;
            await editMessageText(userId, queryMsgId, text, varsMenu(bot[0]));
            return;
        }
        if (bot[2] === "group") {

            return;
        }
        return;
    }

}
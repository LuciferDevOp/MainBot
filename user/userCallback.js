
import { answerCallbackQuery, deleteMessage, editMessageText, sendMessage } from "../main/methods.js";
import { USER_WELCOME } from "../main/msgs.js";
import { getdb, putdb } from "../main/database.js";
import { ForceSubAll } from "../functions/ForceSub.js";
import { addBot } from "../functions/addBot.js";
import { userStartButtons } from "../buttons/userButtons.js";
import { mybots } from "../functions/mybots.js";
import { editBot } from "../functions/editBot.js";

export async function userCallback(update) {

    const userId = update.callback_query.from.id;
    const callbackData = update.callback_query.data;
    const queryMsgId = update.callback_query.message.message_id;
    const queryId = update.callback_query.id;

    if (callbackData === 'checkSub') {
        const userInfo = update.callback_query.from;
        await ForceSubAll(userId, "checkSub", queryId, queryMsgId, userInfo);
        return;
    }

    if (callbackData === 'back') {
        const inline = userStartButtons();
        await editMessageText(userId, queryMsgId, USER_WELCOME, inline);
        return;
    } 
    
    if (callbackData === 'cancel') {
        const userVars = await getdb(`users/vars/${userId}`);
        delete userVars.make_newbot;
        delete userVars.CFToken;
        delete userVars.newbot;
        deleteMessage(userId, queryMsgId);
        await sendMessage(userId, "*Current Operation Cancelled...*");
        await putdb(`users/vars/${userId}`, userVars);
        return;
    }
    
    if (callbackData === 'increase') {
        await answerCallbackQuery(queryId, "Coming Soon...😉");
        return;
    }

    if (callbackData.startsWith('bot=')) {
        const bot = callbackData.split('=').slice(1);
        await editBot(bot, userId, queryMsgId);
        return;
    }

    const isSubAll = await ForceSubAll(userId, "callback", queryId , queryMsgId);
    if (!isSubAll) return;

    if (callbackData === 'addbot') {
        await addBot(userId, "callback", queryMsgId);
        return;
    }

    if (callbackData === 'mybots') {
        await mybots(userId, "callback", queryMsgId);
        return;
    }

    if (callbackData === 'help') {

    }

    if (callbackData === 'ads') {

    }

    if (callbackData === 'pro') {

    }
}
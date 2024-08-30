
import { botToken, channels } from '../main/vars.js';
import { FORCE_SUBSCRIBE, USER_WELCOME } from "../main/msgs.js";
import { answerCallbackQuery, editMessageText, sendMessage } from "../main/methods.js";
import { userStartButtons } from "../buttons/userButtons.js";
import { ForceSubButtons } from '../buttons/ForceSub.js';
import { getdb } from '../main/database.js';
import { newUser } from '../user/newUser.js';

export async function ForceSubAll(userId, where, queryId=null , queryMsgId=null, userInfo=null) {
    for (const channel of channels) {
        const isSubscribed = await checkSub(userId, channel);

        if (isSubscribed && where === "checkSub") {
            const popupText = "Thanks For Joining 😊";
            await answerCallbackQuery(queryId, popupText);
            const inline = userStartButtons();
            await editMessageText(userId, queryMsgId, USER_WELCOME, inline);

            const oldUser = await getdb(`users/userInfo/${userId}`);
            if (!oldUser){
                await newUser(userInfo);
                return;
            }
            
        } else if (!isSubscribed) {
            if (where === "message") {
                const inline = ForceSubButtons();
                await sendMessage(userId, FORCE_SUBSCRIBE, inline);
                
            } else if (where === "callback") {
                const popupText = "You Have Left Some Channels 😑";
                await answerCallbackQuery(queryId, popupText);
                const inline = ForceSubButtons();
                await editMessageText(userId, queryMsgId, FORCE_SUBSCRIBE, inline);

            } else if (where === "checkSub") {
                const popupText = "You Haven't Joined All Channels 😑";
                await answerCallbackQuery(queryId, popupText);

            }
            return false;

        } else {
            return true;
        }
    }
}


async function checkSub(userId, channel) {

    const data_url = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=@${channel}&user_id=${userId}`;
    const response = await fetch(data_url);
    const datajson = await response.json();

    if (datajson.ok === false ||
        datajson.result.status === 'left' ||
        datajson.result.status === 'kicked') {
        return false

    } else if (datajson.result.status === 'member' ||
        datajson.result.status === 'administrator' ||
        datajson.result.status === 'creator') {
        return true
    }

}

import { noBotsError } from "../buttons/userButtons.js";
import { getdb } from "../main/database.js";
import { editMessageText, sendMessage } from "../main/methods.js";

export async function mybots(userId, where, queryMsgId=null) {

    const userBots = await getdb(`users/vars/${userId}/bots`);
    const displayMsg = `*Here are your all connected MoBots \nNow, choose a MoBot from the list below:*`;
    const ErrorMsg = "*You Have No Connected MoBots Yet! \nAdd one by clicking the button below ✨*";

    if (!userBots) {
        await editMessageText(userId, queryMsgId, ErrorMsg, noBotsError());
        return;
    }

    const inline_keyboard = {
        inline_keyboard: [[]]
    };
    
    let currentRow = 0;
    for (let i = 0; i < userBots.length; i++) {
        if (i % 2 === 0 && i !== 0) {
            inline_keyboard.inline_keyboard.push([]);
            currentRow++;
        }
        inline_keyboard.inline_keyboard[currentRow].push({
            text: `@${userBots[i]}`,
            callback_data: `bot=${userBots[i]}` 
        });
    }

    inline_keyboard.inline_keyboard.push([
        { text: "« Back To Main Menu", callback_data: "back" } 
    ]);

    if (where === "message") {
        await sendMessage(userId, displayMsg, inline_keyboard);

    } else if (where === "callback") {
        await editMessageText(userId, queryMsgId, displayMsg, inline_keyboard);
    }
}


import { getdb, putdb } from "../main/database.js";
import { sendMessage } from "../main/methods.js";

export async function userCancelled(userId) {

    const userVars = await getdb(`users/vars/${userId}`);
    const CancelError = (!userVars.make_newbot && !userVars.CFToken && !userVars.newbot);
    if (CancelError) {
        await sendMessage(userId, "*No Active Command To Cancel...*");
        return;
    }
    delete userVars.make_newbot;
    delete userVars.CFToken;
    delete userVars.newbot;
    await sendMessage(userId, "*Current Operation Cancelled...*");
    await putdb(`users/vars/${userId}`, userVars);

}
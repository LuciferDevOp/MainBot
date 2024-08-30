
import { sendLogs } from '../main/methods.js';
import { StartLogButton } from "../buttons/userButtons.js";
import { putdb } from '../main/database.js';
import { startLogId } from "../main/vars.js";

export async function newUser(userInfo) {

    const { id: userId, username, first_name, last_name } = userInfo;

    const resp = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
    const data = await resp.json();
    const date = data.datetime.split('T')[0];
    const time = data.datetime.split('T')[1].split('.')[0];

    let dateTime = "";
    if (date && time) {
        userInfo.date = date;
        userInfo.time = time;
        dateTime = `*Date :* ${date} \n*Time :* ${time}`;
    }

    // Putting UserInfo In Database
    const taggedUsername = username ? `@${username}` : "undefined";
    userInfo.username = taggedUsername;
    
    if (username) {
        await putdb(`users/usernames/${taggedUsername}`, userId);
    }
    await putdb(`users/userInfo/${userId}`, userInfo);

    // Putting UserVars in Database
    const userVars = { bots_made: 0, bots_allowed: 1, premium: false };
    await putdb(`users/vars/${userId}`, userVars);
    
    // Send User Start Log in LogGroup 
    const inline2 = StartLogButton(userId);
    let user_Info = `*UserID :* \`${userId}\` \n` +
                `*FirstName :* ${first_name || ""} \n` +
                `*LastName :* ${last_name || ""} \n` +
                `*UserName :* ${taggedUsername} \n`;

    if (dateTime) {
        user_Info += dateTime;
    }
    const response = await sendLogs(user_Info, startLogId, inline2);
    await putdb(`users/vars/${userId}/logMsg`, response.result.message_id);

}
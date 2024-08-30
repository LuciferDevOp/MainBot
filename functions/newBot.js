
import { CancelButton } from "../buttons/userButtons.js";
import { putdb, postdb, getdb } from "../main/database.js";
import { deleteMessage, sendMessage } from "../main/methods.js";
import { userDbLink } from "../main/vars.js";
import { deployBot } from "./deployBot.js";

export async function newBot(userVars) {

    const userData = {
        masterId: userVars.newbot.masterId,
        vars: {
            bannedUsers: [0],
            botToken: userVars.newbot.botToken,
        }
    };
    
    const { name: userKey } = await postdb(``, userData);
    userVars.newbot.userKey = userKey;
    userVars.newbot.dbLink = userDbLink;

    const DeployData = {
        masterId: userVars.newbot.masterId,
        IMP_KEY1: btoa(userDbLink),
        IMP_KEY2: userKey
    };

    await deployBot(userVars, DeployData);
}

export async function getBotToken(update, userVars) {

    const userId = update.message.from.id;
    const userText = update.message.text;
    const match = userText.match(/([A-Za-z0-9_-]+):([A-Za-z0-9_-]+)/);

    try {

        if (!match) throw new Error("Invalid Bot API token");

        const newBotToken = match[0];
        const url1 = `https://api.telegram.org/bot${newBotToken}/getMe`;
        const response = await fetch(url1).then(res => res.json());

        if (!response.ok) throw new Error("Invalid Bot API token");

        if (userVars.errorMsg) {
            deleteMessage(userId, userVars.errorMsg);
        }

        const oldBot = await getdb(`bots/${response.result.username}`);

        if (oldBot) {
            const ErrorMsg = `<blockquote><b> ERROR : BOT ALREADY EXISTS </b></blockquote>`;
            const res1 = await sendMessage(userId, ErrorMsg, CancelButton(), "HTML");
            await putdb(`users/vars/${userId}/errorMsg`, res1.result.message_id);
            return;
        }

        userVars.newbot = {
            masterId: userId,
            botToken: newBotToken,
            id: response.result.id,
            name: response.result.first_name,
            username: response.result.username
        };
        userVars.CFToken = true;
        delete userVars.make_newbot;

        await putdb(`users/vars/${userId}`, userVars);
        await sendMessage(userId, `ENTER YOUR CLOUDFLARE API TOKEN`);

    } catch (error) {
        if (userVars.errorMsg) {
            deleteMessage(userId, userVars.errorMsg);
        }
        const ErrorMsg = `<blockquote><b> INVALID TELEGRAM BOT TOKEN </b></blockquote>`;
        const res1 = await sendMessage(userId, ErrorMsg, CancelButton(), "HTML");
        await putdb(`users/vars/${userId}/errorMsg`, res1.result.message_id);
    }
}


export async function getCloudflareToken(userId, userText, userVars) {
    const CloudflareToken = userText.trim();

    try {
        const res1 = await fetch(`https://api.cloudflare.com/client/v4/accounts`, {
            headers: { 'Authorization': `Bearer ${CloudflareToken}`, 'Content-Type': 'application/json' }
        });
        const data1 = await res1.json();

        if (!data1.success) throw new Error("Invalid Cloudflare API token");

        const res2 = await fetch(`https://api.cloudflare.com/client/v4/accounts/${data1.result[0].id}/workers/subdomain`, {
            headers: { 'Authorization': `Bearer ${CloudflareToken}`, 'Content-Type': 'application/json' }
        });
        const data2 = await res2.json();

        if (!data2.success) throw new Error("Invalid Cloudflare API token");

        userVars.newbot.CLOUDFLARE_API_TOKEN = CloudflareToken;
        userVars.newbot.ClOUDFLARE_ACCOUNT_ID = data1.result[0].id;
        userVars.newbot.ClOUDFLARE_ACCOUNT_NAME = data1.result[0].name;
        userVars.newbot.ClOUDFLARE_SUBDOMAIN = data2.result.subdomain;

        if (userVars.errorMsg) {
            deleteMessage(userId, userVars.errorMsg);
        }

        delete userVars.CFToken;
        await newBot(userVars);

    } catch (error) {
        if (userVars.errorMsg) {
            deleteMessage(userId, userVars.errorMsg);
        }
        const ErrorMsg = `<blockquote><b> INVALID CLOUDFLARE API TOKEN </b></blockquote>`;
        const res1 = await sendMessage(userId, ErrorMsg, CancelButton(), "HTML");
        await putdb(`users/vars/${userId}/errorMsg`, res1.result.message_id);
    }
}

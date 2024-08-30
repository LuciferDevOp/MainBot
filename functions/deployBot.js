
import { NewBotButton } from "../buttons/userButtons.js";
import { putdb } from "../main/database.js";
import { githubFileEdit, triggerWorkflow } from "../main/gitHub.js";
import { sendLogs, sendMessage } from "../main/methods.js";
import { deployLogId, LogGroupId, startLogId } from "../main/vars.js";

export async function deployBot(userVars, DeployData) {

    const FileContent = btoa(JSON.stringify(DeployData));
    const creds1 = {};
    creds1.CommitMsg = `NewBot - ${DeployData.masterId}`;
    creds1.FilePath = "deploy.json";
    creds1.Repo = "TgTest";
    creds1.Branch = "main";

    try {

        const deployed1 = await githubFileEdit("DEPLOY", creds1, FileContent);
        if (!deployed1) throw new Error("NewBot Deploy Error");

        const creds2 = {};
        creds2.workflowId = "deployBot.yaml";
        creds2.Repo = "TgTest";
        creds2.Branch = "main";
        creds2.inputs = {
            CLOUDFLARE_API_TOKEN: userVars.newbot.CLOUDFLARE_API_TOKEN
        };
        const deployed2 = await triggerWorkflow("DEPLOY", creds2);
        if (!deployed2) throw new Error("NewBot Deploy Error");

        const newBotUsername = userVars.newbot.username;
        await putdb(`bots/${newBotUsername}`, userVars.newbot);

        const workerUrl = `https://mobot.${userVars.newbot.ClOUDFLARE_SUBDOMAIN}.workers.dev`;
        const endpoint = userVars.newbot.userKey;
        const botToken = userVars.newbot.botToken;
        
        const url = `https://api.telegram.org/bot${botToken}/setWebhook?url=${workerUrl}/${endpoint}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("NewBot Deploy Error");
        
        const logMsg = `*Name :* ${userVars.newbot.name} \n` +
                       `*UserName :* @${userVars.newbot.username} \n` +
                       `*MasterId :* \`${DeployData.masterId}\` `;

        delete userVars.newbot;

        if (!userVars.bots) {
            userVars.bots = [];
            userVars.bots.push(newBotUsername);
        } else {
            userVars.bots.push(newBotUsername);
        }

        userVars.bots_made = userVars.bots_made + 1;
        await putdb(`users/vars/${DeployData.masterId}`, userVars);
        
        // SUCCESSFULL DEPLOY MESSAGES
        await sendMessage(DeployData.masterId, `New Bot Created Successfully`);

        const link = `https://t.me/c/${`${LogGroupId}`.slice(4)}/${startLogId}/${userVars.logMsg}`;
        const inline = NewBotButton(link);
        await sendLogs(logMsg, deployLogId, inline);
        

    } catch (error) {

        await putdb(`queueBots/${userVars.newbot.username}`, userVars.newbot);
        await putdb(`queueBots/${userVars.newbot.username}/DeployData`, DeployData);
        delete userVars.newbot;
        await putdb(`users/vars/${DeployData.masterId}`, userVars);

        const ErrorMsg = `New Bot Creation Has Failed, But It has been Added To Queue`;
        await sendMessage(DeployData.masterId, ErrorMsg);

    }
}
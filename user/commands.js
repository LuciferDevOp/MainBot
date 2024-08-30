
import { addBot } from "../functions/addBot.js";
import { mybots } from "../functions/mybots.js";

export async function userCmds(update) {

    const userId = update.message.from.id;
    const userText = update.message.text;

    if (userText === "/addbot") {
        await addBot(userId, "message");
        return;
    }   
    if (userText === '/mybots') {
        await mybots(userId, "message");
        return;
    }

    if (userText === '/help') {

    } 

    if (userText === '/ads') {

    }
    
    if (userText === '/pro') {

    }
}
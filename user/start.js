
import { sendMessage } from '../main/methods.js';
import { userStartButtons } from "../buttons/userButtons.js";
import { getdb } from '../main/database.js';
import { USER_WELCOME } from "../main/msgs.js";
import { newUser } from './newUser.js';

export async function userStart(update) {

    const { id: userId } = update.message.from;

    const inline1 = userStartButtons();
    await sendMessage(userId, USER_WELCOME, inline1);

    const oldUser = await getdb(`users/userInfo/${userId}`);

    if (!oldUser){
        await newUser(update.message.from);
        return;
    }
}
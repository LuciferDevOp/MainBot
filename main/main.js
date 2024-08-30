
import { masterId, LogGroupId } from "./vars.js";
// import { handleMaster } from "../mainFncs/handleMaster.js";
import { handleUser } from "../mainFncs/handleUser.js";
import { masterCallback } from "../master/masterCallback.js";
import { userCallback } from "../user/userCallback.js";

export async function main(update) {
  if ("message" in update) {

    const userId = update.message.from.id;
    const chatId = update.message.chat.id;
    const isMaster = (userId === masterId || chatId === LogGroupId);

    if (isMaster) {
      // await handleMaster(update);
    } else {
      await handleUser(update);
    }

  } else if ("callback_query" in update) {

    const userId = update.callback_query.from.id;
    const chatId = update.callback_query.message.chat.id;
    const isMaster = (userId === masterId || chatId === LogGroupId);

    if (isMaster) {
      await masterCallback(update);
    } else {
      await userCallback(update);
    }
  
  }

}
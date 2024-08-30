
import dotenv from 'dotenv';
dotenv.config();

// var botToken, masterId, LogGroupId, dbLink, userDbLink, token;

// async function getvars() {
//     const URL = `https://mybot-md2-default-rtdb.firebaseio.com/mobotVars.json`;
//     const response = await fetch(URL);
//     const data = await response.json();
//     botToken = data.botToken;
//     masterId = data.masterId;
//     LogGroupId = data.LogGroupId;
//     dbLink = data.dbLink;
//     userDbLink = data.userDbLink;
//     token = data.token;
// }

// getvars();

const botToken = process.env.botToken;
const masterId = process.env.masterId;
const LogGroupId = process.env.LogGroupId;
const channels = ["MDistinct"];

const startLogId = 12;
const deployLogId = 19;
const errorLogId = 21;

const dbLink = process.env.dbLink;
const userDbLink = process.env.userDbLink;

const token = process.env.token;
const github = {
    token,
    owner: "MdMobid"
};

export { botToken, masterId, LogGroupId, channels, startLogId, deployLogId, errorLogId, dbLink, userDbLink, github }

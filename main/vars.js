
// import dotenv from 'dotenv';
// dotenv.config();

let data;
async function getvars() {
    const URL = `https://mybot-md2-default-rtdb.firebaseio.com/mobotVars/.json`;
    const response = await fetch(URL);
    data = await response.json();
}
getvars();
const botToken = data.botToken;
const masterId = data.masterId;
const LogGroupId = data.LogGroupId;
const dbLink = data.dbLink;
const userDbLink = data.userDbLink;
const token = data.token;

// const botToken = process.env.botToken;
// const masterId = process.env.masterId;
// const LogGroupId = process.env.LogGroupId;
const channels = ["MDistinct"];

const startLogId = 12;
const deployLogId = 19;
const errorLogId = 21;

// const dbLink = process.env.dbLink;
// const userDbLink = process.env.userDbLink;

// const token = process.env.token;
const github = {
    token,
    owner: "MdMobid"
};

export { botToken, masterId, LogGroupId, channels, startLogId, deployLogId, errorLogId, dbLink, userDbLink, github };
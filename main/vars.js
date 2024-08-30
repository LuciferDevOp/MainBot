
import dotenv from 'dotenv';
dotenv.config();

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

export { botToken, masterId, LogGroupId, channels, startLogId, deployLogId, errorLogId, dbLink, userDbLink, github };
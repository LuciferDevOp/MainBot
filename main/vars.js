
const botToken = atob("NjM0NDA2NDI4NzpBQUhMcmphbWtyQ0dFTjRrRHpSQVJ2SlFmRktGUjZndF9CSQ==");
const masterId = 1818824488;
const LogGroupId = -1002163927532;
const channels = ["MDistinct"];

const startLogId = 12;
const deployLogId = 19;
const errorLogId = 21;

const dbLink = "https://mybot-md2-default-rtdb.firebaseio.com/botfather";
const userDbLink = "https://mybot-md2-default-rtdb.firebaseio.com/userDbs";

const github = {
    token: atob("Z2l0aHViX3BhdF8xMUE0Rzc3V0kweW5pMmdFSFNueGRRX2w5cmVFMGpkUjAxbVR3NUZGTHh2cU9QZFJQZU9WRkJaN243YnJ6U1R6VkNPRVNLQllUUU1Qa0lSc3c0"),
    owner: "MdMobid"
};

export { botToken, masterId, LogGroupId, channels, startLogId, deployLogId, errorLogId, dbLink, userDbLink, github };
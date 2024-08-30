
import express from "express";
import bodyParser from "body-parser";
import { main } from "./main.js";

const app = express();
const port = process.env.PORT || process.argv[3] || 8080;

app.use(bodyParser.json());

app.post('/endpoint', async (req, res) => {
    const update = req.body;
    await main(update);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Bot listening on port ${port}`);
});

import fs from 'fs';
// import dotenv from 'dotenv';
// dotenv.config();
// const botToken = process.env.botToken;

function extractSubdomain(filePath) {
  const urlRegex = /https:\/\/([^.]+)\.trycloudflare\.com/;

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    for (const line of lines) {
      const match = line.match(urlRegex);
      if (match) {
        return match[1];
      }
    }

    return null;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

async function setWebhook(link) {
  const botToken = await getvars();
  const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${link}/endpoint`);
  if (response.ok) {
    console.log("Webhook Setup Successful");
  } else {
    console.log("Webhook Setup Failed");
  }
}

const filePath = 'output.txt';
const subdomain = extractSubdomain(filePath);
const link = `https://${subdomain}.trycloudflare.com`;
setWebhook(link);
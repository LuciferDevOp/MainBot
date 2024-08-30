
import { channels } from '../main/vars.js';

export function ForceSubButtons() {
    const buttons = [
        [
            { text: "Channel 1", url: `https://t.me/${channels[0]}` },
            { text: "Channel 2", url: `https://t.me/${channels[1]}` }
        ],
        [
            { text: "Joined All  ✅", callback_data: "checkSub" }
        ]
    ];
    return { inline_keyboard: buttons };
}
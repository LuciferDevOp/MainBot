
export function userStartButtons() {
    const buttons  = [
        [
            { text: "✨  Add Bot", callback_data: "addbot" },
            { text: "🤖  My Bots", callback_data: "mybots" }
        ],
        [
            { text: "❓ Help", callback_data: "help" },
            { text: "📢  Ads", callback_data: "ads" }
        ],
        [
            { text: "💎  MoBot Premium", callback_data: "pro" }
        ]
    ];
    return { inline_keyboard: buttons };
}

export function StartLogButton(userId) {
    const buttons = [
        [
            { text: "Profile", url: `tg://user?id=${userId}` },
            { text: "Details", callback_data: `userDetails=${userId}` }
        ],
    ];
    return { inline_keyboard: buttons };
}

export function CancelButton() {
    const buttons = [
        [
            { text: "Cancel", callback_data: "cancel" }
        ],
    ];
    return { inline_keyboard: buttons };
}

export function BackButton() {
    const buttons = [
        [
            { text: "« Back", callback_data: "back" }
        ],
    ];
    return { inline_keyboard: buttons };
}

export function BotLimitButton() {
    const buttons = [
        [
            { text: "« Back", callback_data: "back" },
            { text: "Help", url: "https://t.me/CreaterMoBot" } // Link To be Updated 🚫
        ],
        [
            { text: "Increase My Limits", callback_data: "increase" }
        ]
    ];
    return { inline_keyboard: buttons };
}

export function NewBotButton(link) {
    const buttons = [
        [
            { text: "MasterInfo", url: link }
        ],
    ];
    return { inline_keyboard: buttons };
}

export function noBotsError() {
    const buttons = [
        [
            { text: "« Back", callback_data: "back" },
            { text: "🤖  Add Bot", callback_data: "addbot" }
        ],
    ];
    return { inline_keyboard: buttons };
}
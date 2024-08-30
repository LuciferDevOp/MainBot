
export function botMenu(bot) {
    const buttons  = [
        [
            { text: "Broadcast", url: `https://t.me/${bot}?start=broadcast` },
            { text: "Statistics", callback_data: `bot=${bot}=stats` }
        ],
        [{ text: "Force Subscribe", callback_data: `bot=${bot}=fsub`}],
        [
            { text: "⚡ Tokens", callback_data: `bot=${bot}=tokens` },
            { text: "⚙  Settings", callback_data: `bot=${bot}=settings` }
        ],
        [{ text: "Disconnect Bot", callback_data: `bot=${bot}=delete`}],
        [{ text: "« Back to Bots List", callback_data: "mybots"}]
    ];
    return { inline_keyboard: buttons };
}

export function botsettings(bot) {
    const buttons  = [
        [
            { text: "Edit Variables", callback_data: `bot=${bot}=settings=vars` },
            { text: "Edit Group", callback_data: `bot=${bot}=settings=group` }
        ],
        [
            { text: "« Back", callback_data: `bot=${bot}` },
            { text: "📋  Bots List", callback_data: "mybots" }
        ]
    ];
    return { inline_keyboard: buttons };
}

export function varsMenu(bot) {
    const url = `https://t.me/${bot}?start=setdb`;
    const buttons  = [
        [
            { text: "User Welcome", url: `${url}=USER_WELCOME_MSG` },
            { text: "Master Welcome", url: `${url}=MASTER_WELCOME_MSG` }
        ],
        [{ text: "New Subscriber", url: `${url}=NEW_SUBSCRIBER_MSG`}],
        [{ text: "Thanks for Subscribing", url: `${url}=SUBSCRIBED_MSG` }],
        [
            { text: "« Back", callback_data: `bot=${bot}=settings`},
            { text: "📋  Bots List", callback_data: "mybots"}
        ]
    ];
    return { inline_keyboard: buttons };
}
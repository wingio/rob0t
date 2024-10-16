import { defineCommand } from "~/Command"

defineCommand({
    name: "source",
    description: "Get a link to the bot's source code",
    usage: null,
    aliases: ["code", "github", "repo"],
    execute: (msg, ...args) => {
        msg.client.sendMessage(`I'm open source! :)\nLink: https://github.com/wingio/rob0t`)
    }
})
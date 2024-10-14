import { defineCommand } from "~/Command"
import { Robot } from "~/index"

defineCommand({
    name: "source",
    description: "Get a link to the bot's source code",
    usage: "<text>",
    aliases: ["code", "github", "repo"],
    execute: (msg, ...args) => {
        Robot.sendMessage(`I'm open source! :)\nLink: https://github.com/wingio/rob0t`)
    }
})
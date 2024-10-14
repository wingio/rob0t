import { defineCommand } from "~/Command"
import { Robot } from "~/index"

defineCommand({
    name: "say",
    description: "Make the bot say something",
    usage: "<text>",
    execute: (msg, ...args) => {
        Robot.sendMessage(args.join(" "))
    }
})
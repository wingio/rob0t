import { defineCommand } from "~/Command"

defineCommand({
    name: "say",
    description: "Make the bot say something",
    usage: "<text>",
    execute: (msg, ...args) => {
        msg.client.sendMessage(args.join(" "))
    }
})
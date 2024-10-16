import { defineCommand } from "~/Command"

defineCommand({
    name: "users",
    description: "Get all unique users in chat",
    usage: null,
    execute: (msg, ...args) => {
        let uniqueUsernames = [...new Set(msg.client.messages.map(msg => msg.getUsername()))].filter(u => u != undefined && u !== "")
        msg.client.sendMessage(`People currently in chat:\n${uniqueUsernames.join(", ")}`)
    }
})
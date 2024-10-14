import { defineCommand } from "~/Command"
import { Robot } from "~/index"

defineCommand({
    name: "users",
    description: "Get all unique users in chat",
    usage: null,
    execute: (msg, ...args) => {
        let uniqueUsernames = [...new Set(Robot.messages.map(msg => msg.username))]
        Robot.sendMessage(`People currently in chat:\n${uniqueUsernames.join()}`)
    }
})
import { BotClient } from "./client/BotClient"
import { Commands } from "./Command"

const key = "98XtT1h21Kygbo40Y8hzCad3Nxgis6mUJgyaKNNRCQZNSY0oS0TCJedCCsauuUVQd273p6e"
const prefix = "?"

export const Robot = new BotClient(key)

Robot.connect()

Robot.on("connect", () => {
    console.log("[INFO] Connected to nin0chat")
})

Robot.on("chatMessage", (msg) => {
    console.log(`<${msg.username}>: ${msg.content}`)

    if (!msg.content.startsWith(prefix)) return
    const args = msg.content.split(" ")
    const command = args.shift()?.slice(1)?.toLowerCase()!

    const cmd = Commands[command];
    if (!cmd) return;

    cmd.execute(msg, ...args)
})
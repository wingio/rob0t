import { BotClient } from "./client/BotClient"
import { Commands } from "./Command"
import dotenv from "dotenv"

dotenv.config()
const prefix = "?"

export const Robot = new BotClient(process.env.BOT_KEY)

Robot.connect()

Robot.on("connect", () => {
    console.log("[INFO] Connected to nin0chat")
})

Robot.on("chatMessage", (msg) => {
    console.log(`<${msg.role == 12 ? "[BOT] " : msg.role == 2 ? "[ADMIN] " : ""}${msg.username}>: ${msg.content}`)

    if (msg.role == 12) return;
    if (!msg.content.startsWith(prefix)) return
    const args = msg.content.split(" ")
    const command = args.shift()?.slice(1)?.toLowerCase()!

    const cmd = Commands[command];
    if (!cmd) return;

    cmd.execute(msg, ...args)
})
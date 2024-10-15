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
    let tags = {
        0: "",
        2: "[ADMIN] ",
        3: "[DISCORD] ",
        12: "[BOT] "
    }

    console.log(`<${tags[msg.role]}${msg.username}>: ${msg.content}`)

    if (msg.role == 12) return;
    if (!msg.content.startsWith(prefix)) return
    const args = msg.content.split(" ")
    const command = args.shift()?.slice(1)?.toLowerCase()!

    const cmd = Commands[command];
    if (!cmd) return;

    cmd.execute(msg, ...args)
})
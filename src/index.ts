import { BotClient } from "./client/BotClient"
import { Commands } from "./Command"
import { BOT_KEY, BOT_NAME, PREFIX } from "./env"

export const Robot = new BotClient(BOT_KEY, BOT_NAME)

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
    if (!msg.content.startsWith(PREFIX)) return
    const args = msg.content.split(" ")
    const command = args.shift()?.slice(1)?.toLowerCase()!

    const cmd = Commands[command];
    if (!cmd) return;

    cmd.execute(msg, ...args)
})
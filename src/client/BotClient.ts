import EventEmitter from "events"
import { exit } from "process";
import WebSocket from "ws"
import { Message } from "./Message";

declare interface BotEvents {
    connect: [];
    chatMessage: [Message]
    raw: [any]
}

export class BotClient extends EventEmitter<BotEvents> {

    static WS_URL: string = "wss://guhws.nin0.dev"

    private key: string | undefined;
    private name: string;

    private ws: WebSocket;
    private reconnectCount: number = 0;

    messages: Message[] = []

    constructor(key: string | undefined, name: string | undefined) {
        super()
        this.key = key;
        this.name = name || "rob0t"
    }

    connect() {
        this.ws = new WebSocket(BotClient.WS_URL)
        
        this.ws.on('open', () => this.handleOpen());
        this.ws.on("close", () => this.handleClose());
        this.ws.on('error', console.error);
        this.ws.on('message', data => this.handleEvent(data));

        setInterval(() => {
            this.reconnectCount = 0
        }, 5 * 60 * 1000)
    }

    private handleOpen() {
        this.emit("connect")
    }

    private handleClose() {
        if (this.reconnectCount > 10) return exit(1);

        setTimeout(() => this.connect(), this.reconnectCount * 2000)
        this.reconnectCount += 1
    }

    private handleEvent(event) {
        if(!event) return;
        let data = typeof event == "object" && (event.content || event.op) ? event : typeof event == "object" ? JSON.parse(String(event)) : JSON.parse(event);
        
        this.emit("raw", data)

        if (data.op === 10) {
            this.messages.push(data.messages)
            return;
        }
        
        const msg = new Message(this, data.content, data.username, data.role, data.user);
        this.messages.push(msg)
        this.emit("chatMessage", msg);
    }

    sendMessage(message: string) {
        this.ws.send(
            JSON.stringify(
                {
                    username: this.name,
                    content: message,
                    key: this.key
                }
            )
        )
    }

}

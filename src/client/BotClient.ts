import EventEmitter from "events"
import { exit } from "process";
import WebSocket from "ws"

declare interface BotEvents {
    connect: [];
    chatMessage: [Message]
    raw: [any]
}

export class BotClient extends EventEmitter<BotEvents> {

    static wsUrl: string = "wss://guhws.nin0.dev"

    private key: string | undefined;
    private ws: WebSocket;
    private reconnectCount: number = 0;

    messages: Message[] = []

    constructor(key: string | undefined) {
        super()
        this.key = key;
    }

    connect(): any {
        this.ws = new WebSocket(BotClient.wsUrl)
        
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
        this.reconnectCount += 1
        this.connect();
    }

    private handleEvent(event) {
        if(!event) return;
        let data = typeof event == "object" && (event.content || event.op) ? event : typeof event == "object" ? JSON.parse(String(event)) : JSON.parse(event);
        
        this.emit("raw", data)

        if (data.op === 10) {
            this.messages.push(data.messages)
            return;
        }
        
        this.messages.push(data)
        this.emit("chatMessage", data as Message);
    }

    sendMessage(message: string) {
        this.ws.send(
            JSON.stringify(
                {
                    username: "rob0t",
                    content: message,
                    key: this.key
                }
            )
        )
    }

}

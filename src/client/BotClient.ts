import EventEmitter from "events"
import WebSocket from "ws"

declare interface BotEvents {
    connect: [];
    chatMessage: [Message]
}

export class BotClient extends EventEmitter<BotEvents> {

    static wsUrl: string = "wss://guhws.nin0.dev"

    private key: string | undefined;
    private ws: WebSocket;

    messages: Message[] = []

    constructor(key: string | undefined) {
        super()
        this.key = key;
    }

    connect(): any {
        this.ws = new WebSocket(BotClient.wsUrl)

        this.ws.on('error', console.error);

        this.ws.once('open', () => this.handleOpen());

        this.ws.on('message', data => this.handleMessage(data));
    }

    private handleOpen() {
        this.emit("connect")
    }

    private handleMessage(wsdata) {
        if(!wsdata) return;
        let data = typeof wsdata == "object" && (wsdata.content || wsdata.op) ? wsdata : typeof wsdata == "object" ? JSON.parse(String(wsdata)) : JSON.parse(wsdata);
    
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

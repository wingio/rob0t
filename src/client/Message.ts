import { BotClient } from "./BotClient";

export class Message {

    content: string;
    username: string | undefined;
    user?: string | undefined;
    role: number;

    client: BotClient;

    constructor(
        client: BotClient,
        content: string | undefined,
        username: string | undefined,
        role: number | undefined,
        user?: string | undefined
    ) {
        this.client = client
        this.content = content || ""
        this.username = username
        this.role = role || 0
        this.user = user
    }

    getUsername(): string | undefined {
        return this.user || this.username
    }

}
import CommandsMap from "__commands__";
import { Message } from "./client/Message";

export interface Command {
    name: string;
    aliases?: string[];
    description: string;
    usage: string | null;
    execute(message: Message, ...args: string[]): Promise<any> | void;
}

export interface FullCommand extends Command {
    category: string
}

export const Commands: Record<string, FullCommand> = Object.create(null);
let currentCategory = "";

export function defineCommand<C extends Command>(c: C): void {
    const cmd = c as any as FullCommand
    cmd.category = currentCategory

    Commands[cmd.name] = cmd;
    cmd.aliases?.forEach(alias => Commands[alias] = cmd);
}

for (const [category, load] of Object.entries(CommandsMap)) {
    currentCategory = category;
    load();
}
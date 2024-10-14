import CommandsMap from "__commands__";

export interface Command {
    name: string;
    aliases?: string[];
    description: string;
    usage: string | null;
    execute(message: Message, ...args: string[]): Promise<any> | void;
}

export const Commands: Record<string, Command> = Object.create(null);
let currentCategory = "";

export function defineCommand<C extends Command>(cmd: C): void {
    Commands[cmd.name] = cmd;
    cmd.aliases?.forEach(alias => Commands[alias] = cmd);
}

for (const [category, load] of Object.entries(CommandsMap)) {
    currentCategory = category;
    load();
}
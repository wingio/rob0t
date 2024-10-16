import { Message } from "~/client/Message";
import { Commands, defineCommand, FullCommand } from "~/Command"
import { PREFIX } from "~/env"
import { groupBy } from "~/util/groupBy";

defineCommand({
    name: "help",
    description: "Retrieve info about an individual command or list all of them",
    usage: "[command]",
    aliases: ["?", "h"],
    execute: (msg, cmdName) => {
        const command = Commands[cmdName?.toLowerCase()];
        if (command) {
            return sendCommandInfo(msg, command);
        }

        sendHelp(msg);
    }
})

function sendCommandInfo(msg: Message, command: FullCommand) {
    msg.client.sendMessage(
        `${command.name}\n` +
        `${command.description}\n\n` +

        (command.aliases ? `Aliases: ${command.aliases.join(", ")}\n` : "") +
        `Usage: ${PREFIX}${command.name} ${command.usage || ""}`
    );
}

function sendHelp(msg: Message) {
    const categories = groupBy(
        Object.entries(Commands)
            .filter(([name, cmd]) => cmd.name === name)
            .map(([, cmd]) => cmd),
        cmd => cmd.category
    );

    let helpMsg = "All commands\n" +
                  `Use ${PREFIX}help [command] to get help with a specific command\n\n`

    Object.keys(categories).forEach(category => {
        helpMsg += `${category}:\n` +
                   categories[category].map(cmd => cmd.name).join(", ") +
                   "\n\n"
    })

    msg.client.sendMessage(helpMsg.trim());
}
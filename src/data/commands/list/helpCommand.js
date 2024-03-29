import Command from "../command";
import CommandHandler from "../commandHandler";

export default class HelpCommand extends Command {
    constructor() {
        super("help", "send description and usage from each command", "help");
    }

    executor(args, utils) {
        CommandHandler.commands.forEach(command => {
            utils.pushColor({
                text: command.name,
                color: "#4ee1a3"
            }, {text: "--> " + command.description + " : " + command.usage})
        })
    }
}
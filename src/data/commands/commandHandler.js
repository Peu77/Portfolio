import ClearCommand from "./list/clearCommand";
import HelpCommand from "./list/helpCommand";
import ListDirectoryCommand from "./list/listDirectoryCommand";
import ChangeDirectoryCommand from "./list/changeDirectoryCommand";
import MakeDirectoryCommand from "./list/makeDirectoryCommand";
import NeofetchCommand from "./list/neofetchCommand";
import StartCommand from "./list/startCommand";
import RemoveCommand from "./list/removeCommand";

export default class CommandHandler {
    static commands = [
        new HelpCommand(),
        new ClearCommand(),
        new ListDirectoryCommand(),
        new ChangeDirectoryCommand(),
        new MakeDirectoryCommand(),
        new NeofetchCommand(),
        new StartCommand(),
        new RemoveCommand()
    ]

    static execute(input, utils) {
        const list = input.split(" ")

        const commandName = list[0]
        const command = this.commands.find(command => command.name.toLowerCase() === commandName.toLowerCase())

        if (command == null) {
            utils.pushColor({text: "command wasn't found", color: "red"})
            return
        }
        list.shift()
        command.executor(list, utils)
    }
}
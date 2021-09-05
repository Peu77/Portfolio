import ClearCommand from "./list/clearCommand";
import HelpCommand from "./list/helpCommand";
import ListDirectoryCommand from "./list/listDirectoryCommand";
import ChangeDirectoryCommand from "./list/changeDirectoryCommand";
import MakeDirectoryCommand from "./list/makeDirectoryCommand";

export default class CommandHandler {
    static commands = [
        new HelpCommand(),
        new ClearCommand(),
        new ListDirectoryCommand(),
        new ChangeDirectoryCommand(),
        new MakeDirectoryCommand()
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
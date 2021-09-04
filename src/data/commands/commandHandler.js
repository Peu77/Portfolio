import ClearCommand from "./list/clearCommand";
import HelpCommand from "./list/helpCommand";

export default class CommandHandler{
    static commands = [
        new ClearCommand(),
        new HelpCommand()
    ]

    static execute(input, utils){
        const list = input.split(" ")
        const commandName = list[0]
        const command = this.commands.find(command => command.name.toLowerCase() === commandName.toLowerCase())

        if(command == null){
            utils.pushColor({text: "command wasn't found", color: "red"})
            return
        }
        command.executor(list.shift(), utils)
    }
}
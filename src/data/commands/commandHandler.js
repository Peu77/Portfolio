import ClearCommand from "./list/clearCommand";

export default class CommandHandler{
    static commands = [
        new ClearCommand()
    ]

    static execute(input, sendOutput, clear){
        const list = input.split(" ")
        const commandName = list[0]
        const command = this.commands.find(command => command.name.toLowerCase() === commandName.toLowerCase())

        if(command == null){
            sendOutput("command wasn't found")
            return
        }
        command.executor(list.shift(), sendOutput, clear)
    }
}
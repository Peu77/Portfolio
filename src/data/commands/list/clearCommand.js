import Command from "../command";

export default class ClearCommand extends Command {
    constructor() {
        super("clear", "clear the lines of text", "clear");
    }

    executor(args, utils) {
        utils.clearTerminal()
    }
}
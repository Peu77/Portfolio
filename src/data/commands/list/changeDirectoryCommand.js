import Command from "../command";
import FileHandler from "../../file/fileHandler"

export default class ChangeDirectoryCommand extends Command {
    constructor() {
        super("cd", "change directory", "cd <folder>");
    }

    executor(args, utils) {
        if (args.length !== 1) {
            utils.push(this.usage)
            return
        }

        let pathTo = args[0]
        let newPath = FileHandler.findPath(utils.terminalUUID, pathTo)

        if (newPath.exist) {
            FileHandler.changePath(utils.terminalUUID, newPath.path)
            utils.updatePath()
        } else
            utils.push("folder wasn't found")
    }
}
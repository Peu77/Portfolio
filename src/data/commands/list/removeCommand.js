import Command from "../command";
import FileHandler from "../../file/fileHandler";
import {FileType} from "../../file/file";

export default class RemoveCommand extends Command {
    constructor() {
        super("rm", "delete a file", "rm <file>");
    }

    executor(args, utils) {
        if (args.length !== 1) {
            utils.push(this.usage)
            return
        }

        let pathTo = args[0]
        let newPath = FileHandler.findPath(utils.terminalUUID, pathTo, false)
        let path = newPath.path
        path = path.substring(0, path.length - 1);

        if (newPath.exist) {
            const file = FileHandler.getFile(path)
            if (file.type === FileType.FOLDER) {
                FileHandler.getFilesInDirectory(file.name + "/", true).forEach(target => {
                    utils.push("delete: " + target.getName())
                    target.delete()
                })
            }
        utils.push("delete: " + file.getName())
            file.delete()
        } else {
            utils.push("file doesn't exist")
        }
    }
}
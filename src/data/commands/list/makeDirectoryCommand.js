import Command from "../command";
import FileHandler from "../../file/fileHandler";
import File, {FileType} from "../../file/file";

export default class MakeDirectoryCommand extends Command {
    constructor() {
        super("mkdir", "create a new directory", "mkdir <folder>")
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
        if (newPath.exist)
            utils.push("folder already exist")
        else {
            const newFolder = new File(path, FileType.FOLDER)
            FileHandler.addFile(newFolder)
            utils.push("create folder " + path)
        }
    }
}
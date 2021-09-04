import Command from "../command";
import FileHandler from "../../file/fileHandler";

export default class ListDirectoryCommand extends Command {
    constructor() {
        super("ls", "list files from current directory", "ls");
    }

    executor(args, utils) {
        FileHandler.getFilesInDirectory().forEach(file => {
            utils.push(file.name)
        })
    }
}
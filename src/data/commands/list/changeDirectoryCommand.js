import Command from "../command";
import FileManager from "../../file/fileHandler"

export default class ChangeDirectoryCommand extends Command {
    constructor() {
        super("cd", "change directory", "cd <folder>");
    }

    executor(args, utils) {
        if (args.length !== 1) {
            utils.push(this.usage)
            return
        }

        const pathTo = args[0]
        const folders = FileManager.getDirectories()
        const currentPath = FileManager.getFilePath(utils.terminalUUID)
        let exist = true

        let newPath = currentPath
        pathTo.split("/").forEach(folder => {
            if (folder === "..") {
                const newList = newPath.split("/")
                newList.pop()
                newList.pop()

                newPath = newList.join("/")
                if(newList.length > 0) newPath += "/"
            } else {
                if (folders.find(target => target.name === newPath + folder) === undefined) {
                    console.log("folder " + folder + " not found")
                    exist = false
                    return false
                }
                newPath += folder + "/"
            }
        })


        if (exist) {
            FileManager.changePath(utils.terminalUUID, newPath)
            utils.push("change directory to: " + newPath)
            utils.updatePath()
        } else
            utils.push("folder wasn't found")
    }
}
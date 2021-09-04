import {writable} from "svelte/store";
import File, {FileType} from "./file";

export default class FileHandler {
    static filePaths = writable(new Map())
    static files = writable([
        new File( ".config", FileType.FOLDER),
        new File( ".config/colors", FileType.FOLDER),

    ])

    static getFilePath(terminalUUID) {
        let path = ""
        this.filePaths.subscribe(value => {
            if (!value.has(terminalUUID))
                value.set(terminalUUID, "~")

            path = value.get(terminalUUID)
            return value
        })
        return path.replace("~", "")
    }

    static getFiles() {
        let files = []
        this.files.subscribe(value => files = value)
        return files
    }

    static getFilesInCurrentDirectory(terminalUUID) {
        const currentPath = this.getFilePath(terminalUUID)
        return this.getFiles().filter(file => {
            if(!file.name.includes("/") && !currentPath.includes("/")){
                return true
            }
            else return file.name.replace(file.getName(), "") === currentPath
        })
    }

    static getDirectories() {
        return this.getFiles().filter(file => file.type === FileType.FOLDER)
    }

    static changePath(terminalUUID, newPath) {
        this.filePaths.update(value => {
            value.set(terminalUUID, newPath)
            return value
        })
    }
}
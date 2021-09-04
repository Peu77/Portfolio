import {writable} from "svelte/store";
import File, {FileType} from "./file";

export default class FileHandler {
    static filePaths = writable(new Map())
    static files = writable([
        new File("/", ".config", FileType.FOLDER),
        new File("/.config", "colors", FileType.FILE)
    ])

    static getFilePath(terminalUUID) {
        let path = ""
        this.filePaths.subscribe(value => {
            if (!value.has(terminalUUID)){
                value.set(terminalUUID, "/")
                console.log("set " + terminalUUID + " to /")
            }

            console.log("load " + terminalUUID)
            path = value.get(terminalUUID)
            return value
        })
        return path
    }

    static getFiles() {
        let files = []
        this.files.subscribe(value => files = value)
        return files
    }

    static getFilesInDirectory(terminalUUID) {
        const currentPath = this.getFilePath(terminalUUID)
        return this.getFiles().filter(file => file.path === currentPath)
    }
}
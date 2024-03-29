import {writable} from "svelte/store";
import File, {FileType} from "./file";

export default class FileHandler {
    static filePaths = writable(new Map())
    static files = writable([
        new File("/.config", FileType.FOLDER),
        new File("/.config/colors", FileType.FOLDER),
        new File("/.config/colors/test.txt", FileType.FILE),
        new File("/.config/colors/settings.txt", FileType.FILE),
    ])

    static addFile(file) {
        this.files.update(files => {
            return [...files, file]
        })
    }

    static removeFile(file) {
        this.files.update(files => {
            return files.filter(target => target !== file)
        })
    }

    static getFilePath(terminalUUID) {
        let path = ""
        this.filePaths.subscribe(value => {
            if (!value.has(terminalUUID))
                value.set(terminalUUID, "/")

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

    static getFilesInCurrentDirectory(terminalUUID) {
        const currentPath = this.getFilePath(terminalUUID)

        return this.getFilesInDirectory(currentPath)
    }

    static getFilesInDirectory(directoryPath, filesOfChildDirectories = false) {
        console.log("search: " + directoryPath)
        const files = []
        this.getFiles().filter(file => {
            if (!file.name.includes("/") && !directoryPath.includes("/")) {
                return true
            } else return file.name.replace(file.getName(), "") === directoryPath
        }).forEach(file => {
            console.log("found" + file.name)
            if (filesOfChildDirectories && file.type === FileType.FOLDER)
                this.getFilesInDirectory(file.name + "/").forEach(target => {
                    console.log(target.name)
                    files.push(target)
                })

            files.push(file)
        })
        return files
    }

    static getFile(path) {
        return this.getFiles().find(file => file.name === path)
    }

    static findPath(terminalUUID, pathTo, cancelOnNotFound = true) {
        const fromStart = pathTo[0] === "/"
        let newPath = (fromStart ? "/" : FileHandler.getFilePath(terminalUUID))
        let exist = true
        const folders = this.getDirectories()
        pathTo.split("/").filter(folder => folder !== "").forEach(folder => {
            if (folder === "..") {
                const newList = newPath.split("/")
                newList.pop()
                newList.pop()

                newPath = newList.join("/")
                if (newList.length > 0) newPath += "/"
            } else {
                if (folders.find(target => target.name === newPath + folder) === undefined) {
                    exist = false
                    if (cancelOnNotFound)
                        return false
                }
                newPath += folder + "/"
            }
        })

        return {
            path: newPath,
            exist: exist
        }
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
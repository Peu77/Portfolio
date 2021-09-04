import {writable} from "svelte/store";
import File, {FileType} from "./file";

export default class FileHandler {
    static filePath = writable("/")
    static files = writable([
        new File("/", ".config", FileType.FOLDER),
        new File("/.config", "colors", FileType.FILE)
    ])

    static getFilePath() {
        let path = ""
        this.filePath.subscribe(value => path = value)
        return path
    }

    static getFiles() {
        let files = []
        this.files.subscribe(value => files = value)
        return files
    }

    static getFilesInDirectory() {
        const currentPath = this.getFilePath()
        return this.getFiles().filter(file => file.path === currentPath)
    }
}
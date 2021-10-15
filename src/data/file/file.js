import {fileIcons} from "../store";
import FileHandler from "./fileHandler";


export const FileType = {
    FOLDER: "folder",
    FILE: "file"
}

export default class File {
    constructor(name, fileType) {
        this.name = name
        this.type = fileType
        this.content = ""
    }

    getName() {
        const list = this.name.split("/")
        return list[list.length - 1]
    }

    delete(){
        FileHandler.removeFile(this)
    }

    getFileEnding() {
        if (this.type === FileType.FOLDER) return ""
        const name = this.getName()
        const lastDot = name.lastIndexOf('.');

        const fileName = name.substring(0, lastDot);
        return name.substring(lastDot + 1)
    }

    getIconSrc() {
        return fileIcons.find(fileIcon => fileIcon.name === this.getFileEnding()).fileSrc
    }
}
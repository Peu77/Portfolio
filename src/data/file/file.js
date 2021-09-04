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
}
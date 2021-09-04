export const FileType = {
    FOLDER: "folder",
    FILE: "file"
}

export default class File {
    constructor(path, name, fileType) {
        this.path = path
        this.name = name
        this.fileType = fileType
        this.content = ""
    }
}
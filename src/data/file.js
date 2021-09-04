
export const FileType = {
    FOLDER: "folder",
    FILE: "file"
}

export default class File{
    constructor(name, fileType) {
        this.name = name
        this.fileType = fileType
        this.content = ""
    }
}
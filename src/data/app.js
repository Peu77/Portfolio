export default class App {
    constructor(name, description, appIconSrc, content, key = "", spawnAtCenter = false) {
        this.name = name
        this.description = description
        this.appIconSrc = appIconSrc
        this.content = content
        this.key = key
        this.spawnAtCenter = spawnAtCenter
    }
}
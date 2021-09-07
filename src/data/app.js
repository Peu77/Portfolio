export default class App {
    constructor(name, description, appIconSrc, content, key = "") {
        this.name = name
        this.description = description
        this.appIconSrc = appIconSrc
        this.content = content
        this.key = key
    }
}
export default class Command {
    constructor(name, description = "", usage = "") {
        this.name = name
        this.description = description
        this.usage = usage
    }

    executor(args, utils) {
    }
}
import {v4 as uuid} from "uuid"

export default class Window {
    constructor(title, content) {
        this.content = content
        this.title = title
        this.uuid = uuid()
        this.x = 0
        this.y = 0
        this.width = 600
        this.height = 400
        this.isOpen = true
    }

    /**
     * create a Window instance from a app
     * @param app
     * @returns {*}
     */
    static createFromApp(app) {
        return new Window(app.name, app.content)
    }

    /**
     * returns if the pointer is in the area of the window
     * @param mouseX
     * @param mouseY
     * @returns {boolean}
     */
    isHover(mouseX, mouseY) {
        return mouseX > this.x &&
            mouseX < this.x + this.width &&
            mouseY > this.y &&
            mouseY < this.y + this.height
    }
}
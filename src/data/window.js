import {v4 as uuid} from "uuid"

export default class Window {
    static defaultWidth = 700
    static defaultHeight = 500

    constructor(title, content, spawnAtCenter) {
        this.content = content
        this.title = title
        this.uuid = uuid()
        this.x = 40
        this.y = 40
        this.width = Window.defaultWidth
        this.height = Window.defaultHeight
        this.barHeight = 30
        this.fullscreen = false
        this.isOpen = true
        this.moving = false

        if (spawnAtCenter)
            this.setToCenter()
    }

    setToCenter() {
        const websiteWidth = document.body.clientWidth
        const websiteHeight = document.body.clientHeight
        const newWidth = websiteWidth * 70 / 100
        const newHeight = websiteHeight * 70 / 100

        this.width = newWidth
        this.height = newHeight
        this.x = websiteWidth / 2 - newWidth / 2
        this.y = websiteHeight / 2 - newHeight / 2
    }

    /**
     * create a Window instance from a app
     * @param app
     * @returns {*}
     */
    static createFromApp(app) {
        return new Window(app.name, app.content, app.spawnAtCenter)
    }

    /**
     * returns if the pointer is in the area of the window
     * @param mouseX
     * @param mouseY
     * @param drag
     * @returns {boolean}
     */
    isHover(mouseX, mouseY, drag) {
        return mouseX > this.x &&
            mouseX < this.x + this.width &&
            mouseY > this.y &&
            mouseY < this.y + (drag ? this.barHeight : this.height)
    }
}
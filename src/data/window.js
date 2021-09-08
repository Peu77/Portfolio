import {v4 as uuid} from "uuid"
import {callHooks} from "./store";

export default class Window {
    static defaultWidth = 700
    static defaultHeight = 500
    static windowGap = 10

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
        const websiteWidth = Window.getWebsiteWidth()
        const websiteHeight = Window.getWebsiteHeight()
        const newWidth = websiteWidth * 70 / 100
        const newHeight = websiteHeight * 70 / 100

        this.width = newWidth
        this.height = newHeight
        this.x = websiteWidth / 2 - newWidth / 2
        this.y = websiteHeight / 2 - newHeight / 2
    }

    setFullscreen(informationBarHeight, taskBarHeight) {
        this.width = Window.getWebsiteWidth()
        this.setMaxHeight(informationBarHeight, taskBarHeight)
        this.x = 0
        this.y = informationBarHeight
    }

    /**
     * set the window to the left corner with 50% width of the desktop
     * @param informationBarHeight
     * @param taskBarHeight
     */
    setLeft(informationBarHeight, taskBarHeight) {
        this.x = 0
        this.y = informationBarHeight
        this.width = Window.getWebsiteWidth() * 50 / 100 - Window.windowGap
        this.setMaxHeight(informationBarHeight, taskBarHeight)
        this.fullscreen = false
    }

    setRight(informationBarHeight, taskBarHeight) {
        const halfWidth = Window.getWebsiteWidth() * 50 / 100

        this.x = halfWidth + Window.windowGap
        this.y = informationBarHeight
        this.width = halfWidth - Window.windowGap
        this.setMaxHeight(informationBarHeight, taskBarHeight)
        this.fullscreen = false
    }

    updateGui(){
        callHooks("window/" + this.uuid)
    }

    /**
     * set the height to the maximal
     * @param informationBarHeight
     * @param taskBarHeight
     */
    setMaxHeight(informationBarHeight, taskBarHeight) {
        this.height = Window.getWebsiteHeight() - informationBarHeight - taskBarHeight
    }

    static getWebsiteWidth() {
        return document.body.clientWidth
    }

    static getWebsiteHeight() {
        return document.body.clientHeight
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
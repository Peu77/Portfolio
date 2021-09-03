import {v5 as uuid} from "uuid"

class Window {
    constructor(title) {
        this.title = title
        this.uuid = uuid()
        this.x = 0
        this.y = 0
        this.width = 600
        this.height = 400
        this.isOpen = true
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
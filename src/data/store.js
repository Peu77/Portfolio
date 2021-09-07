import {writable} from "svelte/store";
import Window from "./window"
import HelpWindow from "../components/desktop/window/list/helpWindow/HelpWindow.svelte";
import App from "./app";
import TerminalWindow from "../components/desktop/window/list/TerminalWindow.svelte";
import FileManagerWindow from "../components/desktop/window/list/FileManagerWindow.svelte";
import FileIcon from "./file/fileIcon";

let helpApp
export let apps = [
    helpApp = new App("help", "show you help information's", HelpWindow, "h"),
    new App("terminal", "a terminal emulator", TerminalWindow, "t"),
    new App("File Manager", "a graphical user interface for you're files", FileManagerWindow, "f"),
]

export function getAppByName(appName) {
    return apps.find(app => app.name.toLowerCase() === appName.toLowerCase())
}

export const currentContextMenu = writable({
    menu: {
        open: false,
        x: 0,
        y: 0
    },
    menuList: []
})

export function closeContextMenu() {
    currentContextMenu.update(currentData => {
        currentData.menu.open = false
        return currentData
    })
}

export function updateDataOfContextMenu(menuList, x, y) {
    currentContextMenu.update(currentData => {
        currentData.menuList = menuList
        const menu = currentData.menu
        menu.open = true
        menu.x = x
        menu.y = y
        return currentData
    })
}

export const fileIcons = [
    new FileIcon("", "icons/folder.png"),
    new FileIcon("txt", "icons/text.png"),
]

export const updates = new Map()

export function callHooks(name) {
    const key = name.toLowerCase()
    const hook = updates[key]
    if (hook != null)
        hook()
}

export function registerListener(name, hook) {
    const key = name.toLowerCase()
    updates[key] = hook
}

export const windowStore = writable([
    Window.createFromApp(helpApp),
])

export function getWindow(uuid) {
    let windows = []

    windowStore.subscribe(value => windows = value)

    return windows.find(window => window.uuid === uuid)
}

export function addWindow(window) {
    windowStore.update(windows => {
        return [...windows, window]
    })
}

export function removeWindow(uuid) {
    windowStore.update(windows => {
        return windows.filter(window => window.uuid !== uuid)
    })
}
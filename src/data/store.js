import {writable} from "svelte/store";
import Window from "./window"
import HelpWindow from "../components/desktop/window/list/HelpWindow.svelte";
import App from "./app";
import File, {FileType} from "./file";
import TerminalWindow from "../components/desktop/window/list/TerminalWindow.svelte";

export const filePath = writable("/")
export const files = writable([
    new File(".config", FileType.FOLDER),
    new File(".config/colors", FileType.FILE)
])

let helpApp
export const apps = [
    helpApp = new App("help", HelpWindow, "h"),
    new App("terminal", TerminalWindow, "t"),
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
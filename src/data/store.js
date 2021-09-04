import {writable} from "svelte/store";
import Window from "./window"
import HelpWindow from "../components/desktop/window/list/HelpWindow.svelte";
import App from "./app";

let helpApp

export const apps = [
    helpApp = new App("help", HelpWindow, "t")
]

export const updates = new Map()

export function callHooks(name) {
    const key = name.toLowerCase()
    const hook = updates[key]
    if (hook != null)
        hook()
    else
        throw new DOMException("hook: " + name + " wasn't found")
}

export function registerListener(name, hook) {
    const key = name.toLowerCase()
    updates[key] = hook
}

export const windowStore = writable([
    Window.createFromApp(helpApp),
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
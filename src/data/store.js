import {writable} from "svelte/store";
import Window from "./window"
import HelpWindow from "../components/desktop/window/list/HelpWindow.svelte";
import App from "./app";

let helpApp

export const apps = [
   helpApp = new App("help", HelpWindow)
]

export const windowStore = writable([
    Window.createFromApp(helpApp)
])

export function addWindow(window) {
    windowStore.update(windows => {
        return [...windows, window]
    })
}
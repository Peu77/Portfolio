import Command from "../command";
import {addWindow, getAppByName} from "../../store";
import Window from "../../window";

export default class StartCommand extends Command{
    constructor() {
        super("start", "start a application", "start <app>");
    }

    executor(args, utils) {
        if (args.length < 1) {
            utils.push(this.usage)
            return
        }

        const appName = args[0]
        const app = getAppByName(appName)

        if(app === undefined){
            utils.pushColor({color: "red", text: "the app wasn't found"})
            return
        }
        const newWindow = Window.createFromApp(app)
        addWindow(newWindow)
    }
}
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

        const appName = args[0].replace("_", " ")
        const app = getAppByName(appName)

        if(app === undefined){
            utils.pushColor({color: "red", text: "the app wasn't found"})
            return
        }
        const foundArgs = []
        if(args.length > 1){
            for (let i = 1; i < args.length; i++) {
                const argument = args[i]
                if(argument.includes("=")){
                    const split = argument.split("=")
                    foundArgs.push({
                        name: split[0],
                        value: split[1]
                    })
                }else
                    foundArgs.push({name: argument})
            }
        }

        const newWindow = Window.createFromApp(app)
        newWindow.args = foundArgs
        addWindow(newWindow)
    }
}
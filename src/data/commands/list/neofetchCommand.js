import Command from "../command";

export default class NeofetchCommand extends Command {
    constructor(props) {
        super("neofetch", "show system details", "neofetch");
    }

    executor(args, utils) {
        const logo = ("                   -`\n" +
            "                  .o+`                     emil@\sarchlinux\n" +
            "                 `ooo/                     Name:\s Emil\n" +
            "                `+oooo:                    Country:\s Germany\n" +
            "               `+oooooo:                   Status:\s Student\n" +
            "               -+oooooo+:                  Experience:\s 5 years\n" +
            "             `/:-:++oooo+:                 Languages:\s Java, Kotlin, JavaScript\n" +
            "            `/++++/+++++++:                TypeScript, C++, Php, Python\n" +
            "           `/++++++++++++++:               Currently learning:\s Rust\n" +
            "          `/+++ooooooooooooo/`\n" +
            "         ./ooosssso++osssssso+`\n" +
            "        .oossssso-````/ossssss+`\n" +
            "       -osssssso.      :ssssssso.\n" +
            "      :osssssss/        osssso+++.\n" +
            "     /ossssssss/        +ssssooo/-\n" +
            "   `/ossssso+/:-        -:/+osssso+-\n" +
            "  `+sso+:-`                 `.-/+oso:\n" +
            " `++:.                           `-/+/\n" +
            " .`                                 `").split("\n")

        logo.forEach(line =>  {
            utils.push(line)
        })
    }
}
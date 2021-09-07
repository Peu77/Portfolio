import Command from "../command";

export default class NeofetchCommand extends Command {
    constructor(props) {
        super("neofetch", "show system details", "neofetch");
    }

    executor(args, utils) {
        const logo = ("                   -`\n" +
            "                  .o+`                     emil@\archlinux\n" +
            "                 `ooo/                     Name:\ Emil\n" +
            "                `+oooo:                    Country: Germany\n" +
            "               `+oooooo:                   Status: Student\n" +
            "               -+oooooo+:                  Experience: 5 years\n" +
            "             `/:-:++oooo+:                 Languages: Java, Kotlin, JavaScript\n" +
            "            `/++++/+++++++:                TypeScript, C++, Php, Python\n" +
            "           `/++++++++++++++:               Currently learning: Rust\n" +
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

        logo.forEach(line => {
            utils.push(line)
        })
    }
}
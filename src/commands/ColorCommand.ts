import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import { Random } from "../modules/Utilty.js";
import { BaseCommand } from "./BaseCommand.tsx";

export class ColorCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
        this.color = command.args[0] ?? `rgb(${Random(0, 255)}, ${Random(0, 255)}, ${Random(0, 255)})`;
    }

    color: string;

    async response () : Promise<CommandResponse> {
        this.system.color.set(this.color);
        localStorage.setItem("system.terminal.color", this.color);
        return {
            content: "",
            command: this
        }
    }
}
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import { BaseCommand } from "./BaseCommand.tsx";

export class ClearCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
    }

    async response () : Promise<CommandResponse> {
        console.clear();
        console.log("👁️");
        return {
            content: "Terminal cleared", 
            command: this,
            callback: () => this.system.history.set([])
        }
    }
}
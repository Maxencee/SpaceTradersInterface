import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import { Random } from "../modules/Utilty.js";
import { BaseCommand } from "./BaseCommand.tsx";

export class TestCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
    }

    async response () : Promise<CommandResponse> {
        return {
            content: ["🍕", "🍔", "🍟", "🌭", "🥙", "🧀", "🍪", "🍩"][Random(0, 7)], 
            command: this
        }
    }
}
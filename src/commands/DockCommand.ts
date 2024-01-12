import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import { BaseCommand } from "./BaseCommand.tsx";

export class DockCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
    }

    async response () : Promise<CommandResponse> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.system.token.get}`
            }
        };

        if(!this.system.ship.get.symbol) {
            return {
                content: "You need to use a ship to use this command | See ship command",
                command: this
            }
        }

        const response = await Request(`https://api.spacetraders.io/v2/my/ships/${this.system.ship.get.symbol}/dock`, options);

        if(response.error) {
            return {
                content: response.error.message,
                command: this
            }
        }

        return {
            content: `Ship ${this.system.ship.get.symbol} docked.`,
            command: this
        }
    }
}
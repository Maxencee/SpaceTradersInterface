import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import { BaseCommand } from "./BaseCommand.tsx";

export class UseShipCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
        this.shipSymbol = this.args[0];
    }

    shipSymbol: string;

    async response () : Promise<CommandResponse> {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.system.token.get}`
            }
        };

        const response = await Request(`https://api.spacetraders.io/v2/my/ships/${this.shipSymbol}`, options);

        if(response.error) {
            return {
                content: response.error.message,
                command: this
            }
        }

        this.system.ship.set(response.data);

        return {
            content: `Ship ${response.data.symbol} selected.`,
            command: this
        }
    }
}
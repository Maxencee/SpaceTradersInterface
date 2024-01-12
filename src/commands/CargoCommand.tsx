import GridContent from "../components/contents/GridContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";

export class CargoCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
    }

    async response () : Promise<CommandResponse> {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.system.token.get}`
            }
        };

        if(!this.system.ship.get.symbol) {
            return {
                content: "You need to use a ship to use this command | See useship",
                command: this
            }
        }

        const response = await Request(`https://api.spacetraders.io/v2/my/ships/${this.system.ship.get.symbol}/cargo`, options);

        if(response.error) {
            return {
                content: response.error.message,
                command: this
            }
        }

        if(response.data.inventory.length === 0) {
            return {
                content: "Empty cargo.",
                command: this
            }
        }

        return {
            content: <GridContent contents={{
                fields: response.data.inventory.map(e => e.name),
                rows: response.data.inventory.map(e => e.units)
            }}/>,
            command: this
        }
    }
}
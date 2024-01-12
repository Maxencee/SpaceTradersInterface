import ReturnContent from "../components/contents/ReturnContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";

export class RefuelCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
        this.units = Number(this.args[0]);
    }

    units: number;

    async response () : Promise<CommandResponse> {
        if(!this.units || this.units < 0) {
            return {
                content: <ReturnContent content={"Synthax of the command is refuel [units]"} type={"error"}/>,
                command: this
            }
        }

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.system.token.get}`
            },
            body: {
                units: this.units,
                fromCargo: false
            }
        };

        const response = await Request(`https://api.spacetraders.io/v2/my/ships/${this.system.ship.get.symbol}/refuel`, options);

        if(response.error) {
            return {
                content: response.error.message,
                command: this
            }
        }

        return {
            content: `Ship ${this.system.ship.get.symbol} refueled by ${this.units} units.`,
            command: this
        }
    }
}
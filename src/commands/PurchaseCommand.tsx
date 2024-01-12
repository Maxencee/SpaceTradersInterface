import ReturnContent from "../components/contents/ReturnContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import React from "react";
import { BaseCommand } from "./BaseCommand.tsx";
import { Ships } from "../modules/Constants.ts";

export class PurchaseCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
        this.shipType = command.args[0];
        this.waypoint = command.args[1];
    }

    shipType: string;
    waypoint: string;

    async response () : Promise<CommandResponse> {
        console.log(this.system.token.get);
        if(!this.system.token.get) {
            return {
                content: "User is not logon",
                command: this
            }
        }

        if(Ships.indexOf(this.shipType) == -1) {
            return {
                content: <ReturnContent content={`Ship "${this.shipType}" does not exist in [${Ships.join(" | ")}]`} type={"warn"}/>,
                command: this
            }
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.system.token.get}`
            },
            body: `{"shipType":"${this.shipType}","waypointSymbol":"${this.waypoint}"}`
        };

        const response = await Request('https://api.spacetraders.io/v2/my/ships', options);

        if(response.error) {
            return {
                content: <ReturnContent content={response.error.message} type={"error"}/>,
                command: this
            }
        }

        this.system.agent.set(response.data.agent);

        return {
            content: <ReturnContent content={`Ship bought ${response.data.ship.symbol}`} type={"success"}/>,
            command: this
        }
    }
}
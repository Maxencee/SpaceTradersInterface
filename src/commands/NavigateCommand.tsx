import GridContent from "../components/contents/GridContent.tsx";
import ReturnContent from "../components/contents/ReturnContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";

export class NavigateCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
        this.waypoint = this.args[0];
    }

    waypoint: string;

    async response () : Promise<CommandResponse> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.system.token.get}`
            },
            body: `{"waypointSymbol":"${this.waypoint}"}`
        };

        if(!this.system.ship.get.symbol) {
            return {
                content: "You need to use a ship to use this command | See ship command",
                command: this
            }
        }

        const response = await Request(`https://api.spacetraders.io/v2/my/ships/${this.system.ship.get.symbol}/navigate`, options);

        if(response.error) {
            return {
                content: <ReturnContent content={response.error.message} type={"error"}/>,
                command: this
            }
        }

        return {
            content: <GridContent contents={{
                fields: [ "FUEL", "TRAVEL", "FLIGHT MODE" ],
                rows: [ 
                    `CURRENT: ${response.data.fuel.current} | CAPACITY: ${response.data.fuel.capacity}`,
                    ((new Date(response.data.nav.route.arrival)).getTime() - (new Date(response.data.nav.route.departureTime)).getTime()) / 1000 + " seconds",
                    response.data.nav.flightMode 
                ]
            }}/>,
            command: this
        }
    }
}
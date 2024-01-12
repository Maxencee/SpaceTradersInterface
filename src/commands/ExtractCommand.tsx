import GridContent from "../components/contents/GridContent.tsx";
import ReturnContent from "../components/contents/ReturnContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";

export class ExtractCommand extends BaseCommand {
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
                content: <ReturnContent content={"You need to use a ship to use this command | See ship command"} type={"error"}/>,
                command: this
            }
        }

        const response = await Request(`https://api.spacetraders.io/v2/my/ships/${this.system.ship.get.symbol}/extract`, options);

        if(response.error) {
            return {
                content: <ReturnContent content={response.error.message} type={"error"}/>,
                command: this
            }
        }

        return {
            content: <GridContent contents={{
                fields: [ response.data.extraction.yield.symbol ],
                rows: [ response.data.extraction.yield.units ]
            }}/>,
            command: this
        }
    }
}
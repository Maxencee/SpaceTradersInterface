import GridContent from "../components/contents/GridContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";

export class ListShipsCommand extends BaseCommand {
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

        const response = await Request('https://api.spacetraders.io/v2/my/ships', options);

        return {
            content: <GridContent contents={{
                fields: response.data.map(e => e.symbol),
                rows: response.data.map(e => e.nav.status)
            }}/>,
            command: this
        }
    }
}
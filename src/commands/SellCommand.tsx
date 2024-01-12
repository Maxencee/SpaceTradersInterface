import ReturnContent from "../components/contents/ReturnContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import Request from "../modules/Request.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";

export class SellCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
        this.goods = this.args[0];
        this.units = Number(this.args[1]);
    }

    goods: string;
    units: number;

    async response () : Promise<CommandResponse> {
        if(!this.goods || !this.units || this.units < 0) {
            return {
                content: <ReturnContent content={"Synthax of the command is sell [product] [amount]"} type={"error"}/>,
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
            body: {
                "symbol": this.goods.toUpperCase(),
                "units": this.units
            }
        };

        if(!this.system.ship.get.symbol) {
            return {
                content: "You need to use a ship to use this command | See useship",
                command: this
            }
        }

        const response = await Request(`https://api.spacetraders.io/v2/my/ships/${this.system.ship.get.symbol}/sell`, options);

        if(response.error) {
            return {
                content: response.error.message,
                command: this
            }
        }

        return {
            content: `Successfully selled ${this.units} ${this.goods}.`,
            command: this
        }
    }
}
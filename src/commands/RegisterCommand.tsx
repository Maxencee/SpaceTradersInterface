import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import * as Auth from "../modules/Auth.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";
import ReturnContent from "../components/contents/ReturnContent.tsx";
import HiddenContent from "../components/contents/HiddenContent.tsx";

export class RegisterCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
        this.symbol = this.args[0];
    }

    symbol: string;

    async response () : Promise<CommandResponse> {
        if(!this.symbol) {
            return {
                content: <ReturnContent content={"Register failed"} type={"error"}/>, 
                command: this
            }
        }
        
        const response = await Auth.register(this.symbol);
        if(response) {
            return {
                content: <><ReturnContent content={"Register success | token:"} type={"success"}/><HiddenContent content={response.token}/></>, 
                command: this
            }
        } else {
            return {
                content: <ReturnContent content={"Register failed"} type={"error"}/>, 
                command: this
            }
        }
    }
}
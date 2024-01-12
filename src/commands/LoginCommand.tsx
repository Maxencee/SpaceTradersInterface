import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import * as Auth from "../modules/Auth.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";
import ReturnContent from "../components/contents/ReturnContent.tsx";

export class LoginCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
        this.token = this.args[0];
    }

    token: string;

    async response () : Promise<CommandResponse> {
        if(!this.token) {
            return {
                content: <ReturnContent content={"Login failed"} type={"error"}/>, 
                command: this
            }
        }

        console.log(this.system.history.get);

        const response = await Auth.login(this.token);
        if(response) {
            this.system.token.set(this.token);
            this.system.agent.set(response);
            return {
                content: <ReturnContent content={"Login success"} type={"success"}/>, 
                command: this
            }
        } else {
            return {
                content: <ReturnContent content={"Login failed"} type={"error"}/>, 
                command: this
            }
        }
    }
}
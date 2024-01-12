import ReturnContent from "../components/contents/ReturnContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import React from "react";

export class BaseCommand {
    name: string;
    args: string[];
    system;

    constructor(command: CommandPrompt, system) {
        this.name = command.name;
        this.args = command.args;
        this.system = system;
    }

    async response () : Promise<CommandResponse> {
        return {
            content: <ReturnContent content={`Command "${this.name}" Not Found | Use help`} type={"error"}/>,
            command: this
        }
    }
}
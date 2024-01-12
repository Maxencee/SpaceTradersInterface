import GridContent from "../components/contents/GridContent.tsx";
import { CommandPrompt, CommandResponse } from "../modules/Commands.ts";
import { BaseCommand } from "./BaseCommand.tsx";
import React from "react";

export class HelpCommand extends BaseCommand {
    constructor(command: CommandPrompt, system) {
        super(command, system);
    }

    async response () : Promise<CommandResponse> {
        return {
            content: <GridContent contents={{
                fields: [ 
                    "help",
                    "clear",
                    "color [hex|name]", 
                    "login [token]",
                    "register [username]",
                    "myships",
                    "useship [ship name]",
                    "dock",
                    "orbit",
                    "scan",
                    "refuel [units]",
                    "nav [destination]",
                    "navmode [mode]",
                    "extract",
                    "cargo",
                    "sell [resource] [units]",
                    "buy [ship name]",
                ],
                rows: [ 
                    "Print out this message",
                    "Clear the terminal history",
                    "Set the text color of the terminal",
                    "Login your agent",
                    "Register your agent",
                    "List your ships",
                    "Set a ship to current for every ship based actions",
                    "Dock your current ship to the nearest location",
                    "Put your current ship in orbit",
                    "Scan the nearest waypoints",
                    "Refuel your current ship",
                    "Navigate to a destination with the current ship",
                    "Change the flight mode of the current ship",
                    "Extract resources on the current location with the current ship",
                    "Get your current ship's inventory",
                    "Sell the current ship's cargo",
                    "Buy a ship",
                ]
            }}/>,
            command: this
        }
    }
}
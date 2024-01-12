import { ReactElement } from "react";
import { BaseCommand } from "../commands/BaseCommand.tsx";
import { ClearCommand } from "../commands/ClearCommand.ts";
import { TestCommand } from "../commands/TestCommand.ts";
import { HelpCommand } from "../commands/HelpCommand.tsx";
import { ColorCommand } from "../commands/ColorCommand.ts";
import { LoginCommand } from "../commands/LoginCommand.tsx";
import { RegisterCommand } from "../commands/RegisterCommand.tsx";
import { PurchaseCommand } from "../commands/PurchaseCommand.tsx";
import { ListShipsCommand } from "../commands/ListShipsCommand.tsx";
import { UseShipCommand } from "../commands/UseShipCommand.ts";
import { ScanWaypointsCommand } from "../commands/ScanWaypointsCommand.tsx";
import { OrbitCommand } from "../commands/OrbitCommand.ts";
import { DockCommand } from "../commands/DockCommand.ts";
import { NavigateCommand } from "../commands/NavigateCommand.tsx";
import { ExtractCommand } from "../commands/ExtractCommand.tsx";
import { NavModeCommand } from "../commands/NavModeCommand.ts";
import { SellCommand } from "../commands/SellCommand.tsx";
import { CargoCommand } from "../commands/CargoCommand.tsx";
import { RefuelCommand } from "../commands/RefuelCommand.tsx";

export interface CommandPrompt {
    name: string,
    args: string[]
}

export interface CommandResponse {
    content: string|ReactElement,
    command: CommandPrompt,
    callback?: Function
}

export async function _useCommand(command: CommandPrompt, system): Promise<CommandResponse> {
    return await Commands[command.name]?.(command, system).response() 
        ?? Commands['$']?.(command, system).response();
}

const Commands = {
    $: (command: CommandPrompt, system) => new BaseCommand(command, system),
    test: (command: CommandPrompt, system) => new TestCommand(command, system),
    clear: (command: CommandPrompt, system) => new ClearCommand(command, system),
    help: (command: CommandPrompt, system) => new HelpCommand(command, system),
    color: (command: CommandPrompt, system) => new ColorCommand(command, system),
    login: (command: CommandPrompt, system) => new LoginCommand(command, system),
    register: (command: CommandPrompt, system) => new RegisterCommand(command, system),
    buy: (command: CommandPrompt, system) => new PurchaseCommand(command, system),
    myships: (command: CommandPrompt, system) => new ListShipsCommand(command, system),
    useship: (command: CommandPrompt, system) => new UseShipCommand(command, system),
    scan: (command: CommandPrompt, system) => new ScanWaypointsCommand(command, system),
    orbit: (command: CommandPrompt, system) => new OrbitCommand(command, system),
    dock: (command: CommandPrompt, system) => new DockCommand(command, system),
    nav: (command: CommandPrompt, system) => new NavigateCommand(command, system),
    extract: (command: CommandPrompt, system) => new ExtractCommand(command, system),
    navmode: (command: CommandPrompt, system) => new NavModeCommand(command, system),
    sell: (command: CommandPrompt, system) => new SellCommand(command, system),
    cargo: (command: CommandPrompt, system) => new CargoCommand(command, system),
    refuel: (command: CommandPrompt, system) => new RefuelCommand(command, system),
}
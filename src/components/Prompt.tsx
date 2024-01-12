import React from "react";
import { _useCommand, CommandResponse } from "../modules/Commands.ts";

const Prompt = ({ system }) => {    
    let command : string;
    let user : string;

    const submit = async (evt) => { 
        evt.preventDefault();
        if(!command) return;
        console.log(command);
        evt.target.reset();

        let command_arr = command.split(" ");

        system.history.set([<><span className="pre-command">/{system.agent.get.symbol}/{system.ship.get.symbol ? system.ship.get.symbol + "/" : ""}</span><span>{command}</span></>, ...system.history.get]);
        
        const response = await _useCommand({ name: command_arr.shift() ?? "", args: command_arr }, system);
        console.log(response);
        
        system.history.set([response.content, <><span className="pre-command">/{system.agent.get.symbol}/{system.ship.get.symbol ? system.ship.get.symbol + "/" : ""}</span><span>{command}</span></>, ...system.history.get]);
        response.callback?.();
    }
    
    return (
        <>
            <div className="prompt-container">
                <form onSubmit={submit}>
                    <span>{"/" + system.agent.get.symbol + "/" + (system.ship.get.symbol ? system.ship.get.symbol + "/" : "")}</span>
                    <input className="command-input" type="text" onChange={(evt) => { command = evt.target.value }} placeholder="Type a command | help" />
                    <input className="send-input" type="submit" value="send"/>
                </form>
            </div>
        </>
      )
}

export default Prompt;
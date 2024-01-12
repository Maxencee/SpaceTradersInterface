import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";

import "./style/main.css";
import Viewport from "./components/Viewport.tsx";
import Prompt from "./components/Prompt.tsx";
import * as Auth from "./modules/Auth.ts";

export default function App() {
  const [history, setHistory] = useState([]);
  const [color, setColor] = useState(localStorage.getItem("system.terminal.color") ?? "rgb(72, 241, 178)")
  const [agent, setAgent] = useState({ symbol: "GUEST" });
  const [ship, setShip] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
      let token = localStorage.getItem("usertoken");
      if(token !== null) {
        let agent = Auth.login(token).then(agent => {
          if(agent) {
            setAgent(agent);
            setToken(token ?? "");
          }
        });
      }
  }, [])

  return (
      <>
        <main style={{ color: color }}>
          <Viewport history={history}/>
          <Prompt system={{
            history: {
              set: setHistory,
              get: history
            },
            color: {
              set: setColor,
              get: color
            },
            agent: {
              set: setAgent,
              get: agent
            },
            ship: {
              set: setShip,
              get: ship
            },
            token: {
              set: setToken,
              get: token
            }
          }}/>
        </main>
      </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
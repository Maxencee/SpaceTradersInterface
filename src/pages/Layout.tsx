import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import * as Auth from "../modules/Auth.ts";


const Layout = () => {
  let token : string|null;
  let agent : Auth.Agent;
  let navigate = useNavigate();
  
  useEffect(() => {
    token = localStorage.getItem("usertoken") || null;

    if(token === null && window.location.pathname !== "/register") {
        navigate('/register');
    } else if(window.location.pathname !== "/register") {
      Auth.login(token ?? "").then(response => {
        if(!response) {
            navigate('/register');
        } else {
          agent = response;
        }
      });
    }

    console.log(agent);
  });

  return (
    <>
      <header>
        <nav className="navbar__header">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ships">Ships</Link>
            </li>
            <li>
              <Link to="/agent">Agent</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;
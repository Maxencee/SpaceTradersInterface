import React from "react";

import Request from "../modules/Request.ts";
import { getCookie, createCookie } from "../modules/Cookies.ts";

import "../style/home.css";

let token = '';

const setToken = (evt) => {
  token = evt.target.value;
} 

const register = async (evt) => {
  evt.preventDefault();

  console.log(token);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symbol: token,
      faction: "GENERAL",
    }),
  };

  await Request('https://api.spacetraders.io/v2/register', options);
}

const Home = () => {
  return (
    <>
        <form onSubmit={register}>
            <input type="text" onChange={setToken}/>
            <input type="submit"/>
        </form>
    </>
  )
};

export default Home;

import React, { useEffect } from "react";

import "../style/register.css";
import * as Auth from "../modules/Auth.ts";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let token : string|null;
  let navigate = useNavigate();

  const setToken = (evt) => {
    token = evt.target.value;
  }

  const submit = async (evt) => {
    evt.preventDefault();

    console.log(token);
    await Auth.register(token ?? "");
  }

  // LOGIN

  let tokenLogin : string|null;

  const setTokenLogin = (evt) => {
    tokenLogin = evt.target.value;
  } 

  const submitLogin = async (evt) => {
    evt.preventDefault();

    if(tokenLogin !== null) {
      const response = await Auth.login(tokenLogin);
      if(response) {
        localStorage.setItem('usertoken', tokenLogin);
        navigate('/');
      }
    }
  }
  
  return (
    <>
        <h1>Register</h1>
        <form onSubmit={submit}>
          <input type="text" placeholder="Your agent name" onChange={setToken}/>
          <input type="submit"/>
        </form>

        <h1>Login</h1>
        <form onSubmit={submitLogin}>
          <input type="text" placeholder="Your token" onChange={setTokenLogin}/>
          <input type="submit"/>
        </form>
    </>
  )
};

export default Register;
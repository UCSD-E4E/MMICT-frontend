import React from 'react';
import { useSignIn } from "react-auth-kit";
import { useState } from "react";
import '../assets/css/Login.css';
import axios, { AxiosError } from "axios";
import Header from "../components/Header"

export default function Login() {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const onSubmit = async (values: any) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        values
      );
        console.log(response)
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };
  return (
    <>
      <Header />
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
        <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
      </form>
    </>

  )
}
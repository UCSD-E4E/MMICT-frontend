import React from 'react';
import '../assets/css/Login.css';
import Header from "../components/Header"

export default function Login() {
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </>

  )
}
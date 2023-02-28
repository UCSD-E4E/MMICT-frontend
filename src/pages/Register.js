import React from 'react';
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
        <label>
          <p>Confirm</p>
          <input type="text" />
        </label>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </>

  )
}
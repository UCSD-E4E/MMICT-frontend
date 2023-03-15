import React from 'react';
import { useState } from 'react';
import Header from "../components/Header"
import axios, { AxiosError } from "axios";

export default function Login() {
  const [error, setError] = useState("");
  const [username, setUser] = useState<string>("Default");
  function handlefirst(event: React.ChangeEvent<HTMLInputElement>) {
    setUser(event.currentTarget.value);
  }
  const [password, setPassword] = useState<string>("Default");
  function handleLast(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }
  const [confirm, setConfirm] = useState<string>("Default");
  function handleConfirm(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirm(event.currentTarget.value);
  }
  const updatedData = {
    "username": username,
    "password": password
  }

  const post = async() => {
    //Check if passwords match 
    if (password !== confirm) {
      alert("Passwords don't match");
    }
    else {
      //Complete the post request 
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/signup",
          updatedData
        );
          console.log(updatedData)
          console.log(response)
        }
        catch (err) {
            if (err && err instanceof AxiosError)
              setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);
      
            console.log("Error: ", err);
          }
      /*
      fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          updatedData
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        if (!response.ok) {
          alert(`This is an HTTP error: The status is ${response.status}`)
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json(); 
      })
      .then(console.log)
      .catch(err => {
        console.log(err.message);
      }); */
    }
  }
  return (
    <>
      <Header />
      <form>
        <input type="text" placeholder="Username" id="User" className="" onChange={handlefirst} />
        <input type="text" placeholder="Password" id="Password" className="" onChange={handleLast} />
        <input type="text" placeholder="Confirm" id="Confirm" className="" onChange={handleConfirm} />
      </form>
      <div>
        <button type="submit" onClick={post}>Register</button>
      </div>


    </>

  )
}
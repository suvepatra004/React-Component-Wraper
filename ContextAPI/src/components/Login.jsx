import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // useContext gives the setUser access -> takes context as UserContext (from where I get setUser) -> to
  const { setUser } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    // Stores the value to the Global Context variable
    setUser({ userName, password });
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        name="username"
        id=""
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id=""
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Login;

// Basically 2 main processes happening in ContextAPI
// 1. Store values to the Global Variable using useContext (By providing the context of where to store & from whom to store)
// 2. Fetch / Extract values from Global Context Provider using useContext.

/**
 * Example :-
 *
 * 1. From Login.jsx -> Take UserData through useContext -> Set or Store UserData to Global Context Provider
 * 2. To Profile.jsx -> Fetch the UserData from Context Provider by useContext -> Diplay the User information to UI
 */

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      setUser(response.data);
      navigate("/");
    } catch (err) {
      setMessage("Login failed. Please try again!");
      alert(err);
    } finally {
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-48">
        <h1 className="text-4xl text-center mb-4 ">Login</h1>

        {message.length > 0 && (
          <h3 className={"text-md text-center mb-4 text-red-500"}>{message}</h3>
        )}
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@Email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary" type="submit">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to="/register">
              Register Now
            </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

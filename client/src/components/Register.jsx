import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function registerUser(event) {
    setError(false);
    setMessage("");
    event.preventDefault();

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });
      setMessage("Registration Success!");
    } catch (err) {
      setError(true);
      setMessage("Registration failed. Please try again.");
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-48">
        <h1 className="text-4xl text-center mb-4 ">Register</h1>
        {message.length > 0 && (
          <h3
            className={
              error
                ? "text-md text-center mb-4 text-red-500"
                : "text-md text-center mb-4 text-green-500"
            }
          >
            {message}
          </h3>
        )}
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Jonh Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?{" "}
            <Link className="underline text-black" to="/login">
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

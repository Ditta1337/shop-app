import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/login");
    console.log(email, password, confirmPassword)
    // send data to server
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col rounded-lg shadow-xl w-1/5 h-1/2 min-h-[15rem] min-w-[12rem] bg-white items-center justify-center">
        <AiFillShopping className="text-[10rem] text-slate-500" />
        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Email" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Password" />
        <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="confirmPassword" placeholder="Confirm Password" />
        <Link to="/login">Already have an account?</Link>
        <span className="mt-3">
          <button className="button secondary" type="submit">Register</button>
        </span>
      </form>
    </div>
  );
}



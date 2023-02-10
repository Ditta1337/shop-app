import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { client } from "../client/grpcClient";
import { LogInUserFunc  } from "../client/grpcClient";





export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password)
    
    LogInUserFunc(email, password)
    //navigate("/");
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col rounded-lg shadow-xl w-1/5 h-1/2 min-h-[15rem] min-w-[12rem] bg-white items-center justify-center">
        <AiFillShopping className="text-[10rem] text-slate-500" />
        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Email" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Password" />
        <Link to="/register">No account?</Link>
        <span className="mt-3">
          <button className="button primary" type="submit">Log in</button>
        </span>
      </form>
    </div>
  );
}


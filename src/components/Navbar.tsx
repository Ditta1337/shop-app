import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="border sticky top-0 pb-2 bg-gray-100 shadow-md border-b-2 border-solid border-sky-300">
      <ul className="flex justify-end pt-2 mr-2">
        <li className="order-last">
          <NavLink to="/" className="navlink group">
            <AiFillShopping className="text-[3rem] text-slate-500 group-hover:text-slate-700" />
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="navlink group">
              <span className="group-hover:text-slate-700">Log Out</span>
              <BiLogOut className="text-[3rem] text-slate-500 group-hover:text-slate-700" />
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/login" className="navlink group">
              <span className="group-hover:text-slate-700">Log In</span>
              <BiLogIn className="text-[3rem] text-slate-500 group-hover:text-slate-700" />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

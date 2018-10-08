import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => (
  <header className="Navbar shadow-md w-full flex py-10 mb-10">
    <div className="self-center w-full items-center flex justify-between inline-block px-5">
      <Link className="no-underline text-white" to="/">
        <h1 className="text-2xl font-bold">Zeunerts Tracker</h1>
      </Link>
      <div className="float-right text-white">
        <ul>
          <li className="list-reset">
            <Link className="no-underline text-white" to="/list">
              <p>Listor</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default Navbar;

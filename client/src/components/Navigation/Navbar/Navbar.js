import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => (
  <header className="Navbar navbar-yellow shadow-md w-full flex py-10 mb-10">
    <div className="container mx-auto px-3 self-center w-full items-center flex justify-between inline-block xs:w-full md:w-3/5">
      <Link className="no-underline text-white" to="/">
        <h1 className="text-2xl font-bold">Zeunerts Tracker</h1>
      </Link>
      <div className="float-right text-white">
        <ul>
          <li className="list-reset">
            <Link
              className="no-underline text-grey cursor-not-allowed"
              title="Årslistor kommer senare."
              to="/list"
            >
              <p>Listor</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default Navbar;

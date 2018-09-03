import React from 'react';
import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => (
    <header className="Navbar shadow-md w-full flex justify-center py-16 mb-10">
        <div className="self-center inline-block">
            <Link className="no-underline text-white" to='/'>
                <h1 className="text-4xl font-bold">Zeunerts Tracker</h1>
            </Link>
        </div>
        <nav>
        </nav>
    </header>
);

export default Navbar
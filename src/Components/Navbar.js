import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#65BEF0' }}>
            <div className="container-fluid">
                {/* Brand Logo */}
                <Link className="navbar-brand" to="/">Employee System</Link>
                
                {/* Navbar Toggler for small screens */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Daily Attendance</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employee-details">Employee Details</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/date-attendance">Date Attendance</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
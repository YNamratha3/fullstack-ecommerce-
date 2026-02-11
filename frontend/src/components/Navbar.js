import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getCurrentUser } from '../services/authService';
import './Navbar.css';


function Navbar() {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">
                    E-Commerce
                </Link>

                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>

                    {isAuthenticated() ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/profile" className="nav-link">Profile</Link>
                            <Link to="/cart" className="nav-link">Cart 🛒</Link>
                            <span className="nav-user">Hello, {user?.name}</span>
                            <button onClick={handleLogout} className="btn btn-secondary">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                            <Link to="/signup" className="btn btn-secondary">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import './Dashboard.css';

/**
 * User Dashboard Page Component
 * Central Hub for the user
 */
function Dashboard() {
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header">
                    <h1>Welcome back, {user?.name}! 👋</h1>
                    <p>Manage your account, orders, and shopping from here.</p>
                </div>

                <div className="dashboard-grid">
                    {/* Quick Action: Shop */}
                    <div className="card dashboard-card">
                        <div className="card-icon">🛍️</div>
                        <h3>Start Shopping</h3>
                        <p>Browse our latest products and find great deals.</p>
                        <Link to="/home" className="btn btn-primary">Browse Products</Link>
                    </div>

                    {/* Quick Action: Cart */}
                    <div className="card dashboard-card">
                        <div className="card-icon">🛒</div>
                        <h3>Your Cart</h3>
                        <p>View items in your cart and proceed to checkout.</p>
                        <Link to="/cart" className="btn btn-secondary">View Cart</Link>
                    </div>

                    {/* Quick Action: Profile */}
                    <div className="card dashboard-card">
                        <div className="card-icon">👤</div>
                        <h3>My Profile</h3>
                        <p>Update your personal information and address.</p>
                        <Link to="/profile" className="btn btn-secondary">Manage Profile</Link>
                    </div>

                    {/* Quick Action: Logout */}
                    <div className="card dashboard-card">
                        <div className="card-icon">🚪</div>
                        <h3>Logout</h3>
                        <p>Securely log out of your account.</p>
                        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


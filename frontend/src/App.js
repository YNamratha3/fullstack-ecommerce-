import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastProvider } from './context/ToastContext';
import './App.css';

/**
 * Main App Component
 * Login is the default page - Navbar is now global
 * Wrapped in ToastProvider for global notifications
 */
function App() {
    return (
        <ToastProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="content-wrap">
                        <Routes>
                            {/* Default route - Home Page */}
                            <Route path="/" element={<Home />} />

                            {/* Public Routes */}
                            <Route path="/home" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                            {/* Protected Routes - Require Authentication */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/cart"
                                element={
                                    <ProtectedRoute>
                                        <Cart />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;

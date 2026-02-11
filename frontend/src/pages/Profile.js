import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { Link } from 'react-router-dom';
import './Profile.css';

/**
 * Advanced User Profile Component
 * Features: Tabbed interface, Password Change, Glassmorphism UI
 */
function Profile() {
    const [activeTab, setActiveTab] = useState('overview'); // overview, edit, security, orders
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    // Security/Password State
    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setLoading(true);
        try {
            const data = await getUserProfile();
            setProfile({
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                address: data.address || '',
            });
        } catch (err) {
            showMessage('error', 'Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSecurityChange = (e) => {
        setSecurity({ ...security, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Only send profile data, not password
            await updateUserProfile(profile);
            showMessage('success', 'Profile updated successfully! 🎉');
            setActiveTab('overview');
        } catch (err) {
            showMessage('error', 'Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleSecuritySubmit = async (e) => {
        e.preventDefault();

        if (security.newPassword !== security.confirmPassword) {
            showMessage('error', 'New passwords do not match!');
            return;
        }

        if (security.newPassword.length < 6) {
            showMessage('error', 'Password must be at least 6 characters long.');
            return;
        }

        setSaving(true);
        try {
            // Send new password to backend
            // Note: Backend handles password update if 'password' field is present
            await updateUserProfile({
                ...profile,
                password: security.newPassword
            });
            showMessage('success', 'Password changed successfully! 🔒');
            setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setActiveTab('overview');
        } catch (err) {
            showMessage('error', 'Failed to change password. check your connection.');
        } finally {
            setSaving(false);
        }
    };

    // Helper to get initials for Avatar
    const getInitials = (name) => {
        return name
            ? name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
            : 'AU';
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="loading">Loading your profile...</div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="container">
                {/* Back Link */}
                <div style={{ marginBottom: '20px' }}>
                    <Link to="/dashboard" className="nav-link-small">← Back to Dashboard</Link>
                </div>

                <div className="profile-container">

                    {/* Left Sidebar */}
                    <div className="profile-sidebar">
                        <div className="profile-avatar">
                            {getInitials(profile.name)}
                        </div>
                        <h2 className="profile-name">{profile.name}</h2>
                        <p className="profile-email">{profile.email}</p>

                        <div className="profile-nav">
                            <button
                                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                👤 Overview
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'edit' ? 'active' : ''}`}
                                onClick={() => setActiveTab('edit')}
                            >
                                ✏️ Edit Profile
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                                onClick={() => setActiveTab('security')}
                            >
                                🔒 Security
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveTab('orders')}
                            >
                                📦 My Orders
                            </button>
                            <button
                                className="nav-item logout"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.href = '/';
                                }}
                            >
                                🚪 Logout
                            </button>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="profile-content">
                        {message.text && (
                            <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
                                {message.text}
                            </div>
                        )}

                        {/* TAB: OVERVIEW */}
                        {activeTab === 'overview' && (
                            <div className="tab-pane fade-in">
                                <h2 className="section-title">Profile Overview</h2>
                                <div className="info-grid">
                                    <div className="info-card">
                                        <div className="info-label">Full Name</div>
                                        <div className="info-value">{profile.name}</div>
                                    </div>
                                    <div className="info-card">
                                        <div className="info-label">Email Address</div>
                                        <div className="info-value">{profile.email}</div>
                                    </div>
                                    <div className="info-card">
                                        <div className="info-label">Phone Number</div>
                                        <div className="info-value">{profile.phone || 'Not provided'}</div>
                                    </div>
                                    <div className="info-card" style={{ gridColumn: '1 / -1' }}>
                                        <div className="info-label">Shipping Address</div>
                                        <div className="info-value">{profile.address || 'Not provided'}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: EDIT PROFILE */}
                        {activeTab === 'edit' && (
                            <div className="tab-pane fade-in">
                                <h2 className="section-title">Edit Profile</h2>
                                <form onSubmit={handleProfileSubmit} className="profile-form">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleProfileChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleProfileChange}
                                            className="form-control"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Shipping Address</label>
                                        <textarea
                                            name="address"
                                            value={profile.address}
                                            onChange={handleProfileChange}
                                            className="form-control"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="button-group">
                                        <button type="submit" className="btn-save" disabled={saving}>
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button type="button" className="btn-cancel" onClick={() => setActiveTab('overview')}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* TAB: SECURITY */}
                        {activeTab === 'security' && (
                            <div className="tab-pane fade-in">
                                <h2 className="section-title">Security Settings</h2>
                                <form onSubmit={handleSecuritySubmit} className="profile-form">
                                    <div className="form-group">
                                        <label className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={security.newPassword}
                                            onChange={handleSecurityChange}
                                            className="form-control"
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={security.confirmPassword}
                                            onChange={handleSecurityChange}
                                            className="form-control"
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                    <div className="button-group">
                                        <button type="submit" className="btn-save" disabled={saving}>
                                            {saving ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* TAB: ORDERS (Mock) */}
                        {activeTab === 'orders' && (
                            <div className="tab-pane fade-in">
                                <h2 className="section-title">Order History</h2>
                                <div className="orders-list">
                                    <div className="order-item">
                                        <div>
                                            <div className="order-id">#ORD-2024-001</div>
                                            <div className="order-date">Placed on Oct 12, 2024</div>
                                        </div>
                                        <span className="order-status status-delivered">Delivered</span>
                                    </div>
                                    <div className="order-item">
                                        <div>
                                            <div className="order-id">#ORD-2024-002</div>
                                            <div className="order-date">Placed on Nov 05, 2024</div>
                                        </div>
                                        <span className="order-status status-processing">Processing</span>
                                    </div>
                                    {/* Placeholder for no orders */}
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#718096', marginTop: '20px' }}>
                                        <p>You haven't placed any other orders yet.</p>
                                        <Link to="/dashboard" style={{ color: '#667eea', fontWeight: '600' }}>Start Shopping →</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, verifyOtp, resetPassword } from '../services/authService';
import './Auth.css';

/**
 * Forgot Password Page Component
 * Multi-step password reset flow with OTP verification
 */
function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    // Step 1: Request OTP
    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await forgotPassword(identifier);
            setMessage(response.message);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await verifyOtp(identifier, otp);
            setMessage(response.message);
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await resetPassword(identifier, otp, newPassword);
            setMessage(response.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Reset Password</h2>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                {/* Step 1: Enter Email or Phone */}
                {step === 1 && (
                    <form onSubmit={handleRequestOtp} className="auth-form">
                        <p className="mb-2">Enter your email or phone to receive an OTP</p>
                        <div className="form-group">
                            <label className="form-label">Email or Phone</label>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                )}

                {/* Step 2: Enter OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="auth-form">
                        <p className="mb-2">Enter the OTP sent to you (Check console for demo)</p>
                        <div className="form-group">
                            <label className="form-label">OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="form-control"
                                maxLength="6"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                )}

                {/* Step 3: Enter New Password */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="auth-form">
                        <p className="mb-2">Enter your new password</p>
                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

            </div>
        </div>
    );
}

export default ForgotPassword;

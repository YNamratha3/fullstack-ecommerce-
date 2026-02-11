import api from './api';

// Authentication Services

/**
 * User signup
 */
export const signup = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
};

/**
 * User login
 */
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        // Store token and user info in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
            id: response.data.userId,
            name: response.data.name,
            email: response.data.email,
        }));
    }
    return response.data;
};

/**
 * User logout
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

/**
 * Request password reset OTP
 */
export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

/**
 * Verify OTP
 */
export const verifyOtp = async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
};

/**
 * Reset password
 */
export const resetPassword = async (email, otp, newPassword) => {
    const response = await api.post('/auth/reset-password', { email, otp, newPassword });
    return response.data;
};

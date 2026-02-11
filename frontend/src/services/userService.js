import api from './api';

// User Services

/**
 * Get user profile
 */
export const getUserProfile = async () => {
    const response = await api.get('/users/profile');
    return response.data;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
};

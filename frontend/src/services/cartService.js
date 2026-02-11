import api from './api';

// Cart Services

/**
 * Get user's cart
 */
export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
};

/**
 * Add item to cart
 */
export const addToCart = async (productId, quantity) => {
    const response = await api.post('/cart/add', { productId, quantity });
    return response.data;
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (cartId, quantity) => {
    const response = await api.put(`/cart/update/${cartId}`, { quantity });
    return response.data;
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (cartId) => {
    const response = await api.delete(`/cart/remove/${cartId}`);
    return response.data;
};

/**
 * Clear entire cart
 */
export const clearCart = async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
};

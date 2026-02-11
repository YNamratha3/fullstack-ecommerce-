import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../services/cartService';
import './Cart.css';

/**
 * Shopping Cart Page
 * Displays items, allows quantity adjustment, and checkout
 */
function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getCart();
            setCart(data);
        } catch (err) {
            setError('Failed to load cart');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (cartId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            // Optimistic update
            const updatedCart = cart.map(item =>
                item.cartId === cartId ? { ...item, quantity: newQuantity, subtotal: item.productPrice * newQuantity } : item
            );
            setCart(updatedCart);

            await updateCartItem(cartId, newQuantity);
            // Optionally reload to ensure sync
            // loadCart();
        } catch (err) {
            alert('Failed to update quantity');
            loadCart(); // Revert on error
        }
    };

    const handleRemove = async (cartId) => {
        if (window.confirm('Remove this item from your cart?')) {
            try {
                // Optimistic update
                setCart(cart.filter(item => item.cartId !== cartId));
                await removeFromCart(cartId);
            } catch (err) {
                alert('Failed to remove item');
                loadCart();
            }
        }
    };

    const handleCheckout = async () => {
        if (window.confirm('Proceed to checkout? This will clear your cart for this demo.')) {
            try {
                await clearCart();
                setCart([]);
                alert('Checkout successful! Thank you for your order. 🛍️');
            } catch (err) {
                alert('Checkout failed');
            }
        }
    };

    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

    if (loading) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="loading">Loading your cart...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div style={{ marginBottom: '20px' }}>
                    <Link to="/dashboard" className="nav-link-small">← Continue Shopping</Link>
                </div>

                {cart.length === 0 ? (
                    <div className="cart-container" style={{ display: 'block' }}>
                        <div className="cart-items-container empty-cart">
                            <h2>Your cart is empty 😔</h2>
                            <p>Looks like you haven't added anything to your cart yet.</p>
                            <Link to="/home" className="btn btn-primary mt-3">Start Shopping</Link>
                        </div>
                    </div>
                ) : (
                    <div className="cart-container">
                        <div className="cart-items-container">
                            <h2 className="cart-header">Shopping Cart ({cart.length} items)</h2>

                            {error && <div className="error-message">{error}</div>}

                            <div className="cart-list">
                                {cart.map((item) => (
                                    <div key={item.cartId} className="cart-item">
                                        <div className="cart-item-image">
                                            📦
                                        </div>
                                        <div className="cart-item-details">
                                            <div className="cart-item-name">{item.productName}</div>
                                            <div className="cart-item-price">${item.productPrice.toFixed(2)}</div>
                                        </div>

                                        <div className="cart-item-controls">
                                            <div className="quantity-control">
                                                <button
                                                    className="btn-quantity"
                                                    onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <div className="quantity-value">{item.quantity}</div>
                                                <button
                                                    className="btn-quantity"
                                                    onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div style={{ fontWeight: '600', minWidth: '80px', textAlign: 'right' }}>
                                                ${item.subtotal.toFixed(2)}
                                            </div>

                                            <button
                                                className="btn-remove"
                                                onClick={() => handleRemove(item.cartId)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="cart-summary-container">
                            <h2 className="cart-header" style={{ fontSize: '22px' }}>Order Summary</h2>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping estimate</span>
                                <span>$0.00</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax estimate</span>
                                <span>$0.00</span>
                            </div>

                            <div className="summary-total">
                                <span>Order Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            <button className="btn-checkout" onClick={handleCheckout}>
                                Checkout
                            </button>

                            <div style={{ marginTop: '20px', fontSize: '12px', color: '#718096', textAlign: 'center' }}>
                                🔒 Secure Checkout
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;

import React from 'react';
import { addToCart } from '../services/cartService';
import { useToast } from '../context/ToastContext';

/**
 * Product Card Component
 * Displays individual product with add to cart functionality
 */
function ProductCard({ product }) {
    const { showToast } = useToast();
    const [quantity, setQuantity] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    const handleAddToCart = async () => {
        setLoading(true);
        try {
            await addToCart(product.id, quantity);
            showToast(`Added ${quantity} x ${product.name} to cart!`, 'success');
        } catch (error) {
            showToast('Please login to add items to cart', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-card">
            <span className="product-category">{product.category}</span>

            <h3>{product.name}</h3>
            <p>{product.description}</p>

            <div className="product-price">${product.price}</div>

            <div className={`product-stock ${product.stock < 10 ? 'low-stock' : ''}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>

            <div className="product-actions">
                <div className="quantity-selector">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="qty-btn"
                    >
                        -
                    </button>
                    <span className="qty-display">{quantity}</span>
                    <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="qty-btn"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={loading || product.stock === 0}
                    className="add-to-cart-btn"
                >
                    {loading ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>

            {/* Message handled by Toast */}
        </div>
    );
}

export default ProductCard;

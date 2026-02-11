package com.ecommerce.service;

import com.ecommerce.dto.AddToCartRequest;
import com.ecommerce.dto.CartItemResponse;
import com.ecommerce.model.Cart;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Service for shopping cart operations
 * Handles adding, updating, and removing cart items
 */
@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    /**
     * Get all cart items for a user
     */
    public List<CartItemResponse> getUserCart(Long userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        List<CartItemResponse> response = new ArrayList<>();

        for (Cart cartItem : cartItems) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElse(null);

            if (product != null) {
                CartItemResponse item = new CartItemResponse();
                item.setCartId(cartItem.getId());
                item.setProductId(product.getId());
                item.setProductName(product.getName());
                item.setProductDescription(product.getDescription());
                item.setProductPrice(product.getPrice());
                item.setProductImageUrl(product.getImageUrl());
                item.setQuantity(cartItem.getQuantity());
                // Calculate subtotal
                item.setSubtotal(product.getPrice().multiply(new BigDecimal(cartItem.getQuantity())));
                response.add(item);
            }
        }

        return response;
    }

    /**
     * Add item to cart or update quantity if already exists
     */
    public CartItemResponse addToCart(Long userId, AddToCartRequest request) {
        // Verify product exists
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if item already in cart
        Cart existingCart = cartRepository.findByUserIdAndProductId(userId, request.getProductId())
                .orElse(null);

        if (existingCart != null) {
            // Update quantity
            existingCart.setQuantity(existingCart.getQuantity() + request.getQuantity());
            Cart updated = cartRepository.save(existingCart);
            return buildCartItemResponse(updated, product);
        } else {
            // Add new item
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            newCart.setProductId(request.getProductId());
            newCart.setQuantity(request.getQuantity());
            Cart saved = cartRepository.save(newCart);
            return buildCartItemResponse(saved, product);
        }
    }

    /**
     * Update cart item quantity
     */
    public CartItemResponse updateCartItem(Long cartId, Integer quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        Product product = productRepository.findById(cart.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.setQuantity(quantity);
        Cart updated = cartRepository.save(cart);

        return buildCartItemResponse(updated, product);
    }

    /**
     * Remove item from cart
     */
    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    /**
     * Clear entire cart for user
     */
    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }

    /**
     * Helper method to build CartItemResponse
     */
    private CartItemResponse buildCartItemResponse(Cart cart, Product product) {
        CartItemResponse response = new CartItemResponse();
        response.setCartId(cart.getId());
        response.setProductId(product.getId());
        response.setProductName(product.getName());
        response.setProductDescription(product.getDescription());
        response.setProductPrice(product.getPrice());
        response.setProductImageUrl(product.getImageUrl());
        response.setQuantity(cart.getQuantity());
        response.setSubtotal(product.getPrice().multiply(new BigDecimal(cart.getQuantity())));
        return response;
    }
}

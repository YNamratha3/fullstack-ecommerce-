package com.ecommerce.controller;

import com.ecommerce.dto.AddToCartRequest;
import com.ecommerce.dto.CartItemResponse;
import com.ecommerce.dto.MessageResponse;
import com.ecommerce.model.User;
import com.ecommerce.service.CartService;
import com.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for shopping cart endpoints
 * Handles cart operations (requires authentication)
 */
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    /**
     * GET /api/cart - Get user's cart items
     */
    @GetMapping
    public ResponseEntity<List<CartItemResponse>> getUserCart() {
        try {
            User user = userService.getCurrentUser();
            List<CartItemResponse> cart = cartService.getUserCart(user.getId());
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * POST /api/cart/add - Add item to cart
     */
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@Valid @RequestBody AddToCartRequest request) {
        try {
            User user = userService.getCurrentUser();
            CartItemResponse response = cartService.addToCart(user.getId(), request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * PUT /api/cart/update/{cartId} - Update cart item quantity
     */
    @PutMapping("/update/{cartId}")
    public ResponseEntity<?> updateCartItem(
            @PathVariable Long cartId,
            @RequestBody Map<String, Integer> request) {
        try {
            Integer quantity = request.get("quantity");
            CartItemResponse response = cartService.updateCartItem(cartId, quantity);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * DELETE /api/cart/remove/{cartId} - Remove item from cart
     */
    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long cartId) {
        try {
            cartService.removeFromCart(cartId);
            return ResponseEntity.ok(new MessageResponse("Item removed from cart"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * DELETE /api/cart/clear - Clear entire cart
     */
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart() {
        try {
            User user = userService.getCurrentUser();
            cartService.clearCart(user.getId());
            return ResponseEntity.ok(new MessageResponse("Cart cleared"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }
}

package com.ecommerce.repository;

import com.ecommerce.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Cart entity
 * Provides database operations for shopping cart
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    // Find all cart items for a specific user
    List<Cart> findByUserId(Long userId);

    // Find specific cart item for a user and product
    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);

    // Delete all cart items for a user
    void deleteByUserId(Long userId);
}

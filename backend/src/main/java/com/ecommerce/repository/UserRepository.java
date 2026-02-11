package com.ecommerce.repository;

import com.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity
 * Provides database operations for users
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (for login)
    Optional<User> findByEmail(String email);

    // Find user by phone
    Optional<User> findByPhone(String phone);

    // Check if email already exists (for signup validation)
    Boolean existsByEmail(String email);

    // Check if phone already exists
    Boolean existsByPhone(String phone);
}

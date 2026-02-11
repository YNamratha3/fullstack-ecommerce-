package com.ecommerce.controller;

import com.ecommerce.dto.MessageResponse;
import com.ecommerce.model.User;
import com.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for user profile endpoints
 * Handles user profile operations (requires authentication)
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * GET /api/users/profile - Get current user profile
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            User user = userService.getCurrentUser();
            // Don't send password to frontend
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * PUT /api/users/profile - Update user profile
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        try {
            User user = userService.updateProfile(updatedUser);
            // Don't send password to frontend
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }
}

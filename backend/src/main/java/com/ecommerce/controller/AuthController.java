package com.ecommerce.controller;

import com.ecommerce.dto.AuthResponse;
import com.ecommerce.dto.LoginRequest;
import com.ecommerce.dto.MessageResponse;
import com.ecommerce.dto.SignupRequest;
import com.ecommerce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

/**
 * REST Controller for authentication endpoints
 * Handles signup, login, and password reset
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * POST /api/auth/signup - Register new user
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        try {
            AuthResponse response = authService.signup(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * POST /api/auth/login - User login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid email or password", false));
        }
    }

    /**
     * POST /api/auth/forgot-password - Request password reset OTP
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String identifier = request.get("email");
            if (identifier == null || identifier.isEmpty()) {
                identifier = request.get("phone");
            }

            MessageResponse response = authService.forgotPassword(identifier);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * POST /api/auth/verify-otp - Verify OTP
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        try {
            String identifier = request.get("email");
            if (identifier == null || identifier.isEmpty()) {
                identifier = request.get("phone");
            }
            String otp = request.get("otp");
            MessageResponse response = authService.verifyOtp(identifier, otp);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * POST /api/auth/reset-password - Reset password with OTP
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String identifier = request.get("email");
            if (identifier == null || identifier.isEmpty()) {
                identifier = request.get("phone");
            }
            String otp = request.get("otp");
            String newPassword = request.get("newPassword");
            MessageResponse response = authService.resetPassword(identifier, otp, newPassword);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage(), false));
        }
    }
}

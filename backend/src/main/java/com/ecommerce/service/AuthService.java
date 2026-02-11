package com.ecommerce.service;

import com.ecommerce.dto.AuthResponse;
import com.ecommerce.dto.LoginRequest;
import com.ecommerce.dto.MessageResponse;
import com.ecommerce.dto.SignupRequest;
import com.ecommerce.model.PasswordResetOtp;
import com.ecommerce.model.User;
import com.ecommerce.repository.PasswordResetOtpRepository;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

/**
 * Service for authentication operations
 * Handles signup, login, and password reset
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetOtpRepository otpRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Register new user
     */
    public AuthResponse signup(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (request.getPhone() != null && !request.getPhone().isEmpty()
                && userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        User savedUser = userRepository.save(user);

        // Return success message (redirect to login)
        AuthResponse response = new AuthResponse();
        response.setUserId(savedUser.getId());
        response.setEmail(savedUser.getEmail());
        response.setName(savedUser.getName());
        response.setMessage("Signup successful! Please login.");
        return response;
    }

    /**
     * Login user and generate JWT token
     */
    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token
        String token = jwtUtil.generateToken(request.getEmail());

        // Get user details
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail());
    }

    /**
     * Send OTP for password reset
     * In a real application, this would send an email
     * For demo purposes, we just log it to console
     */
    public MessageResponse forgotPassword(String identifier) {
        // Check if user exists by email or phone
        User user;
        if (identifier.contains("@")) {
            user = userRepository.findByEmail(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found with this email"));
        } else {
            user = userRepository.findByPhone(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found with this phone number"));
        }

        String email = user.getEmail();

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        // Save OTP to database
        PasswordResetOtp otpEntity = new PasswordResetOtp();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiresAt(LocalDateTime.now().plusMinutes(10)); // OTP valid for 10 minutes
        otpRepository.save(otpEntity);

        // In real app, send email here
        // For demo, just log to console
        System.out.println("=================================");
        System.out.println("Password Reset OTP for " + email + ": " + otp);
        System.out.println("OTP expires in 10 minutes");
        System.out.println("=================================");

        return new MessageResponse("OTP sent! For demo purposes, here is your OTP: " + otp);
    }

    /**
     * Verify OTP
     */
    /**
     * Verify OTP
     */
    public MessageResponse verifyOtp(String identifier, String otp) {
        String email = identifier;
        if (!identifier.contains("@")) {
            User user = userRepository.findByPhone(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found with this phone number"));
            email = user.getEmail();
        }

        PasswordResetOtp otpEntity = otpRepository
                .findByEmailAndOtpAndIsUsedFalseAndExpiresAtAfter(email, otp, LocalDateTime.now())
                .orElseThrow(() -> new RuntimeException("Invalid or expired OTP"));

        return new MessageResponse("OTP verified successfully");
    }

    /**
     * Reset password using OTP
     */
    public MessageResponse resetPassword(String identifier, String otp, String newPassword) {
        String email = identifier;
        if (!identifier.contains("@")) {
            User user = userRepository.findByPhone(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found with this phone number"));
            email = user.getEmail();
        }

        // Verify OTP
        PasswordResetOtp otpEntity = otpRepository
                .findByEmailAndOtpAndIsUsedFalseAndExpiresAtAfter(email, otp, LocalDateTime.now())
                .orElseThrow(() -> new RuntimeException("Invalid or expired OTP"));

        // Get user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Mark OTP as used
        otpEntity.setIsUsed(true);
        otpRepository.save(otpEntity);

        return new MessageResponse("Password reset successfully");
    }
}

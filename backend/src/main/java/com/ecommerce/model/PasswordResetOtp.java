package com.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * PasswordResetOtp entity for storing OTP codes for password reset
 * This maps to the 'password_reset_otp' table
 */
@Entity
@Table(name = "password_reset_otp")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 6)
    private String otp;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "is_used")
    private Boolean isUsed;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        isUsed = false;
    }
}

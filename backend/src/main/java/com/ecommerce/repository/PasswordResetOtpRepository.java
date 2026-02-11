package com.ecommerce.repository;

import com.ecommerce.model.PasswordResetOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Repository interface for PasswordResetOtp entity
 * Provides database operations for password reset OTPs
 */
@Repository
public interface PasswordResetOtpRepository extends JpaRepository<PasswordResetOtp, Long> {

    // Find the most recent unused OTP for an email
    Optional<PasswordResetOtp> findTopByEmailAndIsUsedFalseOrderByCreatedAtDesc(String email);

    // Find valid OTP (not expired and not used)
    Optional<PasswordResetOtp> findByEmailAndOtpAndIsUsedFalseAndExpiresAtAfter(
            String email, String otp, LocalDateTime currentTime);
}

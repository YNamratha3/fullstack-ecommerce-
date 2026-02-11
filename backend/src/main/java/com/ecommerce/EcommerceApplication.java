package com.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for E-Commerce Backend
 * This is the entry point of the Spring Boot application
 */
@SpringBootApplication
public class EcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
        System.out.println("E-Commerce Backend is running on http://localhost:8080");
    }

    @org.springframework.context.annotation.Bean
    public org.springframework.boot.CommandLineRunner commandLineRunner(
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        return args -> {
            System.out.println("==========================================");
            System.out.println("Encoded password for 'password123': " + passwordEncoder.encode("password123"));
            System.out.println("==========================================");
        };
    }
}

package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for cart items with product details
 * Used to send cart information to frontend
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    private Long cartId;
    private Long productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private String productImageUrl;
    private Integer quantity;
    private BigDecimal subtotal;
}

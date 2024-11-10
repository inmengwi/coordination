package com.virtual.coordination.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.math.BigDecimal

@Entity
data class Catalog (
    @Id
    val brand : String,
    val top : BigDecimal = BigDecimal.ZERO,
    val outer : BigDecimal = BigDecimal.ZERO,
    val pants : BigDecimal = BigDecimal.ZERO,
    val sneakers : BigDecimal = BigDecimal.ZERO,
    val bag : BigDecimal = BigDecimal.ZERO,
    val hat : BigDecimal = BigDecimal.ZERO,
    val socks : BigDecimal = BigDecimal.ZERO,
    val accessories : BigDecimal = BigDecimal.ZERO,
) {
    @Schema(hidden = true)
    fun getTotalAmount() : BigDecimal {
        return getAllCategories().values
            .sumOf { it }
    }

    @Schema(hidden = true)
    fun getAllCategories() : Map<Category, BigDecimal> {
        return mapOf(
            Category.Top to top,
            Category.Outer to outer,
            Category.Pants to pants,
            Category.Sneakers to sneakers,
            Category.Bag to bag,
            Category.Hat to hat,
            Category.Socks to socks,
            Category.Accessories to accessories
        )
    }

    @Schema(hidden = true)
    fun getPrice(category: Category): BigDecimal {
        return getAllCategories().getValue(category)
    }
}
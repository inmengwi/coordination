package com.virtual.coordination.controller.dto

import java.math.BigDecimal

data class LowestBrandDto (
    val brand : String,
    val categories : List<CategoryItemDto>,
    val totalAmount : BigDecimal
)
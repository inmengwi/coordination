package com.virtual.coordination.controller.dto

import java.math.BigDecimal

data class LowestsCategoryItemDto (
    val category : String,
    val brand : String,
    val price : BigDecimal
)
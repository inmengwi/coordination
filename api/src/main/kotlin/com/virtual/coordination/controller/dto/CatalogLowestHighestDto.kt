package com.virtual.coordination.controller.dto

import com.virtual.coordination.entity.CategoryItem

data class CatalogLowestHighestDto (
    val category: String,
    val lowests : List<CategoryItem>,
    val highests : List<CategoryItem>,
)

package com.virtual.coordination.controller.mapper

import com.virtual.coordination.controller.dto.CatalogLowestHighestDto
import com.virtual.coordination.controller.dto.CategoryItemDto
import com.virtual.coordination.controller.dto.LowestBrandDto
import com.virtual.coordination.controller.dto.LowestsCategoryItemDto
import com.virtual.coordination.entity.Catalog
import com.virtual.coordination.entity.CategoryItem
import com.virtual.coordination.entity.HighestAndLowest
import org.springframework.stereotype.Component

@Component
class CatalogDtoMapper {
    fun map(category: String, highestAndLowest: HighestAndLowest): CatalogLowestHighestDto {
        return CatalogLowestHighestDto(
            category = category,
            lowests = highestAndLowest.lowests,
            highests = highestAndLowest.highests,
        )
    }

    fun map(catalog: Catalog): LowestBrandDto {
        return LowestBrandDto(
            catalog.brand,
            catalog.getAllCategories().keys
                .map { category ->
                    CategoryItemDto(catalog.getPrice(category), category.code)
                },
            catalog.getTotalAmount()
        )
    }

    fun map(categoryItems: List<CategoryItem>): List<LowestsCategoryItemDto> {
        return categoryItems.stream()
            .map { categoryItem -> LowestsCategoryItemDto(
                categoryItem.category,
                categoryItem.brand,
                categoryItem.price
            ) }
            .toList()
    }
}
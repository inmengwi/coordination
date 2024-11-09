package com.virtual.coordination.service

import com.virtual.coordination.entity.Catalog
import com.virtual.coordination.entity.Category
import com.virtual.coordination.entity.HighestAndLowest
import com.virtual.coordination.entity.CategoryItem
import com.virtual.coordination.repository.CatalogRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

enum class PriceType {
    Lowest,
    Highest
}

@Service
class CoordinationService @Autowired constructor(
    private val catalogRepository: CatalogRepository
) {
    fun findLowestHighest(category: Category): HighestAndLowest {
        return HighestAndLowest(
            listOf(
                toItem(
                    getCatalogBy(category, PriceType.Lowest),
                    category
                )
            ),
            listOf(
                toItem(
                    getCatalogBy(category, PriceType.Highest),
                    category
                )
            ),
        )
    }

    fun findLowestTotalAmountBrand(): Catalog {
        return catalogRepository.findAll()
            .minBy(Catalog::getTotalAmount)
    }

    fun findLowestCategoryItem(): List<CategoryItem> {
        return Category.allCategory
            .map { category ->
                toItem(
                    getCatalogBy(category, PriceType.Lowest),
                    category
                )
            }
            .toList()
    }

    private fun toItem(catalog: Catalog, category: Category) = CategoryItem(
        catalog.getPrice(category),
        category.code,
        catalog.brand
    )

    private fun getCatalogBy(category: Category, priceType: PriceType) =
        catalogRepository.findTopByCategory(category.code, priceType == PriceType.Lowest)
            ?: throw IllegalStateException("카테고리에 해당하는 가격 정보를 찾을 수 없습니다.")
}
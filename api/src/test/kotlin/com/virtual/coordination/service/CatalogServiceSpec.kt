package com.virtual.coordination.service

import com.virtual.coordination.entity.Catalog
import com.virtual.coordination.entity.Category
import com.virtual.coordination.entity.CategoryItem
import com.virtual.coordination.entity.HighestAndLowest
import com.virtual.coordination.repository.CatalogRepository
import io.kotest.core.spec.style.StringSpec
import io.kotest.data.forAll
import io.kotest.data.row
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.mockk
import java.math.BigDecimal

class CatalogServiceSpec : StringSpec({
    val catalogRepository = mockk<CatalogRepository>()
    val coordinationService = CoordinationService(catalogRepository)

    "특정 카테고리 중에서 최고가 브랜드와 가격 최저가 브랜드와 가격을 가져온다." {
        every {
            catalogRepository.findTopByCategory(Category.Top.code, true)
        } returns Catalog("A", top = BigDecimal.valueOf(1000L))

        every {
            catalogRepository.findTopByCategory(Category.Top.code, false)
        } returns Catalog("B", top = BigDecimal.valueOf(10000L))

        forAll(
            row(
                Category.Top, HighestAndLowest(
                    listOf(CategoryItem(BigDecimal(1000L), Category.Top.code, "A")),
                    listOf(CategoryItem(BigDecimal(10000L), Category.Top.code, "B"))
                )
            )
        ) {
          category, expected -> coordinationService.findLowestHighest(category) shouldBe expected
        }
    }

    "하나의 브랜드에서 모든 카테고리로 주문 시 가장 가격이 낮은 브랜드 찾기" {
        val catalogA = Catalog("A", outer=BigDecimal.valueOf(5000L), accessories=BigDecimal.valueOf(3000L))
        val catalogB = Catalog("B", top=BigDecimal.valueOf(1000L), bag=BigDecimal.valueOf(2000L))
        val catalogC = Catalog("C", pants=BigDecimal.valueOf(10000L))

        every { catalogRepository.findAll() } returns listOf(catalogA, catalogB, catalogC)

        coordinationService.findLowestTotalAmountBrand() shouldBe catalogB
    }

    "카테고리들 중에서 가격이 가장 낮은 브랜드와 가격 리스트를 찾기" {
        every {
            catalogRepository.findTopByCategory(Category.Top.code, true)
        } returns Catalog("C", top=BigDecimal.valueOf(5000L))

        every {
            catalogRepository.findTopByCategory(Category.Outer.code, true)
        } returns Catalog("B", outer=BigDecimal.valueOf(9000L))

        every {
            catalogRepository.findTopByCategory(Category.Pants.code, true)
        } returns Catalog("C", pants=BigDecimal.valueOf(8000L))

        every {
            catalogRepository.findTopByCategory(Category.Sneakers.code, true)
        } returns Catalog("A", sneakers=BigDecimal.valueOf(10000L))

        every {
            catalogRepository.findTopByCategory(Category.Bag.code, true)
        } returns Catalog("D", bag=BigDecimal.valueOf(15000L))

        every {
            catalogRepository.findTopByCategory(Category.Hat.code, true)
        } returns Catalog("A", hat=BigDecimal.valueOf(20000L))

        every {
            catalogRepository.findTopByCategory(Category.Socks.code, true)
        } returns Catalog("A", socks=BigDecimal.valueOf(3000L))

        every {
            catalogRepository.findTopByCategory(Category.Accessories.code, true)
        } returns Catalog("A", accessories=BigDecimal.valueOf(7000L))

        val expected = listOf(
            CategoryItem(BigDecimal.valueOf(5000L), Category.Top.code, "C"),
            CategoryItem(BigDecimal.valueOf(9000L), Category.Outer.code, "B"),
            CategoryItem(BigDecimal.valueOf(8000L), Category.Pants.code, "C"),
            CategoryItem(BigDecimal.valueOf(10000L), Category.Sneakers.code, "A"),
            CategoryItem(BigDecimal.valueOf(15000L), Category.Bag.code, "D"),
            CategoryItem(BigDecimal.valueOf(20000L), Category.Hat.code, "A"),
            CategoryItem(BigDecimal.valueOf(3000L), Category.Socks.code, "A"),
            CategoryItem(BigDecimal.valueOf(7000L), Category.Accessories.code, "A"),
        )

        coordinationService.findLowestCategoryItem() shouldBe expected
    }
})
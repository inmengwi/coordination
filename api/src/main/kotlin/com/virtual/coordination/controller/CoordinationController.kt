package com.virtual.coordination.controller

import com.virtual.coordination.controller.mapper.*
import com.virtual.coordination.controller.dto.*
import com.virtual.coordination.entity.Category
import com.virtual.coordination.service.CoordinationService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(name = "Coordination", description = "Coordination Query API")
@RestController
@RequestMapping("/coordination")
class CoordinationController @Autowired constructor(
    private val coordinationService: CoordinationService,
    private val mapper: CatalogDtoMapper
) {
    @Operation(summary = "카테고리 별 최저가격 브랜드와 상품 가격 총액")
    @GetMapping("/find-lowest-category-item")
    fun findLowestCategoryItem(): ResponseEntity<List<LowestsCategoryItemDto>> {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(mapper.map(coordinationService.findLowestCategoryItem()))
    }

    @Operation(summary = "단일 브랜드로 구매시 최저가인 브랜드")
    @GetMapping("/find-lowest-brand")
    fun findLowestBrand(): ResponseEntity<LowestBrandDto> {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(mapper.map(coordinationService.findLowestTotalAmountBrand()))
    }

    @Operation(summary = "특정 카테고리의 최저가 최고가 브랜드명/가격")
    @PostMapping("/find-lowest-highest")
    fun findLowestHighest(@RequestBody categoryName: String): ResponseEntity<CatalogLowestHighestDto> {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(
                mapper.map(
                    categoryName,
                    coordinationService.findLowestHighest(Category.codeOf(categoryName))
                )
            )
    }
}
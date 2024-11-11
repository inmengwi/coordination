package com.virtual.coordination.controller

import com.virtual.coordination.entity.Catalog
import com.virtual.coordination.service.CatalogService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(name = "Catalog", description = "Brand Catalog Resource API")
@RestController
@RequestMapping("/catalogs")
public class CatalogController @Autowired constructor(
    private val catalogService: CatalogService
) {
    @Operation(summary = "브랜드 카탈로그를 추가합니다.")
    @PostMapping
    fun add(@RequestBody catalogs: List<Catalog>) : ResponseEntity<List<Catalog>> {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(catalogService.add(catalogs))
    }

    @Operation(summary = "브랜드 카탈로그를 변경 합니다.")
    @PutMapping("/{brand}")
    fun upsert(@PathVariable brand: String, @RequestBody catalog: Catalog) : ResponseEntity<Catalog>? {
        val statusCode: HttpStatusCode =
            if (catalogService.existsBy(brand)) HttpStatus.OK else HttpStatus.CREATED

        if(brand != catalog.brand) return ResponseEntity.badRequest().build()

        return ResponseEntity
            .status(statusCode)
            .body(catalogService.upsert(catalog))
    }

    @Operation(summary = "브랜드 카탈로그를 삭제 합니다.")
    @DeleteMapping("/{brand}")
    fun delete(@PathVariable brand: String) : ResponseEntity<Catalog>? {
        if(!catalogService.existsBy(brand))
            return ResponseEntity.notFound().build()

        catalogService.delete(brand)
        return ResponseEntity.noContent().build()
    }

    @Operation(summary = "브랜드 카탈로그 전체 데이터를 조회 합니다.")
    @GetMapping
    fun findAll() : ResponseEntity<List<Catalog>> {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(catalogService.findAll())
    }
}
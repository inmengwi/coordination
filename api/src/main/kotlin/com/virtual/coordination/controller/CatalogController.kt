package com.virtual.coordination.controller

import com.virtual.coordination.entity.Catalog
import com.virtual.coordination.service.BrandService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.jpa.domain.AbstractPersistable_.id
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@Tag(name = "Catalog", description = "Catalog Resource API")
@RestController
@RequestMapping("/catalogs")
public class CatalogController @Autowired constructor(
    private val brandService: BrandService
) {
    @Operation(summary = "브랜드 카탈로그를 추가합니다.")
    @PostMapping
    fun add(@RequestBody catalogs: List<Catalog>) : ResponseEntity<List<String>> {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(brandService.add(catalogs).map { it.brand })
    }

    @Operation(summary = "브랜드 카탈로그를 변경 합니다.")
    @PutMapping("/{brand}")
    fun upsert(@PathVariable brand: String, @RequestBody catalog: Catalog) : ResponseEntity<Catalog>? {
        val statusCode: HttpStatusCode =
            if (brandService.existsBy(brand)) HttpStatus.OK else HttpStatus.CREATED

        if(brand != catalog.brand) return ResponseEntity.badRequest().build()

        return ResponseEntity
            .status(statusCode)
            .body(brandService.upsert(catalog))
    }

    @Operation(summary = "브랜드 카탈로그를 삭제 합니다.")
    @DeleteMapping("/{brand}")
    fun delete(brand: String) : ResponseEntity<Catalog>? {
        if(!brandService.existsBy(brand))
            return ResponseEntity.notFound().build()

        brandService.delete(brand)
        return ResponseEntity.noContent().build()
    }
}
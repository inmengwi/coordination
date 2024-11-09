package com.virtual.coordination.repository

import com.virtual.coordination.entity.Catalog
import org.springframework.data.jpa.repository.JpaRepository

interface CatalogRepository : JpaRepository<Catalog, String> {
    fun findTopByCategory(category: String, isAscending: Boolean): Catalog?
}
package com.virtual.coordination.repository

import com.virtual.coordination.entity.Catalog

interface CatalogCustomRepository {
    fun findTopByCategory(category: String, isAscending: Boolean): Catalog?
}
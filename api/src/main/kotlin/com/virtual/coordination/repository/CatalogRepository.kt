package com.virtual.coordination.repository

import com.virtual.coordination.repository.CatalogCustomRepository
import com.virtual.coordination.entity.Catalog
import org.springframework.data.jpa.repository.JpaRepository

interface CatalogRepository : JpaRepository<Catalog, String>, CatalogCustomRepository {
}
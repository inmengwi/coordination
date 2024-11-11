package com.virtual.coordination.service

import com.virtual.coordination.entity.Catalog
import com.virtual.coordination.repository.CatalogRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class CatalogService @Autowired constructor(
    private val catalogRepository: CatalogRepository
) {
    fun add(catalogs: List<Catalog>) : List<Catalog> {
        return catalogRepository.saveAll(catalogs);
    }

    fun upsert(catalog: Catalog) : Catalog {
        return catalogRepository.save(catalog);
    }

    fun delete(brand: String) {
        return catalogRepository.deleteById(brand);
    }

    fun existsBy(brand: String): Boolean {
        return catalogRepository.existsById(brand)
    }

    fun findAll() : List<Catalog> {
        return catalogRepository.findAll();
    }
}

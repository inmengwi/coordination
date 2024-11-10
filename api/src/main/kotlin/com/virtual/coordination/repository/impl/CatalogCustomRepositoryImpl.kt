package com.virtual.coordination.repository.impl

import com.virtual.coordination.entity.Catalog
import com.virtual.coordination.repository.CatalogCustomRepository
import jakarta.persistence.EntityManager
import jakarta.persistence.criteria.CriteriaBuilder
import jakarta.persistence.criteria.CriteriaQuery
import jakarta.persistence.criteria.Root
import org.springframework.beans.factory.annotation.Autowired

class CatalogCustomRepositoryImpl @Autowired constructor(
    private val entityManager: EntityManager
) : CatalogCustomRepository {
    override fun findTopByCategory(category: String, isAscending: Boolean): Catalog? {
        val cb: CriteriaBuilder = entityManager.criteriaBuilder
        val cq: CriteriaQuery<Catalog> = cb.createQuery(Catalog::class.java)
        val root: Root<Catalog> = cq.from(Catalog::class.java)

        // 정렬 컬럼과 오름 차순/내림 차순을 파라미터로 동적으로 설정
        cq.select(root).orderBy(
            if (isAscending)
                cb.asc(root.get<Any>(category))
            else
                cb.desc(root.get<Any>(category))
        )

        return entityManager.createQuery(cq).setMaxResults(1).singleResult
    }
}
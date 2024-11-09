package com.virtual.coordination.entity

enum class Category (
    val code: String
) {
    Unknown("unknown"),
    Top("top"),
    Outer("outer"),
    Pants("pants"),
    Sneakers("sneakers"),
    Bag("bag"),
    Hat("hat"),
    Socks("socks"),
    Accessories("accessories");

    companion object {
        private val categoryMap = entries.associateBy(Category::code)
        val allCategory = categoryMap.values.filter { it != Unknown }

        fun codeOf(code: String?) = code?.let { categoryMap[code] } ?: Unknown
        fun from(code: String) = codeOf(code)
    }
}
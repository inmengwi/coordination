package com.virtual.coordination.entity

class BusinessException (
    message: String,
    vararg val data: Any
) : RuntimeException(message)
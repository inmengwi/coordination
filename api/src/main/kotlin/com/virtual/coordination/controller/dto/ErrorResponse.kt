package com.virtual.coordination.controller.dto

import org.springframework.http.HttpStatus
import java.time.Instant

data class ErrorResponse(
    val timestamp: Instant,
    val status: HttpStatus,
    val path: String,
    val message: String,
    val data : String?
)
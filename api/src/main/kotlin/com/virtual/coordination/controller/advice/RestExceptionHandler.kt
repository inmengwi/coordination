package com.virtual.coordination.controller.advice

import com.fasterxml.jackson.databind.ObjectMapper
import com.virtual.coordination.controller.dto.ErrorResponse
import com.virtual.coordination.entity.BusinessException
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.time.Instant

@ControllerAdvice
class RestExceptionHandler (
    private val objectMapper: ObjectMapper,
){
    @ExceptionHandler(BusinessException::class)
    fun handleException(request: HttpServletRequest, e: BusinessException): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            timestamp = Instant.now(),
            status = HttpStatus.CONFLICT,
            path = request.servletPath,
            message = e.message ?: "Unexpected error",
            data = objectMapper.writeValueAsString(e.data)
        )

        return ResponseEntity(errorResponse, errorResponse.status)
    }
}
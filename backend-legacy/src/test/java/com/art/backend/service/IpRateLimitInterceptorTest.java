package com.art.backend.service;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class IpRateLimitInterceptorTest {

    private static final int SC = 429;
    private IpRateLimitInterceptor interceptor;
    private HttpServletRequest request;
    private HttpServletResponse response;
    private StringWriter responseWriter;

    @BeforeEach
    void setUp() throws Exception {
        interceptor = new IpRateLimitInterceptor();
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);

        responseWriter = new StringWriter();
        final PrintWriter printWriter = new PrintWriter(responseWriter);
        when(response.getWriter()).thenReturn(printWriter);
    }

    @Test
    void givenNonPostRequest_whenPreHandle_thenRequestAllowed() throws Exception {
        // Given
        when(request.getMethod()).thenReturn("GET");

        // When
        final boolean result = interceptor.preHandle(request, response, new Object());

        // Then
        assertTrue(result, "Non-POST requests should be allowed");
        verify(response, never()).setStatus(anyInt());
    }

    @Test
    void givenPostRequestWithinLimit_whenPreHandle_thenRequestAllowed() throws Exception {
        // Given
        when(request.getMethod()).thenReturn("POST");
        when(request.getRemoteAddr()).thenReturn("1.2.3.4");

        // When: 3 allowed requests
        final boolean first = interceptor.preHandle(request, response, new Object());
        final boolean second = interceptor.preHandle(request, response, new Object());
        final boolean third = interceptor.preHandle(request, response, new Object());

        // Then
        assertTrue(first);
        assertTrue(second);
        assertTrue(third);
        verify(response, never()).setStatus(anyInt());
    }

    @Test
    void givenPostRequestExceedingLimit_whenPreHandle_thenRequestBlocked() throws Exception {
        // Given
        when(request.getMethod()).thenReturn("POST");
        when(request.getRemoteAddr()).thenReturn("5.6.7.8");

        // When: 3 allowed requests
        interceptor.preHandle(request, response, new Object());
        interceptor.preHandle(request, response, new Object());
        interceptor.preHandle(request, response, new Object());

        // 4th request should be blocked
        final boolean result = interceptor.preHandle(request, response, new Object());

        // Then
        assertFalse(result, "Request should be blocked due to rate limit");
        verify(response).setStatus(SC);
        assertTrue(responseWriter.toString().contains("Rate limit exceeded"));
    }

    @Test
    void givenXForwardedForHeader_whenGetClientIp_thenUseFirstIp() throws Exception {
        // Given
        when(request.getMethod()).thenReturn("POST");
        when(request.getHeader("X-Forwarded-For")).thenReturn("10.20.30.40, 50.60.70.80");
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");

        // When
        final boolean first = interceptor.preHandle(request, response, new Object());
        final boolean second = interceptor.preHandle(request, response, new Object());
        final boolean third = interceptor.preHandle(request, response, new Object());
        final boolean blocked = interceptor.preHandle(request, response, new Object());

        // Then
        assertTrue(first);
        assertTrue(second);
        assertTrue(third);
        assertFalse(blocked);

        verify(response).setStatus(SC);
        assertTrue(responseWriter.toString().contains("Rate limit exceeded"));
    }
}

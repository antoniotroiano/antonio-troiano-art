package com.art.backend.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CorsRequestLogger extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
            final FilterChain filterChain) throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            final String origin = request.getHeader("Origin");
            final String accessMethod = request.getHeader("Access-Control-Request-Method");
            final String accessHeaders = request.getHeader("Access-Control-Request-Headers");

            log.info("CORS Preflight → Origin: {}, Method: {}, Headers: {}", origin, accessMethod, accessHeaders);
        }

        filterChain.doFilter(request, response);
    }
}

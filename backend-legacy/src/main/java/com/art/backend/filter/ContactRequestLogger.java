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
public class ContactRequestLogger extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(final HttpServletRequest request) {
        return !request.getRequestURI().equals("/api/mail/contact");
    }

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
            final FilterChain filterChain) throws ServletException, IOException {

        final String method = request.getMethod();
        final String origin = request.getHeader("Origin");
        final String userAgent = request.getHeader("User-Agent");
        final String ip = request.getRemoteAddr();

        log.info("Kontakt-Anfrage → [{}] {} von IP={}, Origin={}, User-Agent={}",
                method, request.getRequestURI(), ip, origin, userAgent);

        filterChain.doFilter(request, response);
    }
}

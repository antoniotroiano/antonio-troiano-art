package com.art.backend.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class IpRateLimitInterceptor implements HandlerInterceptor {

    private static final long TIME_WINDOW_MILLIS = 60 * 60 * 1000; // 1 Stunde
    private static final int MAX_REQUESTS_PER_WINDOW = 3;
    private static final int TOO_MANY_REQUEST = 429;
    private final Map<String, RequestCounter> requestCounts = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response,
            final Object handler) throws Exception {
        if (!"POST".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        final String ip = getClientIp(request);
        final long now = Instant.now().toEpochMilli();

        final RequestCounter counter = requestCounts.computeIfAbsent(ip, s -> new RequestCounter());
        synchronized (counter) {
            counter.removeOldRequests(now - TIME_WINDOW_MILLIS);
            if (counter.getCount() >= MAX_REQUESTS_PER_WINDOW) {
                log.warn("Rate limit exceeded for IP: {} ({} requests in the last hour)", ip, counter.getCount());
                response.setStatus(TOO_MANY_REQUEST);
                response.getWriter().write("Rate limit exceeded. Please try again later.");
                return false;
            }
            counter.addRequest(now);
            log.debug("Request allowed for IP: {} ({} requests in the last hour)", ip, counter.getCount());
        }

        return true;
    }

    private static class RequestCounter {

        private final java.util.LinkedList<Long> timestamps = new java.util.LinkedList<>();

        void addRequest(final long timestamp) {
            timestamps.addLast(timestamp);
        }

        void removeOldRequests(final long cutoff) {
            while (!timestamps.isEmpty() && timestamps.getFirst() < cutoff) {
                timestamps.removeFirst();
            }
        }

        int getCount() {
            return timestamps.size();
        }
    }

    private static String getClientIp(final HttpServletRequest request) {
        final String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}

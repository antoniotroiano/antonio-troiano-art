package com.art.backend.config;

import com.art.backend.service.IpRateLimitInterceptor;

import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class WebConfigTest {

    @Test
    void givenWebConfig_whenAddInterceptors_thenInterceptorRegistered() {
        // Given
        final WebConfig webConfig = new WebConfig();
        final IpRateLimitInterceptor interceptorMock = mock(IpRateLimitInterceptor.class);
        webConfig.ipRateLimitInterceptor = interceptorMock;

        final InterceptorRegistry registryMock = mock(InterceptorRegistry.class);
        final InterceptorRegistration registrationMock = mock(InterceptorRegistration.class);

        when(registryMock.addInterceptor(interceptorMock)).thenReturn(registrationMock);
        when(registrationMock.addPathPatterns(anyString())).thenReturn(registrationMock);
        when(registrationMock.excludePathPatterns(anyString())).thenReturn(registrationMock);

        // When
        webConfig.addInterceptors(registryMock);

        // Then
        verify(registryMock).addInterceptor(interceptorMock);
        verify(registrationMock).addPathPatterns("/api/comments/post/**");
        verify(registrationMock).excludePathPatterns("/api/comments/post/**", "GET");
    }
}

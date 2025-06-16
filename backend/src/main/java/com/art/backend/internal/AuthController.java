package com.art.backend.internal;

import com.art.backend.exception.ApiException;
import com.art.backend.model.Admin;
import com.art.backend.model.RegistrationToken;
import com.art.backend.model.dto.AdminRegistrationRequest;
import com.art.backend.model.dto.AuthRequest;
import com.art.backend.repository.AdminRepository;
import com.art.backend.repository.TokenRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;

    public AuthController(final AdminRepository adminRepository, final PasswordEncoder passwordEncoder,
            final TokenRepository tokenRepository, final AuthenticationManager authenticationManager) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody final AuthRequest request) {
        final String username = request.getUsername();
        final String password = request.getPassword();

        if (adminRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin already exists");
        }

        final Admin admin = new Admin(username, passwordEncoder.encode(password));
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered");
    }

    @PostMapping("/register/token")
    @Transactional
    public ResponseEntity<?> registerAdminWithToken(@RequestParam final String token,
            @RequestBody final AdminRegistrationRequest adminRequest) {
        log.info("Token-based registration for admin: {}", adminRequest.getUsername());

        final RegistrationToken registrationToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new ApiException("Invalid token", HttpStatus.FORBIDDEN));

        if (registrationToken.getExpirationDate().isBefore(LocalDateTime.now())) {
            deleteToken(token);
            throw new ApiException("Token has expired", HttpStatus.FORBIDDEN);
        }

        if (adminRepository.findByUsername(adminRequest.getUsername()).isPresent()) {
            throw new ApiException("Username already exists", HttpStatus.BAD_REQUEST);
        }

        final Admin admin = new Admin(
                adminRequest.getUsername(),
                passwordEncoder.encode(adminRequest.getPassword())
        );

        adminRepository.save(admin);
        deleteToken(token);

        log.info("Admin registered via token: {}", admin.getUsername());
        return ResponseEntity.ok(Map.of("message", "Admin successfully registered!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody final AuthRequest request, final HttpServletRequest httpRequest) {
        final String username = request.getUsername();
        final String password = request.getPassword();

        log.info("Login attempt for user: {}", username);

        final Authentication authToken = new UsernamePasswordAuthenticationToken(username, password);

        try {
            final Authentication authentication = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            final HttpSession session = httpRequest.getSession(true);
            log.info("Session ID: {}", httpRequest.getSession().getId());
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext());

            final Cookie[] cookies = httpRequest.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    log.info("Cookie vom Client: {} = {}, SameSite: ?, Secure: {}", cookie.getName(), cookie.getValue(),
                            cookie.getSecure());
                }
            }
            log.info("Login erfolgreich. Session-ID: {}", httpRequest.getSession().getId());
            return ResponseEntity.ok(Map.of("message", "Login successful"));
        } catch (final BadCredentialsException ex) {
            log.warn("Login failed for user {}: Bad credentials", username);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (final AuthenticationException ex) {
            log.warn("Login failed for user {}: {}", username, ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentAdmin(final Authentication authentication) {
        log.info("AuthController /me called: {}", authentication);

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ApiException("Not logged in", HttpStatus.UNAUTHORIZED);
        }

        final Object principal = authentication.getPrincipal();
        final String username = (principal instanceof Admin) ? ((Admin) principal).getUsername() : principal.toString();

        log.info("Returning current user info: {}", username);
        return ResponseEntity.ok(Map.of("username", username));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(final HttpSession session) {
        session.invalidate();
        log.info("User logged out");
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    @Transactional
    public void deleteToken(final String token) {
        log.info("Deleting token: {}", token);
        tokenRepository.deleteByToken(token);
    }
}

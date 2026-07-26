package com.art.backend.service;

import com.art.backend.repository.AdminRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    public AdminDetailsService(final AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        return adminRepository.findByUsername(username)
                .map(admin -> (UserDetails) admin)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found: " + username));
    }
}

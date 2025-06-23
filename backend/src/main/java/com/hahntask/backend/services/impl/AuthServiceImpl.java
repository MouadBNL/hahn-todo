package com.hahntask.backend.services.impl;

import com.hahntask.backend.config.security.JwtService;
import com.hahntask.backend.domain.dtos.AuthenticationResponseDto;
import com.hahntask.backend.domain.dtos.SigninRequestDto;
import com.hahntask.backend.domain.dtos.SignupRequestDto;
import com.hahntask.backend.domain.entities.User;
import com.hahntask.backend.repositories.UserRepository;
import com.hahntask.backend.services.AuthService;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponseDto signup(SignupRequestDto request) {
        var existingUsername = userRepository.findByEmail(request.getEmail());
        if (existingUsername.isPresent()) {
            throw new ValidationException("Username already exists");
        }

        var existingEmail =userRepository.findByEmail(request.getEmail());
        if (existingEmail.isPresent()) {
            throw new ValidationException("Email already exists");
        }

        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        user = userRepository.save(user);
        var token = jwtService.generateToken(user);

        return AuthenticationResponseDto.builder()
                .token(token)
                .build();
    }

    @Override
    public AuthenticationResponseDto signin(SigninRequestDto request) {
        var user =userRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new BadCredentialsException("Invalid username or password")
        );
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var token = jwtService.generateToken(user);
        return AuthenticationResponseDto.builder()
                .token(token)
                .build();
    }

    @Override
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found"));
    }
}

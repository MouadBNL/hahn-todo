package com.hahntask.backend.controllers;

import com.hahntask.backend.domain.dtos.AuthenticationResponseDto;
import com.hahntask.backend.domain.dtos.SigninRequestDto;
import com.hahntask.backend.domain.dtos.SignupRequestDto;
import com.hahntask.backend.domain.dtos.UserDto;
import com.hahntask.backend.mappers.UserMapper;
import com.hahntask.backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponseDto> signup(@RequestBody @Valid SignupRequestDto body) {
        return ResponseEntity.ok(authService.signup(body));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthenticationResponseDto> signin(@RequestBody @Valid SigninRequestDto body) {
        return ResponseEntity.ok(authService.signin(body));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getAuthUser() {
        var user = authService.getAuthenticatedUser();
        return ResponseEntity.ok(UserMapper.toDto(user));
    }
}
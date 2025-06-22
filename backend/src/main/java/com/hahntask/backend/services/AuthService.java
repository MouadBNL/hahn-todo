package com.hahntask.backend.services;

import com.hahntask.backend.domain.dtos.AuthenticationResponseDto;
import com.hahntask.backend.domain.dtos.SigninRequestDto;
import com.hahntask.backend.domain.dtos.SignupRequestDto;
import com.hahntask.backend.domain.entities.User;

public interface AuthService {
    AuthenticationResponseDto signup(SignupRequestDto request);
    AuthenticationResponseDto signin(SigninRequestDto request);
    User getAuthenticatedUser();
}

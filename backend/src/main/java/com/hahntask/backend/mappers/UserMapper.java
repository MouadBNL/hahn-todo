package com.hahntask.backend.mappers;

import com.hahntask.backend.domain.dtos.UserDto;
import com.hahntask.backend.domain.entities.User;

public class UserMapper {
    public static UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId().toString())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }
}

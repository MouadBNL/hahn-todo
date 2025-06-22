package com.hahntask.backend.domain.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private String id;
    private String fullName;
    private String username;
    private String email;
}

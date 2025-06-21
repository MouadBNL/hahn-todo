package com.hahntask.backend.domain.dtos;

import com.hahntask.backend.domain.entities.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Data
public class TaskDto {
    private UUID id;

    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    @NotNull(message = "Task priority is required")
    private TaskPriority priority;

    private LocalDateTime completedAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

package com.hahntask.backend.mappers;

import com.hahntask.backend.domain.dtos.TaskDto;
import com.hahntask.backend.domain.entities.Task;
import org.springframework.stereotype.Component;

public class TaskMapper {

    public static Task fromDto(TaskDto taskDto) {
        return Task.builder()
                .id(taskDto.getId())
                .title(taskDto.getTitle())
                .description(taskDto.getDescription())
                .priority(taskDto.getPriority())
                .completedAt(taskDto.getCompletedAt())
                .createdAt(taskDto.getCreatedAt())
                .updatedAt(taskDto.getUpdatedAt())
                .build();
    }

    public static TaskDto toDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .completedAt(task.getCompletedAt())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}

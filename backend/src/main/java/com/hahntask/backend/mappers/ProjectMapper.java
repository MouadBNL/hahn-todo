package com.hahntask.backend.mappers;

import com.hahntask.backend.domain.dtos.ProjectDto;
import com.hahntask.backend.domain.entities.Project;

public class ProjectMapper {
    public static Project fromDto(ProjectDto projectDto) {
        return Project.builder()
                .name(projectDto.getName())
                .build();
    }

    public static ProjectDto toDto(Project project) {
        return ProjectDto.builder()
                .name(project.getName())
                .id(project.getId())
                .build();
    }
}

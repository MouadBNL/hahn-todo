package com.hahntask.backend.services;

import com.hahntask.backend.domain.entities.Project;
import com.hahntask.backend.domain.entities.Task;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface ProjectService {
    List<Project> index();
    Project create(Project project);
    Project find(UUID uuid);
    Project update(UUID uuid, Project project);
    List<Task> tasks(UUID projectId);
    void delete(UUID uuid);
}

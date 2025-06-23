package com.hahntask.backend.services.impl;

import com.hahntask.backend.domain.entities.Project;
import com.hahntask.backend.domain.entities.Task;
import com.hahntask.backend.repositories.ProjectRepository;
import com.hahntask.backend.repositories.TaskRepository;
import com.hahntask.backend.services.AuthService;
import com.hahntask.backend.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final AuthService authService;
    private final TaskRepository taskRepository;

    @Override
    public List<Project> index() {
        var auth = authService.getAuthenticatedUser();
        return projectRepository.findByOwnerId(auth.getId());
    }

    @Override
    public Project create(Project project) {
        var auth = authService.getAuthenticatedUser();
        project.setOwner(auth);
        return projectRepository.save(project);
    }

    @Override
    public Project find(UUID uuid) {
        var auth = authService.getAuthenticatedUser();
        var project = projectRepository.findById(uuid).orElseThrow();
        if (!auth.getId().equals(project.getOwner().getId())) {
            return null;
        }
        return project;
    }

    @Override
    public Project update(UUID uuid, Project project) {
        var auth = authService.getAuthenticatedUser();
        var existing = projectRepository.findById(uuid).orElseThrow();
        if (auth.getId().equals(existing.getOwner().getId())) {
            return null;
        }
        project.setName(project.getName());
        return projectRepository.save(project);
    }

    @Override
    public List<Task> tasks(UUID projectId) {
        var auth = authService.getAuthenticatedUser();
        var project = projectRepository.findById(projectId).orElseThrow();
        if (!auth.getId().equals(project.getOwner().getId())) {
            return List.of();
        }
        return taskRepository.findByOwnerIdAndProjectId(auth.getId(), projectId);
    }

    @Override
    public void delete(UUID uuid) {
        var auth = authService.getAuthenticatedUser();
        var project = projectRepository.findById(uuid).orElseThrow();
        if (!auth.getId().equals(project.getOwner().getId())) {
            return;
        }
        projectRepository.deleteById(uuid);
    }
}

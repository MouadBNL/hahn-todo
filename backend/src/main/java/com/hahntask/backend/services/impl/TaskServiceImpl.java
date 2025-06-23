package com.hahntask.backend.services.impl;

import com.hahntask.backend.domain.entities.Task;
import com.hahntask.backend.repositories.TaskRepository;
import com.hahntask.backend.services.AuthService;
import com.hahntask.backend.services.ProjectService;
import com.hahntask.backend.services.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final AuthService authService;
    private final ProjectService projectService;

    @Override
    public List<Task> inbox() {
        var auth = authService.getAuthenticatedUser();
        return taskRepository.findByOwnerIdAndProjectId(auth.getId(), null);
    }

    @Override
    public Task find(UUID uuid) {
        var task = taskRepository.findById(uuid).orElseThrow();
        var auth = authService.getAuthenticatedUser();
        if (!auth.getId().equals(task.getOwner().getId())) {
            return null;
        }
        return task;
    }

    public Task create(Task task, UUID projectId) {
        var auth = authService.getAuthenticatedUser();
        task.setOwner(auth);
        if(projectId != null) {
            var project = projectService.find(projectId);
            task.setProject(project);
        }
        return taskRepository.save(task);
    }

    @Override
    public Task update(UUID uuid, Task task, UUID projectId) {
        var existing = taskRepository.findById(uuid).orElseThrow();
        var auth = authService.getAuthenticatedUser();
        if (!auth.getId().equals(existing.getOwner().getId())) {
            return null;
        }
        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setPriority(task.getPriority());
        existing.setCompletedAt(task.getCompletedAt());
        return taskRepository.save(existing);
    }

    @Override
    public void delete(UUID uuid) {
        var task = taskRepository.findById(uuid).orElseThrow();
        var auth = authService.getAuthenticatedUser();
        if (!auth.getId().equals(task.getOwner().getId())) {
            return;
        }
        taskRepository.deleteById(uuid);
    }
}

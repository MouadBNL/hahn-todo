package com.hahntask.backend.services.impl;

import com.hahntask.backend.domain.entities.Task;
import com.hahntask.backend.repositories.TaskRepository;
import com.hahntask.backend.services.AuthService;
import com.hahntask.backend.services.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final AuthService authService;

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

    public Task create(Task task) {
        var auth = authService.getAuthenticatedUser();
        task.setOwner(auth);
        return taskRepository.save(task);
    }

    @Override
    public Task update(UUID uuid, Task task) {
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

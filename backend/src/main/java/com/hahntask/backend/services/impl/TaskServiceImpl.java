package com.hahntask.backend.services.impl;

import com.hahntask.backend.domain.entities.Task;
import com.hahntask.backend.repositories.TaskRepository;
import com.hahntask.backend.services.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    @Override
    public Task find(UUID uuid) {
        return taskRepository.findById(uuid).orElse(null);
    }

    public Task create(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task update(UUID uuid, Task task) {
        var existing = taskRepository.findById(uuid).orElseThrow();
        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setPriority(task.getPriority());
        existing.setCompletedAt(task.getCompletedAt());
        return taskRepository.save(existing);
    }

    @Override
    public void delete(UUID uuid) {
        taskRepository.deleteById(uuid);
    }
}

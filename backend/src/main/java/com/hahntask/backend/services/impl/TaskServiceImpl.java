package com.hahntask.backend.services.impl;

import com.hahntask.backend.domain.entities.Task;
import com.hahntask.backend.repositories.TaskRepository;
import com.hahntask.backend.services.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public List<Task> getAll() {
        return taskRepository.findAll();
    }
}

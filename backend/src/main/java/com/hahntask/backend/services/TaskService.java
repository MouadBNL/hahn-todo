package com.hahntask.backend.services;

import com.hahntask.backend.domain.entities.Task;

import java.util.List;
import java.util.UUID;

public interface TaskService {
    List<Task> inbox();

    Task find(UUID uuid);

    Task create(Task task, UUID projectId);

    Task update(UUID uuid, Task task, UUID projectId);

    void delete(UUID uuid);
}

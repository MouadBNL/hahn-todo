package com.hahntask.backend.services;

import com.hahntask.backend.domain.entities.Task;

import java.util.List;

public interface TaskService {
    List<Task> getAll();
}

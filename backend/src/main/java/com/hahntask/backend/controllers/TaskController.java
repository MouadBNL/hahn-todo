package com.hahntask.backend.controllers;

import com.hahntask.backend.domain.entities.Task;
import com.hahntask.backend.services.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public List<Task> index() {
        return taskService.getAll();
    }
}

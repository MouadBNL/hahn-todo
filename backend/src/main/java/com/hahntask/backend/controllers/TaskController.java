package com.hahntask.backend.controllers;

import com.hahntask.backend.domain.dtos.TaskDto;
import com.hahntask.backend.mappers.TaskMapper;
import com.hahntask.backend.services.TaskService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskDto>> index() {
        List<TaskDto> tasks = taskService.inbox().stream().map(TaskMapper::toDto).toList();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<TaskDto> show(@PathVariable UUID id) {
        var task = taskService.find(id);
        return ResponseEntity.ok(TaskMapper.toDto(task));
    }

    @PostMapping
    public ResponseEntity<TaskDto> create(@RequestBody @Valid TaskDto taskDto) {
        var task = taskService.create(TaskMapper.fromDto(taskDto), taskDto.getProjectId());
        return ResponseEntity.ok(TaskMapper.toDto(task));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<TaskDto> getById(@PathVariable UUID id, @RequestBody @Valid TaskDto taskDto) {
        var task = taskService.update(id, TaskMapper.fromDto(taskDto), taskDto.getProjectId());
        return ResponseEntity.ok(TaskMapper.toDto(task));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Object> delete(@PathVariable UUID id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.hahntask.backend.controllers;

import com.hahntask.backend.domain.dtos.ProjectDto;
import com.hahntask.backend.domain.dtos.TaskDto;
import com.hahntask.backend.mappers.ProjectMapper;
import com.hahntask.backend.mappers.TaskMapper;
import com.hahntask.backend.services.ProjectService;
import com.hahntask.backend.services.TaskService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@AllArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectDto>> index() {
        var projects = projectService.index().stream().map(ProjectMapper::toDto).toList();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> show(@PathVariable UUID id) {
        var project = projectService.find(id);
        return ResponseEntity.ok(ProjectMapper.toDto(project));
    }

    @PostMapping
    public ResponseEntity<ProjectDto> create(@RequestBody @Valid ProjectDto projectDto) {
        var project = projectService.create(ProjectMapper.fromDto(projectDto));
        return ResponseEntity.ok(ProjectMapper.toDto(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> update(@PathVariable UUID id, @RequestBody @Valid ProjectDto projectDto) {
        var project = projectService.update(id, ProjectMapper.fromDto(projectDto));
        return ResponseEntity.ok(ProjectMapper.toDto(project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProjectDto> delete(@PathVariable UUID id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<TaskDto>> tasks(@PathVariable UUID id) {
        var tasks = projectService.tasks(id).stream().map(TaskMapper::toDto).toList();
        return ResponseEntity.ok(tasks);
    }
}

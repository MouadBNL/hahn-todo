package com.hahntask.backend.repositories;

import com.hahntask.backend.domain.entities.Project;
import com.hahntask.backend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByOwnerId(UUID ownerId);
}

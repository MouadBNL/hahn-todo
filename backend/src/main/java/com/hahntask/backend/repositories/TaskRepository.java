package com.hahntask.backend.repositories;

import com.hahntask.backend.domain.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByOwnerIdAndProjectId(UUID ownerId, UUID project_id);
}

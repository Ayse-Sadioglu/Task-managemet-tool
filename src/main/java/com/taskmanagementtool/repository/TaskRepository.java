package com.taskmanagementtool.repository;

import com.taskmanagementtool.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

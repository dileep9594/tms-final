package com.taskmanagementsystem.tms.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanagementsystem.tms.model.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
  List<Task> findAllByUserId(Long id);
}
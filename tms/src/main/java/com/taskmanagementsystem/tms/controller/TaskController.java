package com.taskmanagementsystem.tms.controller;


import jakarta.validation.Valid;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskmanagementsystem.tms.dto.ApiResponse;
import com.taskmanagementsystem.tms.model.Status;
import com.taskmanagementsystem.tms.model.Task;
import com.taskmanagementsystem.tms.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }
    // Task Management -> Add ,edit and delete tasks
    @PostMapping("/user/{id}")
    public ResponseEntity<ApiResponse> createTask(@Valid @RequestBody Task task, @PathVariable("id") Long userId) {
        return new ResponseEntity<>(service.createTask(task, userId), HttpStatus.CREATED);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<ApiResponse> getTaskById(@PathVariable Integer taskId) {
        return new ResponseEntity<>(service.getTaskById(taskId), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Task>> getAllTasks(@PathVariable("id") Long userId) {
        return new ResponseEntity<>(service.getAllTasks(userId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateTask(@PathVariable Integer id, @Valid @RequestBody Task task) {
        return new ResponseEntity<>(service.updateTask(task, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTaskById(@PathVariable Integer id) {
        service.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }


    @PatchMapping("/{id}/task-pending")
    public ResponseEntity<ApiResponse> inCompletedTodo(@PathVariable Integer id){
        return ResponseEntity.ok(service.pendingTask(id));
    }
    // Real-Time Deadline Updates
    @GetMapping("/remaining")
    public ResponseEntity<String> getRemainingDuration(@RequestParam String dueDateTime) {
        String remainingTime = service.getRemaining(dueDateTime);
        return ResponseEntity.ok(remainingTime);
    }
    // progress scoring
    @PatchMapping("/taskDone/{taskId}")
    public ResponseEntity<String> completedTask(@PathVariable Integer taskId, @RequestParam Long userId) {
    service.updateTaskCompletionStatus(taskId, userId,Status.DONE);
    return ResponseEntity.ok("Task completed and score updated.");
    }

    // @GetMapping("/score/{userId}")
    // public ResponseEntity<UserScoreDto> getUserScore(@PathVariable Long userId){
    // UserScoreDto userScoreDto = service.getUserScore(userId);
    //     return ResponseEntity.ok(userScoreDto) ;
    // }
   
}

package com.taskmanagementsystem.tms.service ;




import java.util.List;

import com.taskmanagementsystem.tms.dto.ApiResponse;
import com.taskmanagementsystem.tms.model.Status;
import com.taskmanagementsystem.tms.model.Task;

public interface TaskService {
    ApiResponse createTask(Task task, Long userId);

    ApiResponse getTaskById(Integer taskId);

    List<Task> getAllTasks(Long userId);

    ApiResponse updateTask(Task task, Integer id);

    public void deleteTask(Integer id);

    ApiResponse doneTask(Integer id);

    ApiResponse pendingTask(Integer id);
    
    String getRemaining(String dueDate);

    void updateTaskCompletionStatus(Integer taskId, Long userId, Status done);
}
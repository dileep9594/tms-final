package com.taskmanagementsystem.tms.service.Impl;



import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.taskmanagementsystem.tms.dto.ApiResponse;
import com.taskmanagementsystem.tms.exception.ResourceNotFoundException;
import com.taskmanagementsystem.tms.model.Status;
import com.taskmanagementsystem.tms.model.Task;
import com.taskmanagementsystem.tms.model.User;
import com.taskmanagementsystem.tms.repository.TaskRepository;
import com.taskmanagementsystem.tms.repository.UserRepository;
import com.taskmanagementsystem.tms.service.TaskService;
import com.taskmanagementsystem.tms.utility.TimeUtils; 

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ApiResponse createTask(Task task, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User not found, Id: " + userId));
        task.setUser(user);

        Task savedTask = taskRepository.save(task);
        return new ApiResponse("Task Saved", savedTask);
    }

    @Override
    public ApiResponse getTaskById(Integer taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(()-> new ResourceNotFoundException("Task not found, Id: " + taskId));
        return new ApiResponse("Found task", task);
    }

    @Override
    public List<Task> getAllTasks(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User not found, Id" + userId));
        List<Task> taskList = taskRepository.findAllByUserId(user.getId());
        return taskList;
    }

    @Override
    public ApiResponse updateTask(Task task, Integer id) {
        Task foundTask = taskRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Task not found, Id" + id));
        foundTask.setTitle(task.getTitle());
        foundTask.setStatus(task.getStatus());
        foundTask.setDescription(task.getDescription()); // Set details
        Task updatedTask = taskRepository.save(foundTask);
        return new ApiResponse("Task updated!",updatedTask);
    }

    @Override
    public void deleteTask(Integer id) {
        Task task = taskRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Task not found, Id" + id));
        taskRepository.delete(task);
    }

    @Override
    public ApiResponse doneTask(Integer id) {
        Task task = taskRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Task not found, Id" +id));
        task.setStatus(Status.DONE);
        return new ApiResponse("Task done", taskRepository.save(task));
    }

    @Override
    public ApiResponse pendingTask(Integer id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task Not Found, Id: " + id));
        task.setStatus(Status.IN_PROGRESS);
        return new ApiResponse("Task pending", taskRepository.save(task));
        
    }
    @Override
    public String getRemaining(String dueDate){
        TimeUtils timeUtils = new TimeUtils() ;
        String remainingTime = timeUtils.getRemainingTime(dueDate);
        return remainingTime ;
    }
    @Override
    public void updateTaskCompletionStatus(Integer taskId, Long userId, Status status) {
        // Fetch the user by userId
        User user = userRepository.findById(userId)
                                  .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
        // Filter the user's tasks to find the one with the specified taskId
        Task task = user.getTaskList().stream()
                        .filter(t -> t.getId().equals(taskId))
                        .findFirst()
                        .orElseThrow(() -> new ResourceNotFoundException("Task not found for this user"));
    
        // Proceed if the status is DONE

            LocalDateTime completionTime = LocalDateTime.now(); // Capture the current time as completion time
    
            // Format and parse the due date
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime dueDate = LocalDateTime.parse(task.getDueDate(), formatter);
    
            // Update the user's score based on the completion time
            if (completionTime.isBefore(dueDate)) {
                user.setScore(user.getScore() + 1); // Increment score
            } else {
                user.setScore(user.getScore() - 0.5); // Decrement score
            }
        // Save the updated user and task
        task.setStatus(status);
        userRepository.save(user);
        taskRepository.save(task);
    }

}

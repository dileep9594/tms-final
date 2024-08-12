package com.taskmanagementsystem.tms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    @NotEmpty(message = "Invalid: task cannot be empty")
    private String title;
    private String description;
    private String taskCreatedAt;
    private String dueDate ;
    @Enumerated(EnumType.STRING)
    private Status status ;
    @ManyToOne
    @JsonIgnore
    private User user;
}

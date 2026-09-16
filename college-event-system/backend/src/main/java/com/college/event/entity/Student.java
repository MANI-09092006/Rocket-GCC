package com.college.event.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "std_id")
    private Long stdId;

    @NotBlank(message = "Student name is required")
    @Size(max = 50, message = "Student name cannot exceed 50 characters")
    @Column(name = "std_name", nullable = false, length = 50)
    private String stdName;

    @NotBlank(message = "Department is required")
    @Size(max = 50, message = "Department cannot exceed 50 characters")
    @Column(name = "Department", nullable = false, length = 50)
    private String department;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    @Column(name = "Email", nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(max = 50, message = "Password cannot exceed 50 characters")
    @Column(name = "Password", nullable = false, length = 50)
    private String password;

    @NotBlank(message = "Phone number is required")
    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    @Column(name = "Phno", nullable = false, length = 15)
    private String phno;

    public Student() {
    }

    public Student(String stdName, String department, String email, String password, String phno) {
        this.stdName = stdName;
        this.department = department;
        this.email = email;
        this.password = password;
        this.phno = phno;
    }

    public Long getStdId() {
        return stdId;
    }

    public void setStdId(Long stdId) {
        this.stdId = stdId;
    }

    public String getStdName() {
        return stdName;
    }

    public void setStdName(String stdName) {
        this.stdName = stdName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhno() {
        return phno;
    }

    public void setPhno(String phno) {
        this.phno = phno;
    }
}

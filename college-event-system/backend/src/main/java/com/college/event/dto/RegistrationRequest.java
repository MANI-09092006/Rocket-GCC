package com.college.event.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegistrationRequest {

    @NotNull(message = "Event ID is required")
    private Long eId;

    @NotBlank(message = "Student name is required")
    @Size(max = 50, message = "Student name cannot exceed 50 characters")
    private String stdName;

    @NotBlank(message = "Department is required")
    @Size(max = 50, message = "Department cannot exceed 50 characters")
    private String department;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(max = 50, message = "Password cannot exceed 50 characters")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String phno;

    public Long getEId() {
        return eId;
    }

    public void setEId(Long eId) {
        this.eId = eId;
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

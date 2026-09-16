package com.college.event.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "E_id")
    private Long eId;

    @NotBlank(message = "Event name is required")
    @Size(max = 100, message = "Event name cannot exceed 100 characters")
    @Column(name = "E_name", nullable = false, length = 100)
    private String eName;

    @NotNull(message = "Event date is required")
    @Column(name = "E_date", nullable = false)
    private LocalDate eDate;

    @NotBlank(message = "Organizer name is required")
    @Size(max = 50, message = "Organizer name cannot exceed 50 characters")
    @Column(name = "organizer_name", nullable = false, length = 50)
    private String organizerName;

    @NotNull(message = "Maximum capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Column(name = "max_capacity", nullable = false)
    private Integer maxCapacity;

    @NotBlank(message = "Event status is required")
    @Size(max = 20, message = "Status cannot exceed 20 characters")
    @Column(name = "E_status", nullable = false, length = 20)
    private String eStatus = "OPEN"; // OPEN or CLOSED

    public Event() {
    }

    public Event(String eName, LocalDate eDate, String organizerName, Integer maxCapacity, String eStatus) {
        this.eName = eName;
        this.eDate = eDate;
        this.organizerName = organizerName;
        this.maxCapacity = maxCapacity;
        this.eStatus = eStatus != null ? eStatus : "OPEN";
    }

    public Long getEId() {
        return eId;
    }

    public void setEId(Long eId) {
        this.eId = eId;
    }

    public String getEName() {
        return eName;
    }

    public void setEName(String eName) {
        this.eName = eName;
    }

    public LocalDate getEDate() {
        return eDate;
    }

    public void setEDate(LocalDate eDate) {
        this.eDate = eDate;
    }

    public String getOrganizerName() {
        return organizerName;
    }

    public void setOrganizerName(String organizerName) {
        this.organizerName = organizerName;
    }

    public Integer getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public String getEStatus() {
        return eStatus;
    }

    public void setEStatus(String eStatus) {
        this.eStatus = eStatus;
    }
}

package com.college.event.dto;

import java.time.LocalDate;
import java.util.List;

public class EventSummaryDto {
    private Long eId;
    private String eName;
    private LocalDate eDate;
    private String organizerName;
    private Integer maxCapacity;
    private Long registeredCount;
    private Integer availableCapacity;
    private Long checkInCount;
    private Double attendancePercentage;
    private String eStatus;
    private List<PassDetailsDto> attendees;

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

    public Long getRegisteredCount() {
        return registeredCount;
    }

    public void setRegisteredCount(Long registeredCount) {
        this.registeredCount = registeredCount;
    }

    public Integer getAvailableCapacity() {
        return availableCapacity;
    }

    public void setAvailableCapacity(Integer availableCapacity) {
        this.availableCapacity = availableCapacity;
    }

    public Long getCheckInCount() {
        return checkInCount;
    }

    public void setCheckInCount(Long checkInCount) {
        this.checkInCount = checkInCount;
    }

    public Double getAttendancePercentage() {
        return attendancePercentage;
    }

    public void setAttendancePercentage(Double attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }

    public String getEStatus() {
        return eStatus;
    }

    public void setEStatus(String eStatus) {
        this.eStatus = eStatus;
    }

    public List<PassDetailsDto> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<PassDetailsDto> attendees) {
        this.attendees = attendees;
    }
}

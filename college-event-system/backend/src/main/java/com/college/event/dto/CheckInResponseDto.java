package com.college.event.dto;

import java.time.LocalDateTime;

public class CheckInResponseDto {
    private Long aId;
    private LocalDateTime checkInDate;
    private String message;
    private PassDetailsDto passDetails;

    public Long getAId() {
        return aId;
    }

    public void setAId(Long aId) {
        this.aId = aId;
    }

    public LocalDateTime getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDateTime checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public PassDetailsDto getPassDetails() {
        return passDetails;
    }

    public void setPassDetails(PassDetailsDto passDetails) {
        this.passDetails = passDetails;
    }
}
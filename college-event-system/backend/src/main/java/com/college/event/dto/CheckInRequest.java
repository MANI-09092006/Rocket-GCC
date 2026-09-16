package com.college.event.dto;

import jakarta.validation.constraints.NotBlank;

public class CheckInRequest {

    @NotBlank(message = "Pass identifier (ID or Pass Code) is required")
    private String passIdentifier;

    private Long eId;

    public String getPassIdentifier() {
        return passIdentifier;
    }

    public void setPassIdentifier(String passIdentifier) {
        this.passIdentifier = passIdentifier;
    }

    public Long getEId() {
        return eId;
    }

    public void setEId(Long eId) {
        this.eId = eId;
    }
}

package com.college.event.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PassDetailsDto {
    private Long pId;
    private String passCode;
    private LocalDateTime bookingDate;
    private String status;

    private Long eId;
    private String eName;
    private LocalDate eDate;
    private String organizerName;

    private Long stdId;
    private String stdName;
    private String department;
    private String email;
    private String phno;

    private boolean checkedIn;
    private LocalDateTime checkInDate;

    public Long getPId() {
        return pId;
    }

    public void setPId(Long pId) {
        this.pId = pId;
    }

    public String getPassCode() {
        return passCode;
    }

    public void setPassCode(String passCode) {
        this.passCode = passCode;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public String getPhno() {
        return phno;
    }

    public void setPhno(String phno) {
        this.phno = phno;
    }

    public boolean isCheckedIn() {
        return checkedIn;
    }

    public void setCheckedIn(boolean checkedIn) {
        this.checkedIn = checkedIn;
    }

    public LocalDateTime getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDateTime checkInDate) {
        this.checkInDate = checkInDate;
    }
}

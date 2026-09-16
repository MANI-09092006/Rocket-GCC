package com.college.event.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "book_pass")
public class BookPass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "P_id")
    private Long pId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "E_id", nullable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "std_id", nullable = false)
    private Student student;

    @Column(name = "pass_code", length = 30)
    private String passCode;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @Column(name = "status", length = 20)
    private String status = "ACTIVE"; // ACTIVE, CANCELLED

    public BookPass() {
        this.bookingDate = LocalDateTime.now();
    }

    public BookPass(Event event, Student student) {
        this.event = event;
        this.student = student;
        this.bookingDate = LocalDateTime.now();
        this.status = "ACTIVE";
    }

    public Long getPId() {
        return pId;
    }

    public void setPId(Long pId) {
        this.pId = pId;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
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
}

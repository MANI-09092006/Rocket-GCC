package com.college.event.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "A_id")
    private Long aId;

    @Column(name = "check_in_date", nullable = false)
    private LocalDateTime checkInDate;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "E_id", nullable = false)
    private Event event;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "P_id", nullable = false, unique = true)
    private BookPass bookPass;

    public Attendance() {
        this.checkInDate = LocalDateTime.now();
    }

    public Attendance(Event event, BookPass bookPass) {
        this.event = event;
        this.bookPass = bookPass;
        this.checkInDate = LocalDateTime.now();
    }

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

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public BookPass getBookPass() {
        return bookPass;
    }

    public void setBookPass(BookPass bookPass) {
        this.bookPass = bookPass;
    }
}

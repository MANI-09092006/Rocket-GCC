package com.college.event.repository;

import com.college.event.entity.Attendance;
import com.college.event.entity.BookPass;
import com.college.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    long countByEvent(Event event);
    boolean existsByBookPass(BookPass bookPass);
    Optional<Attendance> findByBookPass(BookPass bookPass);
    List<Attendance> findByEvent(Event event);
}

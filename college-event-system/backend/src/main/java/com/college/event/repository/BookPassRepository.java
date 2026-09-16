package com.college.event.repository;

import com.college.event.entity.BookPass;
import com.college.event.entity.Event;
import com.college.event.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookPassRepository extends JpaRepository<BookPass, Long> {

    long countByEventAndStatus(Event event, String status);

    boolean existsByEventAndStudentAndStatus(Event event, Student student, String status);

    @Query("SELECT COUNT(b) > 0 FROM BookPass b WHERE b.student = :student AND b.status = 'ACTIVE' AND b.event.eDate = :date")
    boolean existsByStudentAndDate(@Param("student") Student student, @Param("date") LocalDate date);

    List<BookPass> findByEventAndStatus(Event event, String status);

    List<BookPass> findByStudentAndStatus(Student student, String status);

    Optional<BookPass> findByPassCode(String passCode);

    Optional<BookPass> findByPIdAndStatus(Long pId, String status);
}

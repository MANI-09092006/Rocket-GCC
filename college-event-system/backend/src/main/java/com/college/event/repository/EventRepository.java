package com.college.event.repository;

import com.college.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e ORDER BY e.eDate ASC")
    List<Event> findAllOrdered();

    List<Event> findByEStatus(String eStatus);
}
package com.college.event.config;

import com.college.event.entity.Event;
import com.college.event.entity.Student;
import com.college.event.repository.EventRepository;
import com.college.event.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(EventRepository eventRepository, StudentRepository studentRepository) {
        return args -> {
            if (eventRepository.count() == 0) {
                eventRepository.save(new Event("National Hackathon 2026", LocalDate.now().plusDays(10), "Dr. Ramesh Kumar (CSE)", 50, "OPEN"));
                eventRepository.save(new Event("AI & Robotics Workshop", LocalDate.now().plusDays(15), "Prof. Priya Sharma (ECE)", 30, "OPEN"));
                eventRepository.save(new Event("Cyber Security Conclave", LocalDate.now().plusDays(20), "Dr. Arvind Swamy (IT)", 40, "OPEN"));
                eventRepository.save(new Event("Cloud & DevOps Bootcamp", LocalDate.now().plusDays(30), "Prof. Anita Rao (CSE)", 25, "OPEN"));
                System.out.println(">>> Sample college events initialized successfully.");
            }

            if (studentRepository.count() == 0) {
                studentRepository.save(new Student("Aarav Patel", "Computer Science", "aarav.patel@college.edu", "pass123", "9876543210"));
                studentRepository.save(new Student("Sneha Reddy", "Information Tech", "sneha.reddy@college.edu", "pass123", "9876543211"));
                studentRepository.save(new Student("Rohan Verma", "Electronics", "rohan.verma@college.edu", "pass123", "9876543212"));
                System.out.println(">>> Sample students initialized successfully.");
            }
        };
    }
}

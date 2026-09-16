package com.college.event.service;

import com.college.event.dto.PassDetailsDto;
import com.college.event.dto.RegistrationRequest;
import com.college.event.entity.Attendance;
import com.college.event.entity.BookPass;
import com.college.event.entity.Event;
import com.college.event.entity.Student;
import com.college.event.exception.BusinessRuleException;
import com.college.event.exception.ResourceNotFoundException;
import com.college.event.repository.AttendanceRepository;
import com.college.event.repository.BookPassRepository;
import com.college.event.repository.EventRepository;
import com.college.event.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    private final EventRepository eventRepository;
    private final StudentRepository studentRepository;
    private final BookPassRepository bookPassRepository;
    private final AttendanceRepository attendanceRepository;
    private final EventService eventService;

    public RegistrationService(EventRepository eventRepository,
                               StudentRepository studentRepository,
                               BookPassRepository bookPassRepository,
                               AttendanceRepository attendanceRepository,
                               EventService eventService) {
        this.eventRepository = eventRepository;
        this.studentRepository = studentRepository;
        this.bookPassRepository = bookPassRepository;
        this.attendanceRepository = attendanceRepository;
        this.eventService = eventService;
    }

    @Transactional
    public PassDetailsDto registerStudent(RegistrationRequest request) {
        // 1. Fetch Event
        Event event = eventRepository.findById(request.getEId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + request.getEId()));

        // 2. Check Event Status
        if ("CLOSED".equalsIgnoreCase(event.getEStatus())) {
            throw new BusinessRuleException("Registration is closed for event: " + event.getEName());
        }

        // 3. Check Event Capacity
        long activePassCount = bookPassRepository.countByEventAndStatus(event, "ACTIVE");
        if (activePassCount >= event.getMaxCapacity()) {
            throw new BusinessRuleException("Event has reached its maximum capacity (" + event.getMaxCapacity() + "). Registration is blocked.");
        }

        // 4. Find or Create Student
        Student student = studentRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .map(existing -> {
                    // Update details if provided
                    existing.setStdName(request.getStdName().trim());
                    existing.setDepartment(request.getDepartment().trim());
                    existing.setPhno(request.getPhno().trim());
                    if (request.getPassword() != null && !request.getPassword().isBlank()) {
                        existing.setPassword(request.getPassword().trim());
                    }
                    return studentRepository.save(existing);
                })
                .orElseGet(() -> {
                    Student newStudent = new Student();
                    newStudent.setStdName(request.getStdName().trim());
                    newStudent.setDepartment(request.getDepartment().trim());
                    newStudent.setEmail(request.getEmail().trim().toLowerCase());
                    newStudent.setPassword(request.getPassword().trim());
                    newStudent.setPhno(request.getPhno().trim());
                    return studentRepository.save(newStudent);
                });

        // 5. Prevent Duplicate Registration for the Same Event
        boolean alreadyRegisteredSameEvent = bookPassRepository.existsByEventAndStudentAndStatus(event, student, "ACTIVE");
        if (alreadyRegisteredSameEvent) {
            throw new BusinessRuleException("Student (" + student.getEmail() + ") is already registered for this event (" + event.getEName() + "). Duplicate registrations are not allowed.");
        }

        // 6. Prevent Duplicate Registration on the Same Date
        boolean alreadyRegisteredSameDate = bookPassRepository.existsByStudentAndDate(student, event.getEDate());
        if (alreadyRegisteredSameDate) {
            throw new BusinessRuleException("Student (" + student.getEmail() + ") is already registered for another event on " + event.getEDate() + ". Duplicate registrations on the same date are not allowed.");
        }

        // 7. Create BookPass Record
        BookPass pass = new BookPass();
        pass.setEvent(event);
        pass.setStudent(student);
        pass.setBookingDate(LocalDateTime.now());
        pass.setStatus("ACTIVE");

        // Temporary save to generate P_id
        BookPass savedPass = bookPassRepository.save(pass);
        String passCode = String.format("PASS-E%d-P%04d-%s",
                event.getEId(),
                savedPass.getPId(),
                UUID.randomUUID().toString().substring(0, 4).toUpperCase());
        savedPass.setPassCode(passCode);
        savedPass = bookPassRepository.save(savedPass);

        return eventService.toPassDetailsDto(savedPass, null);
    }

    @Transactional
    public void cancelRegistration(Long passId) {
        BookPass pass = bookPassRepository.findById(passId)
                .orElseThrow(() -> new ResourceNotFoundException("Pass not found with ID: " + passId));

        if ("CANCELLED".equalsIgnoreCase(pass.getStatus())) {
            throw new BusinessRuleException("This pass has already been cancelled.");
        }

        // Disallow cancellation after event check-in
        if (attendanceRepository.existsByBookPass(pass)) {
            throw new BusinessRuleException("Cannot cancel registration after event check-in has already been completed.");
        }

        // Allow cancellation before the event
        LocalDate today = LocalDate.now();
        if (pass.getEvent().getEDate().isBefore(today)) {
            throw new BusinessRuleException("Cannot cancel registration for an event that has already concluded.");
        }

        // Invalidate pass and release capacity
        pass.setStatus("CANCELLED");
        bookPassRepository.save(pass);
    }

    public PassDetailsDto getPassDetails(Long passId) {
        BookPass pass = bookPassRepository.findById(passId)
                .orElseThrow(() -> new ResourceNotFoundException("Pass not found with ID: " + passId));
        Optional<Attendance> attendance = attendanceRepository.findByBookPass(pass);
        return eventService.toPassDetailsDto(pass, attendance.orElse(null));
    }

    public PassDetailsDto getPassByCode(String passCode) {
        BookPass pass = bookPassRepository.findByPassCode(passCode.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Pass not found with code: " + passCode));
        Optional<Attendance> attendance = attendanceRepository.findByBookPass(pass);
        return eventService.toPassDetailsDto(pass, attendance.orElse(null));
    }

    public List<PassDetailsDto> getPassesByStudentEmail(String email) {
        Student student = studentRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("No student found with email: " + email));
        List<BookPass> passes = bookPassRepository.findByStudentAndStatus(student, "ACTIVE");
        return passes.stream().map(p -> {
            Optional<Attendance> att = attendanceRepository.findByBookPass(p);
            return eventService.toPassDetailsDto(p, att.orElse(null));
        }).collect(Collectors.toList());
    }
}

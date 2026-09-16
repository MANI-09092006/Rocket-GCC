package com.college.event.service;

import com.college.event.dto.CheckInRequest;
import com.college.event.dto.CheckInResponseDto;
import com.college.event.dto.PassDetailsDto;
import com.college.event.entity.Attendance;
import com.college.event.entity.BookPass;
import com.college.event.exception.BusinessRuleException;
import com.college.event.exception.ResourceNotFoundException;
import com.college.event.repository.AttendanceRepository;
import com.college.event.repository.BookPassRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AttendanceService {

    private final BookPassRepository bookPassRepository;
    private final AttendanceRepository attendanceRepository;
    private final EventService eventService;

    public AttendanceService(BookPassRepository bookPassRepository,
                             AttendanceRepository attendanceRepository,
                             EventService eventService) {
        this.bookPassRepository = bookPassRepository;
        this.attendanceRepository = attendanceRepository;
        this.eventService = eventService;
    }

    @Transactional
    public CheckInResponseDto checkIn(CheckInRequest request) {
        String identifier = request.getPassIdentifier().trim();

        BookPass pass = null;

        // Try lookup by numeric P_id first
        try {
            Long pId = Long.parseLong(identifier);
            pass = bookPassRepository.findById(pId).orElse(null);
        } catch (NumberFormatException ignored) {
        }

        // If not found by ID, lookup by Pass Code
        if (pass == null) {
            pass = bookPassRepository.findByPassCode(identifier).orElse(null);
        }

        if (pass == null) {
            throw new ResourceNotFoundException("No valid pass found matching: " + identifier);
        }

        // Check if pass is cancelled
        if ("CANCELLED".equalsIgnoreCase(pass.getStatus())) {
            throw new BusinessRuleException("This pass has been cancelled and cannot be used for check-in.");
        }

        // Verify event ID matches if provided
        if (request.getEId() != null && !pass.getEvent().getEId().equals(request.getEId())) {
            throw new BusinessRuleException("This pass belongs to event '" 
                    + pass.getEvent().getEName() + "' (ID: " + pass.getEvent().getEId() 
                    + "), not the current event.");
        }

        // Check duplicate check-in
        if (attendanceRepository.existsByBookPass(pass)) {
            Attendance existing = attendanceRepository.findByBookPass(pass).orElse(null);
            throw new BusinessRuleException("Student has already checked in with this pass on " 
                    + (existing != null ? existing.getCheckInDate() : "earlier today") 
                    + ". Check-in is allowed only once.");
        }

        // Record Attendance
        Attendance attendance = new Attendance();
        attendance.setEvent(pass.getEvent());
        attendance.setBookPass(pass);
        attendance.setCheckInDate(LocalDateTime.now());
        Attendance saved = attendanceRepository.save(attendance);

        PassDetailsDto passDto = eventService.toPassDetailsDto(pass, saved);

        CheckInResponseDto response = new CheckInResponseDto();
        response.setAId(saved.getAId());
        response.setCheckInDate(saved.getCheckInDate());
        response.setMessage("Check-in successful! Welcome, " + pass.getStudent().getStdName());
        response.setPassDetails(passDto);

        return response;
    }
}

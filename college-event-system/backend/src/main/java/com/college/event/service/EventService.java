package com.college.event.service;

import com.college.event.dto.EventResponseDto;
import com.college.event.dto.EventSummaryDto;
import com.college.event.dto.PassDetailsDto;
import com.college.event.entity.Attendance;
import com.college.event.entity.BookPass;
import com.college.event.entity.Event;
import com.college.event.exception.BusinessRuleException;
import com.college.event.exception.ResourceNotFoundException;
import com.college.event.repository.AttendanceRepository;
import com.college.event.repository.BookPassRepository;
import com.college.event.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final BookPassRepository bookPassRepository;
    private final AttendanceRepository attendanceRepository;

    public EventService(EventRepository eventRepository,
                        BookPassRepository bookPassRepository,
                        AttendanceRepository attendanceRepository) {
        this.eventRepository = eventRepository;
        this.bookPassRepository = bookPassRepository;
        this.attendanceRepository = attendanceRepository;
    }

    @Transactional
    public Event createEvent(Event event) {
        if (event.getMaxCapacity() == null || event.getMaxCapacity() <= 0) {
            throw new BusinessRuleException("Event max capacity must be at least 1");
        }
        if (event.getEStatus() == null || event.getEStatus().isBlank()) {
            event.setEStatus("OPEN");
        }
        return eventRepository.save(event);
    }

    public List<EventResponseDto> getAllEvents() {
        return eventRepository.findAllOrdered().stream()
                .map(this::toEventResponseDto)
                .collect(Collectors.toList());
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + id));
    }

    public EventResponseDto getEventDtoById(Long id) {
        Event event = getEventById(id);
        return toEventResponseDto(event);
    }

    @Transactional
    public Event updateEventStatus(Long id, String status) {
        Event event = getEventById(id);
        event.setEStatus(status.toUpperCase());
        return eventRepository.save(event);
    }

    public EventSummaryDto getEventSummary(Long id) {
        Event event = getEventById(id);
        long registeredCount = bookPassRepository.countByEventAndStatus(event, "ACTIVE");
        long checkInCount = attendanceRepository.countByEvent(event);
        int availableCapacity = Math.max(0, event.getMaxCapacity() - (int) registeredCount);

        double attendancePercentage = registeredCount > 0 
                ? Math.round(((double) checkInCount / registeredCount) * 1000.0) / 10.0 
                : 0.0;

        List<BookPass> passes = bookPassRepository.findByEventAndStatus(event, "ACTIVE");
        List<PassDetailsDto> attendees = new ArrayList<>();
        for (BookPass pass : passes) {
            Optional<Attendance> attOpt = attendanceRepository.findByBookPass(pass);
            PassDetailsDto dto = toPassDetailsDto(pass, attOpt.orElse(null));
            attendees.add(dto);
        }

        EventSummaryDto summary = new EventSummaryDto();
        summary.setEId(event.getEId());
        summary.setEName(event.getEName());
        summary.setEDate(event.getEDate());
        summary.setOrganizerName(event.getOrganizerName());
        summary.setMaxCapacity(event.getMaxCapacity());
        summary.setRegisteredCount(registeredCount);
        summary.setAvailableCapacity(availableCapacity);
        summary.setCheckInCount(checkInCount);
        summary.setAttendancePercentage(attendancePercentage);
        summary.setEStatus(event.getEStatus());
        summary.setAttendees(attendees);
        return summary;
    }

    public EventResponseDto toEventResponseDto(Event event) {
        long registeredCount = bookPassRepository.countByEventAndStatus(event, "ACTIVE");
        long checkInCount = attendanceRepository.countByEvent(event);
        int available = Math.max(0, event.getMaxCapacity() - (int) registeredCount);

        EventResponseDto dto = new EventResponseDto();
        dto.setEId(event.getEId());
        dto.setEName(event.getEName());
        dto.setEDate(event.getEDate());
        dto.setOrganizerName(event.getOrganizerName());
        dto.setMaxCapacity(event.getMaxCapacity());
        dto.setEStatus(event.getEStatus());
        dto.setRegisteredCount(registeredCount);
        dto.setAvailableCapacity(available);
        dto.setCheckInCount(checkInCount);
        return dto;
    }

    public PassDetailsDto toPassDetailsDto(BookPass pass, Attendance attendance) {
        PassDetailsDto dto = new PassDetailsDto();
        dto.setPId(pass.getPId());
        dto.setPassCode(pass.getPassCode());
        dto.setBookingDate(pass.getBookingDate());
        dto.setStatus(pass.getStatus());

        if (pass.getEvent() != null) {
            dto.setEId(pass.getEvent().getEId());
            dto.setEName(pass.getEvent().getEName());
            dto.setEDate(pass.getEvent().getEDate());
            dto.setOrganizerName(pass.getEvent().getOrganizerName());
        }

        if (pass.getStudent() != null) {
            dto.setStdId(pass.getStudent().getStdId());
            dto.setStdName(pass.getStudent().getStdName());
            dto.setDepartment(pass.getStudent().getDepartment());
            dto.setEmail(pass.getStudent().getEmail());
            dto.setPhno(pass.getStudent().getPhno());
        }

        if (attendance != null) {
            dto.setCheckedIn(true);
            dto.setCheckInDate(attendance.getCheckInDate());
        } else {
            dto.setCheckedIn(false);
        }
        return dto;
    }
}

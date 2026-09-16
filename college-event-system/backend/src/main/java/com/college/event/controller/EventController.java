package com.college.event.controller;

import com.college.event.dto.EventResponseDto;
import com.college.event.dto.EventSummaryDto;
import com.college.event.entity.Event;
import com.college.event.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
        Event created = eventService.createEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<EventResponseDto>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventDtoById(id));
    }

    @GetMapping("/{id}/summary")
    public ResponseEntity<EventSummaryDto> getEventSummary(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventSummary(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Event> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "OPEN");
        return ResponseEntity.ok(eventService.updateEventStatus(id, status));
    }
}

package com.college.event.controller;

import com.college.event.dto.CheckInRequest;
import com.college.event.dto.CheckInResponseDto;
import com.college.event.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/check-in")
    public ResponseEntity<CheckInResponseDto> checkIn(@Valid @RequestBody CheckInRequest request) {
        CheckInResponseDto response = attendanceService.checkIn(request);
        return ResponseEntity.ok(response);
    }
}

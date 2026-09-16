package com.college.event.controller;

import com.college.event.dto.PassDetailsDto;
import com.college.event.dto.RegistrationRequest;
import com.college.event.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<PassDetailsDto> registerStudent(@Valid @RequestBody RegistrationRequest request) {
        PassDetailsDto pass = registrationService.registerStudent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pass);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PassDetailsDto> getPassById(@PathVariable Long id) {
        return ResponseEntity.ok(registrationService.getPassDetails(id));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<PassDetailsDto> getPassByCode(@PathVariable String code) {
        return ResponseEntity.ok(registrationService.getPassByCode(code));
    }

    @GetMapping("/student")
    public ResponseEntity<List<PassDetailsDto>> getStudentPasses(@RequestParam String email) {
        return ResponseEntity.ok(registrationService.getPassesByStudentEmail(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> cancelRegistration(@PathVariable Long id) {
        registrationService.cancelRegistration(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Registration cancelled successfully. Event capacity has been restored.");
        response.put("cancelledPassId", id);
        return ResponseEntity.ok(response);
    }
}

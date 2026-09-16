package com.college.event;

import com.college.event.dto.CheckInRequest;
import com.college.event.dto.CheckInResponseDto;
import com.college.event.dto.EventSummaryDto;
import com.college.event.dto.PassDetailsDto;
import com.college.event.dto.RegistrationRequest;
import com.college.event.entity.Event;
import com.college.event.exception.BusinessRuleException;
import com.college.event.repository.AttendanceRepository;
import com.college.event.repository.BookPassRepository;
import com.college.event.repository.EventRepository;
import com.college.event.repository.StudentRepository;
import com.college.event.service.AttendanceService;
import com.college.event.service.EventService;
import com.college.event.service.RegistrationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class EventManagementApplicationTests {

    @Autowired
    private EventService eventService;

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BookPassRepository bookPassRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @BeforeEach
    void setUp() {
        attendanceRepository.deleteAll();
        bookPassRepository.deleteAll();
        eventRepository.deleteAll();
        studentRepository.deleteAll();
    }

    @Test
    @DisplayName("Use Case 1: Create event with capacity and open status")
    void testCreateEvent() {
        Event event = new Event("TechFest 2026", LocalDate.now().plusDays(5), "CSE Dept", 2, "OPEN");
        Event created = eventService.createEvent(event);

        assertNotNull(created.getEId());
        assertEquals("TechFest 2026", created.getEName());
        assertEquals(2, created.getMaxCapacity());
        assertEquals("OPEN", created.getEStatus());
    }

    @Test
    @DisplayName("Use Case 2: Register student, generate pass, and verify capacity decreases by 1")
    void testRegisterAndCapacityReduction() {
        Event event = eventService.createEvent(new Event("Hackathon", LocalDate.now().plusDays(5), "IT Club", 2, "OPEN"));

        RegistrationRequest req = new RegistrationRequest();
        req.setEId(event.getEId());
        req.setStdName("Alice");
        req.setDepartment("Computer Science");
        req.setEmail("alice@college.edu");
        req.setPassword("pass123");
        req.setPhno("9876543210");

        PassDetailsDto pass = registrationService.registerStudent(req);

        assertNotNull(pass.getPId());
        assertNotNull(pass.getPassCode());
        assertEquals("ACTIVE", pass.getStatus());
        assertEquals("Hackathon", pass.getEName());
        assertEquals("Alice", pass.getStdName());

        // Capacity check
        EventSummaryDto summary = eventService.getEventSummary(event.getEId());
        assertEquals(1, summary.getRegisteredCount());
        assertEquals(1, summary.getAvailableCapacity()); // 2 - 1 = 1
    }

    @Test
    @DisplayName("Use Case 2b: Prevent duplicate registration for the same event")
    void testPreventDuplicateRegistrationSameEvent() {
        Event event = eventService.createEvent(new Event("Hackathon", LocalDate.now().plusDays(5), "IT Club", 5, "OPEN"));

        RegistrationRequest req1 = new RegistrationRequest();
        req1.setEId(event.getEId());
        req1.setStdName("Bob");
        req1.setDepartment("ECE");
        req1.setEmail("bob@college.edu");
        req1.setPassword("pass123");
        req1.setPhno("9876543211");
        registrationService.registerStudent(req1);

        // Attempt second registration for Bob on the same event
        BusinessRuleException ex = assertThrows(BusinessRuleException.class, () -> {
            registrationService.registerStudent(req1);
        });
        assertTrue(ex.getMessage().contains("already registered for this event"));
    }

    @Test
    @DisplayName("Use Case 2c: Prevent duplicate registration on the same date")
    void testPreventDuplicateRegistrationSameDate() {
        LocalDate eventDate = LocalDate.now().plusDays(7);
        Event event1 = eventService.createEvent(new Event("Event Alpha", eventDate, "Dept A", 10, "OPEN"));
        Event event2 = eventService.createEvent(new Event("Event Beta", eventDate, "Dept B", 10, "OPEN"));

        RegistrationRequest req1 = new RegistrationRequest();
        req1.setEId(event1.getEId());
        req1.setStdName("Charlie");
        req1.setDepartment("Mechanical");
        req1.setEmail("charlie@college.edu");
        req1.setPassword("pass123");
        req1.setPhno("9876543212");
        registrationService.registerStudent(req1);

        // Attempt registration for Charlie on event2 (scheduled on the same date)
        RegistrationRequest req2 = new RegistrationRequest();
        req2.setEId(event2.getEId());
        req2.setStdName("Charlie");
        req2.setDepartment("Mechanical");
        req2.setEmail("charlie@college.edu");
        req2.setPassword("pass123");
        req2.setPhno("9876543212");

        BusinessRuleException ex = assertThrows(BusinessRuleException.class, () -> {
            registrationService.registerStudent(req2);
        });
        assertTrue(ex.getMessage().contains("same date"));
    }

    @Test
    @DisplayName("Use Case 2d: Block registration when maximum capacity is reached")
    void testMaxCapacityBlocking() {
        Event event = eventService.createEvent(new Event("Small Workshop", LocalDate.now().plusDays(10), "Math Dept", 1, "OPEN"));

        RegistrationRequest req1 = new RegistrationRequest();
        req1.setEId(event.getEId());
        req1.setStdName("User 1");
        req1.setDepartment("CSE");
        req1.setEmail("user1@college.edu");
        req1.setPassword("pass123");
        req1.setPhno("9876543213");
        registrationService.registerStudent(req1);

        // Attempt registration when capacity (1) is already filled
        RegistrationRequest req2 = new RegistrationRequest();
        req2.setEId(event.getEId());
        req2.setStdName("User 2");
        req2.setDepartment("IT");
        req2.setEmail("user2@college.edu");
        req2.setPassword("pass123");
        req2.setPhno("9876543214");

        BusinessRuleException ex = assertThrows(BusinessRuleException.class, () -> {
            registrationService.registerStudent(req2);
        });
        assertTrue(ex.getMessage().contains("maximum capacity"));
    }

    @Test
    @DisplayName("Use Case 3: Cancel registration and verify capacity increases by 1")
    void testCancelRegistrationRestoresCapacity() {
        Event event = eventService.createEvent(new Event("Robotics", LocalDate.now().plusDays(8), "Robo Club", 2, "OPEN"));

        RegistrationRequest req = new RegistrationRequest();
        req.setEId(event.getEId());
        req.setStdName("Dave");
        req.setDepartment("ECE");
        req.setEmail("dave@college.edu");
        req.setPassword("pass123");
        req.setPhno("9876543215");

        PassDetailsDto pass = registrationService.registerStudent(req);

        // Verify available capacity = 1
        assertEquals(1, eventService.getEventSummary(event.getEId()).getAvailableCapacity());

        // Cancel registration
        registrationService.cancelRegistration(pass.getPId());

        // Verify available capacity restores to 2
        EventSummaryDto summaryAfterCancel = eventService.getEventSummary(event.getEId());
        assertEquals(0, summaryAfterCancel.getRegisteredCount());
        assertEquals(2, summaryAfterCancel.getAvailableCapacity());
    }

    @Test
    @DisplayName("Use Case 4: Check-in on event day and disallow duplicate check-in")
    void testCheckInAndSingleCheckInEnforcement() {
        Event event = eventService.createEvent(new Event("Seminar", LocalDate.now().plusDays(1), "Admin", 5, "OPEN"));

        RegistrationRequest req = new RegistrationRequest();
        req.setEId(event.getEId());
        req.setStdName("Eve");
        req.setDepartment("BioTech");
        req.setEmail("eve@college.edu");
        req.setPassword("pass123");
        req.setPhno("9876543216");
        PassDetailsDto pass = registrationService.registerStudent(req);

        // Perform check-in
        CheckInRequest checkInReq = new CheckInRequest();
        checkInReq.setPassIdentifier(pass.getPId().toString());
        checkInReq.setEId(event.getEId());

        CheckInResponseDto checkInRes = attendanceService.checkIn(checkInReq);
        assertNotNull(checkInRes.getAId());
        assertTrue(checkInRes.getMessage().contains("Check-in successful"));
        assertTrue(checkInRes.getPassDetails().isCheckedIn());

        // Attempt second check-in -> must be blocked
        BusinessRuleException ex = assertThrows(BusinessRuleException.class, () -> {
            attendanceService.checkIn(checkInReq);
        });
        assertTrue(ex.getMessage().contains("already checked in"));

        // Verify Event Summary displays correct Registered Count and Check-in Count
        EventSummaryDto summary = eventService.getEventSummary(event.getEId());
        assertEquals("Seminar", summary.getEName());
        assertEquals(5, summary.getMaxCapacity());
        assertEquals(1, summary.getRegisteredCount());
        assertEquals(1, summary.getCheckInCount());
        assertEquals(100.0, summary.getAttendancePercentage());
    }
}
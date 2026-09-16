# College Event Pass & Management System

A full-stack web application designed for managing college technical events, student registrations, digital pass generation, registration cancellation, event-day check-in, and organizer summary reporting.

This project is built strictly following the provided **ER Diagram** and functional use cases.

---

## Tech Stack
- **Frontend**: React (Vite, CSS Modules/Modern Styling, Lucide Icons)
- **Backend**: Java 17/21/25, Spring Boot 3.4 / 4.x, Spring Data JPA, Hibernate, Bean Validation
- **Database**: MySQL Server (`college_event_db`)
- **Build Tools**: Maven Wrapper (`mvnw.cmd` / `mvnw`), npm / Node.js

---

## Database Architecture (Strict ER Diagram Mapping)

The database schema strictly follows your ER diagram:

### 1. `student` Table
- `std_id` (INT, Primary Key, Auto Increment)
- `std_name` (VARCHAR(50), Student Full Name)
- `Department` (VARCHAR(50), Student Department)
- `Email` (VARCHAR(100), Student Email - Unique)
- `Password` (VARCHAR(50), Student Password)
- `Phno` (VARCHAR(15), Student Phone Number)

### 2. `event` Table
- `E_id` (INT, Primary Key, Auto Increment)
- `E_name` (VARCHAR(100), Event Title)
- `E_date` (DATE, Event Scheduled Date)
- `organizer_name` (VARCHAR(50), Lead Organizer Name & Dept)
- `max_capacity` (INT, Maximum Allowed Registrations)
- `E_status` (VARCHAR(20), Status: `OPEN` or `CLOSED`)

### 3. `book_pass` Table
- `P_id` (INT, Primary Key, Auto Increment)
- `E_id` (INT, Foreign Key referencing `event.E_id`)
- `std_id` (INT, Foreign Key referencing `student.std_id`)
- `pass_code` (VARCHAR(30), Unique Pass Identifier)
- `booking_date` (DATETIME, Registration Timestamp)
- `status` (VARCHAR(20), `ACTIVE` or `CANCELLED`)

### 4. `attendance` Table
- `A_id` (INT, Primary Key, Auto Increment)
- `check_in_date` (DATETIME, Attendance Timestamp)
- `E_id` (INT, Foreign Key referencing `event.E_id`)
- `P_id` (INT, Foreign Key referencing `book_pass.P_id`, Unique)

---

## Business Rules & Core Use Cases

1. **Create Event (Organizer)**:
   - Create events with Event Name, Event Date, Organizer Name, Max Capacity, and Status (`OPEN` / `CLOSED`).

2. **Student Registration & Pass Generation**:
   - Students enter details matching the ER diagram (`std_name`, `Department`, `Email`, `Password`, `Phno`).
   - **Capacity Management**: Available Capacity is dynamically computed:
     $$\text{Available Capacity} = \text{max\_capacity} - \text{COUNT(active Book\_pass records)}$$
     Registration is automatically blocked once maximum capacity is reached.
   - **Duplicate Prevention**: 
     - A student cannot register more than once for the same event.
     - A student cannot register for another event scheduled on the same date.
   - **Event Pass**: Generates a unique digital ticket with QR visual, student & event details, and print support.

3. **Registration Cancellation**:
   - Students can cancel registrations before the event using their Pass ID or Email.
   - The pass is invalidated and registration removed/cancelled.
   - The event's available capacity immediately increases by 1:
     $$\text{Available Capacity} = \text{Available Capacity} + 1$$
     making the seat instantly available for another student.

4. **Event Day Check-In**:
   - Only students with a valid active pass can check in.
   - Check-in is strictly permitted **only once** per pass.
   - Duplicate check-in attempts are rejected with clear notifications.

5. **Event Summary Dashboard**:
   - Displays real-time metrics for each event:
     - Event Name
     - Capacity (Max Capacity & Available Capacity)
     - Registered Count
     - Check-In Count
     - Attendance Turnout Percentage
     - Complete Attendee Roster with Check-In Timestamps.

---

## How to Run Locally

### Prerequisites
- Java 17 or higher (Java 21 / 25 supported)
- Node.js (v18+) & npm
- MySQL Server (running on localhost:3306)

---

### Step 1: Database Setup (MySQL)
1. Open MySQL Workbench or MySQL CLI:
   ```bash
   mysql -u root -p
   ```
2. Run the SQL schema and seed data located in `database/`:
   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p < database/sample_data.sql
   ```
   *(Or copy-paste the contents of `database/schema.sql` into MySQL Workbench and execute).*

3. Verify or update MySQL credentials in:
   `backend/src/main/resources/application.properties`
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_ROOT_PASSWORD
   ```

---

### Step 2: Start the Backend (Spring Boot)
Option A: Double-click `start-backend.bat`
Option B: From terminal:
```bash
cd backend
mvnw spring-boot:run
```
The backend will start at `http://localhost:8080`.
*Note: If you want to test without MySQL, run:*
```bash
mvnw spring-boot:run -Dspring-boot.run.profiles=test
```

---

### Step 3: Start the Frontend (React)
Option A: Double-click `start-frontend.bat`
Option B: From terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend will start at `http://localhost:5173`.

---

## API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/events` | List all events with live available capacity |
| `GET` | `/api/events/{id}` | Get event details by ID |
| `POST` | `/api/events` | Create new technical event (Organizer) |
| `GET` | `/api/events/{id}/summary` | Event summary (registered count, check-in count, capacity) |
| `PATCH` | `/api/events/{id}/status` | Toggle status (`OPEN` / `CLOSED`) |
| `POST` | `/api/registrations` | Register student for event & generate pass |
| `GET` | `/api/registrations/{id}` | View pass by Pass ID (`P_id`) |
| `GET` | `/api/registrations/student?email=...` | Find passes by student email |
| `DELETE` | `/api/registrations/{id}` | Cancel registration and restore capacity |
| `POST` | `/api/attendance/check-in` | Event day check-in (single check-in enforced) |

---

## Application Structure

```
college-event-system/
├── backend/                  # Java Spring Boot REST API
│   ├── mvnw / mvnw.cmd       # Maven Wrapper (zero install required)
│   ├── pom.xml               # Dependencies (Web, JPA, MySQL, Validation)
│   └── src/main/java/com/college/event/
│       ├── entity/           # Student, Event, BookPass, Attendance
│       ├── repository/       # JPA Repositories
│       ├── service/          # Business logic & capacity calculations
│       ├── controller/       # REST Controllers
│       ├── dto/              # Request & Response DTOs
│       └── config/           # CORS & Seed Data Initializer
├── frontend/                 # React (Vite) Application
│   ├── src/
│   │   ├── api/client.js     # REST API client
│   │   ├── components/       # Navbar, EventCard, PassTicket, EventSummaryModal
│   │   ├── pages/            # EventList, Details, Register, PassView, CheckIn, Organizer
│   │   ├── App.jsx           # Main App component
│   │   └── index.css         # Modern styles & print stylesheet
├── database/
│   ├── schema.sql            # Table definitions matching ER diagram
│   └── sample_data.sql       # Initial sample events & students
├── start-backend.bat         # 1-Click launcher for Backend
├── start-frontend.bat        # 1-Click launcher for Frontend
└── README.md
```
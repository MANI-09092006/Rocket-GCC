-- ==========================================================
-- College Event Management System - Database Schema (MySQL)
-- Derived directly from the ER Diagram
-- ==========================================================

CREATE DATABASE IF NOT EXISTS college_event_db;
USE college_event_db;

-- 1. Student Table
CREATE TABLE IF NOT EXISTS student (
    std_id INT AUTO_INCREMENT PRIMARY KEY,
    std_name VARCHAR(50) NOT NULL,
    Department VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL,
    Phno VARCHAR(15) NOT NULL
);

-- 2. Event Table
CREATE TABLE IF NOT EXISTS event (
    E_id INT AUTO_INCREMENT PRIMARY KEY,
    E_name VARCHAR(100) NOT NULL,
    E_date DATE NOT NULL,
    organizer_name VARCHAR(50) NOT NULL,
    max_capacity INT NOT NULL,
    E_status VARCHAR(20) NOT NULL DEFAULT 'OPEN'
);

-- 3. Book_pass Table
CREATE TABLE IF NOT EXISTS book_pass (
    P_id INT AUTO_INCREMENT PRIMARY KEY,
    E_id INT NOT NULL,
    std_id INT NOT NULL,
    pass_code VARCHAR(30),
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    CONSTRAINT fk_bookpass_event FOREIGN KEY (E_id) REFERENCES event (E_id) ON DELETE CASCADE,
    CONSTRAINT fk_bookpass_student FOREIGN KEY (std_id) REFERENCES student (std_id) ON DELETE CASCADE
);

-- 4. Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    A_id INT AUTO_INCREMENT PRIMARY KEY,
    check_in_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    E_id INT NOT NULL,
    P_id INT NOT NULL UNIQUE,
    CONSTRAINT fk_attendance_event FOREIGN KEY (E_id) REFERENCES event (E_id) ON DELETE CASCADE,
    CONSTRAINT fk_attendance_pass FOREIGN KEY (P_id) REFERENCES book_pass (P_id) ON DELETE CASCADE
);

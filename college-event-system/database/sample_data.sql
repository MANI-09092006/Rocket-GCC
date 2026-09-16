-- Sample seed data for College Event Management System
USE college_event_db;

INSERT INTO event (E_name, E_date, organizer_name, max_capacity, E_status) VALUES
('National Hackathon 2026', '2026-10-15', 'Dr. Ramesh Kumar (CSE)', 50, 'OPEN'),
('AI & Robotics Workshop', '2026-10-20', 'Prof. Priya Sharma (ECE)', 30, 'OPEN'),
('Cyber Security Conclave', '2026-10-25', 'Dr. Arvind Swamy (IT)', 40, 'OPEN'),
('Cloud & DevOps Bootcamp', '2026-11-05', 'Prof. Anita Rao (CSE)', 25, 'OPEN');

INSERT INTO student (std_name, Department, Email, Password, Phno) VALUES
('Aarav Patel', 'Computer Science', 'aarav.patel@college.edu', 'pass123', '9876543210'),
('Sneha Reddy', 'Information Tech', 'sneha.reddy@college.edu', 'pass123', '9876543211'),
('Rohan Verma', 'Electronics', 'rohan.verma@college.edu', 'pass123', '9876543212');

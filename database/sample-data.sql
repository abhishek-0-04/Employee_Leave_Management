USE employee_leave_db;

INSERT INTO departments (name)
SELECT 'Engineering' WHERE NOT EXISTS (SELECT 1 FROM departments WHERE name = 'Engineering');
INSERT INTO departments (name)
SELECT 'Human Resources' WHERE NOT EXISTS (SELECT 1 FROM departments WHERE name = 'Human Resources');
INSERT INTO departments (name)
SELECT 'Finance' WHERE NOT EXISTS (SELECT 1 FROM departments WHERE name = 'Finance');
INSERT INTO departments (name)
SELECT 'Sales' WHERE NOT EXISTS (SELECT 1 FROM departments WHERE name = 'Sales');

-- Demo passwords are SHA-256 hashed by the backend PasswordService.
-- Admin@123 -> e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7
-- Employee@123 -> b4bd29480ab196faa782e0d4ecd10c2f4212814105227e5f7992f5bf4b212a64

INSERT INTO employees (name, email, password, department_id, role)
SELECT 'System Admin', 'admin@example.com', 'e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7', d.id, 'ADMIN'
FROM departments d
WHERE d.name = 'Human Resources'
  AND NOT EXISTS (SELECT 1 FROM employees WHERE email = 'admin@example.com');

INSERT INTO employees (name, email, password, department_id, role)
SELECT 'Demo Employee', 'employee@example.com', 'b4bd29480ab196faa782e0d4ecd10c2f4212814105227e5f7992f5bf4b212a64', d.id, 'EMPLOYEE'
FROM departments d
WHERE d.name = 'Engineering'
  AND NOT EXISTS (SELECT 1 FROM employees WHERE email = 'employee@example.com');

INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status)
SELECT e.id, 'ANNUAL', '2026-08-17', '2026-08-18', 'Family function', 'PENDING'
FROM employees e
WHERE e.email = 'employee@example.com'
  AND NOT EXISTS (SELECT 1 FROM leave_requests WHERE employee_id = e.id AND start_date = '2026-08-17');

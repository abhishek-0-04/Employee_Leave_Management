# Employee Leave Management System

A complete beginner-friendly full-stack Employee Leave Management System built with **Spring Boot 3 + Java 21 + MySQL 8+** and **Angular 20 + TypeScript**.

It is intentionally a straightforward B.Tech portfolio/interview project: a single Spring Boot application, a single Angular application, and MySQL. No Docker, microservices, Kafka, Redis, or Kubernetes are required.

## 1. Features

### Employee
- Register as an employee
- Login/logout
- Employee dashboard with leave counts
- View profile
- Apply for CASUAL, SICK, ANNUAL, or OTHER leave
- View leave history and status
- Cancel pending leave requests

### Admin
- Login
- Admin dashboard
- View all employees
- Create, update, and delete employees
- View all leave requests
- Filter leave requests by status
- Approve/reject pending requests
- View employee leave history from the leave management table
- Create, update, and delete departments

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Backend | Java 21, Spring Boot 3.4.5, Maven |
| API | Spring Web REST |
| Persistence | Spring Data JPA / Hibernate |
| Validation | Jakarta Bean Validation |
| Database | MySQL 8+ |
| Frontend | Angular 20, TypeScript |
| Frontend forms | Angular Reactive Forms |
| Routing | Angular Router |
| HTTP | Angular HttpClient |

## 3. Folder Structure

```text
employee-leave-management-system/
├── backend/
│   ├── pom.xml
│   ├── .env.example
│   └── src/main/
│       ├── java/com/example/leavemanagement/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── exception/
│       │   ├── repository/
│       │   └── service/
│       └── resources/application.properties
├── database/
│   ├── schema.sql
│   └── sample-data.sql
├── frontend/
│   ├── package.json
│   ├── angular.json
│   └── src/app/
└── postman/
    └── Employee-Leave-Management.postman_collection.json
```

## 4. Prerequisites

Install:

- JDK 21 (JDK 17 also works with a small `pom.xml` version change)
- Maven 3.9+
- Node.js 20.19+ or 22+
- npm
- MySQL Server 8+
- Optional: MySQL Workbench
- Optional: Postman

Check versions:

```bash
java -version
mvn -version
node -v
npm -v
mysql --version
```

## 5. MySQL Setup

Start MySQL and create the database/tables by running:

```bash
mysql -u root -p < database/schema.sql
```

Then load the safe demo data:

```bash
mysql -u root -p < database/sample-data.sql
```

Alternatively, open both SQL files in MySQL Workbench and execute them.

The database is named:

```text
employee_leave_db
```

The backend uses `spring.jpa.hibernate.ddl-auto=update`, so Hibernate can also create/update mapped tables after the database itself exists. The supplied `schema.sql` is the explicit, repeatable database definition and is recommended for learning/testing.

## 6. Backend Database Configuration

Open:

```text
backend/src/main/resources/application.properties
```

Set your local MySQL password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_leave_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

No real credentials are stored in this project.

A matching safe example is also provided at:

```text
backend/.env.example
```

The Spring Boot application currently reads the values directly from `application.properties`; `.env.example` is documentation, not an automatic Spring environment loader.

## 7. Run the Backend

From the `backend` directory:

```bash
mvn clean package
mvn spring-boot:run
```

The API starts at:

```text
http://localhost:8080
```

If you use an IDE, run:

```text
com.example.leavemanagement.EmployeeLeaveManagementApplication
```

## 8. Run the Frontend

From the `frontend` directory:

```bash
npm install
npm start
```

The Angular development server starts at:

```text
http://localhost:4200
```

The frontend API base URL is defined in:

```text
frontend/src/app/core/api.ts
```

and defaults to:

```text
http://localhost:8080/api
```

Therefore the normal local flow is:

```text
Angular http://localhost:4200
        |
        | HTTP REST
        v
Spring Boot http://localhost:8080/api
        |
        | Spring Data JPA
        v
MySQL employee_leave_db
```

## 9. Demo Login Credentials

After running `database/sample-data.sql`:

### Admin

```text
Email:    admin@example.com
Password: Admin@123
Role:     ADMIN
```

### Employee

```text
Email:    employee@example.com
Password: Employee@123
Role:     EMPLOYEE
```

The demo password values are stored as SHA-256 hashes by the sample database and verified by the backend `PasswordService`. This keeps the project dependency-light and easy to understand. **For a production application, use Spring Security with a slow password-hashing algorithm such as BCrypt or Argon2 and enforce authorization server-side.**

## 10. Authentication Behavior

`POST /api/auth/login` returns:

```json
{
  "id": 2,
  "name": "Demo Employee",
  "email": "employee@example.com",
  "departmentId": 1,
  "departmentName": "Engineering",
  "role": "EMPLOYEE"
}
```

The Angular application stores this response in browser `localStorage` for this simple portfolio project. Angular route guards then direct employees and admins to their appropriate pages.

This project intentionally does not implement JWT/session authentication. Backend role authorization should be added with Spring Security before deploying to a real organization.

## 11. REST API Endpoints

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Employee registration |

### Employee

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/employees` | Create employee |
| GET | `/api/employees` | List employees |
| GET | `/api/employees/{id}` | Get employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

### Leave

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/leaves` | Apply for leave |
| GET | `/api/leaves` | List all leave requests |
| GET | `/api/leaves/{id}` | Get one leave request |
| GET | `/api/leaves/employee/{employeeId}` | Employee leave history |
| PUT | `/api/leaves/{id}` | Update pending request |
| DELETE | `/api/leaves/{id}` | Cancel pending request |
| PUT | `/api/leaves/{id}/approve` | Approve pending request |
| PUT | `/api/leaves/{id}/reject` | Reject pending request |

### Departments

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/departments` | Create department |
| GET | `/api/departments` | List departments |
| PUT | `/api/departments/{id}` | Update department |
| DELETE | `/api/departments/{id}` | Delete department |

### Dashboard

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/dashboard/admin` | Admin statistics |

## 12. Validation and Business Rules

- Employee name is required.
- Employee email must be valid and unique.
- Registration requires a password.
- Department is required for an employee.
- Leave type, dates, employee, and reason are required.
- Start date cannot be after end date.
- Only `PENDING` requests can be updated.
- Only `PENDING` requests can be cancelled.
- Only `PENDING` requests can be approved/rejected.
- A department cannot be deleted while employees are assigned to it.
- Duplicate department names are rejected.
- Global REST exception handling returns structured JSON errors.

## 13. Angular Pages

```text
/login
/register
/dashboard
/profile
/apply-leave
/leave-history
/admin
/admin/employees
/admin/leaves
/admin/departments
```

The frontend uses standalone Angular components, Angular Router, HttpClient, and Reactive Forms. No UI framework is required.

## 14. Postman

Import:

```text
postman/Employee-Leave-Management.postman_collection.json
```

The collection contains examples for login, registration, employee CRUD, department CRUD, leave CRUD, approve/reject/cancel, and admin dashboard statistics.

## 15. Common Errors and Solutions

### `Communications link failure` / MySQL connection error

Check:

1. MySQL server is running.
2. Database `employee_leave_db` exists.
3. Username/password in `application.properties` are correct.
4. MySQL is listening on port `3306`.

### `Unknown database 'employee_leave_db'`

Run:

```bash
mysql -u root -p < database/schema.sql
```

### `Port 8080 already in use`

Stop the other process or change:

```properties
server.port=8081
```

If you change the backend port, also change `frontend/src/app/core/api.ts`.

### Angular cannot connect to API

Make sure Spring Boot is running at:

```text
http://localhost:8080
```

and Angular is running at:

```text
http://localhost:4200
```

Also check `frontend/src/app/core/api.ts` and the backend CORS setting.

### CORS error

The backend allows the default development origin:

```properties
app.cors.allowed-origin=http://localhost:4200
```

If Angular is served from another origin, update this property.

### `mvn` is not recognized

Install Maven or run the project from an IDE with Maven support.

### `npm install` fails

Check Node/npm versions and network access, then retry:

```bash
npm cache verify
npm install
```

## 16. Portfolio/Interview Notes

The architecture intentionally demonstrates the classic flow:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Entity
   ↓
MySQL
```

DTOs prevent password fields from being exposed in normal employee responses. The application also demonstrates JPA relationships, enum persistence, Bean Validation, RESTful CRUD, Angular routing, Reactive Forms, client-side validation, CORS, and centralized backend exception handling.

For production, the most important next improvement would be Spring Security with server-side role authorization and BCrypt/Argon2 password storage.

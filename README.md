# International House Managament Software – Technical Documentation

This documentation provides a comprehensive overview of the project, its architecture, key components, and steps for local execution. It serves as the central source of information for developers, administrators, and stakeholders.

---

## Table of Contents
1. [Overview](#overview)
2. [Deployment](#deployment)
3. [Development](#development)
    - [Frontend](#frontend)
        - [Frontend Prerequisites](#frontend-prerequisites)
        - [Frontend Key Components and Files](#frontend-key-components-and-files)
    - [Backend](#backend)
        - [Backend Prerequisites](#backend-prerequisites)
        - [Backend Key Components and Files](#backend-key-components-and-files)
            - [Authentication & Security](#authentication--security)
            - [API Documentation](#api-documentation)
            - [Controller-Service-Entity Layers](#controller-service-entity-layers)
            - [Error Handling](#error-handling)
    - [Docker Environment](#docker-environment)

4. [Additional Notes](#additional-notes)

---

## Overview

Developed by a small team of computer scientists in TU Darmstadt in 2024-2025. (see contributions)

The **International House Managament Software** is a full stack web application that manages employees, visitors, and consultations that International House of TU Darmstadt provides. It also has multilingual support. Many modern design patterns and technologies have been used throughout the development to ensure security, scalability, and maintainability.

---

## 2. Deployment

### Dependencies
Project comes with one docker-compose.yml file that should take care of everything.

Dependencies:

1. Docker: [Official Docker Installation Guide](https://docs.docker.com/get-docker/)
2. Docker Compose

Verify Docker installation by running:
```bash
docker --version
docker-compose --version
```

### Start Services with Docker Compose

The services are configured using the `docker-compose.yml` file.

**!!!Change host ip address in docker-compose.yml to machines ip address!!!**

On Windows:
```bash
ipconfig
```

On Linux:
```bash
ifconfig
```

Start services them by running:

```bash
docker-compose up
```
By default:
- **Frontend:** Runs on port `3000`.
- **Backend:** Runs on port `8080`.
You can always edit these in docker-compose.yml

Confirm containers are running:
```bash
docker stats
```

---

## 3. Development

### Frontend

#### Frontend Prerequisites

Before setting up the project, ensure you have the following tools installed:

- **text editor** Your favorite  (e.g., **VS Code**, **Vim**)
- **Node.js** node (comes with **npm** node package manager)
- **git** for version control

##### Clone the Repository

Start by cloning the repository to your local machine using Git:

```bash
git clone <repository_url>
cd <repository_directory>
```

##### Install Dependencies

Once inside the project directory, install the required dependencies by running:

```bash
npm install
```

##### Running the Development Server

To start the development server and launch the application, run the following:

```bash
npm start
```

This will start the React development server, and you can view the application at `http://localhost:3000`.

---

#### Frontend Key Components and Files

The project is organized into the following key folders:

- `public/` – Contains the static assets and `index.html` template file.
- `src/` – This is where the source code resides, including:

  - `index.js` – Starting point of the application.
  - `App.js` – Root component of the application.
  - `components/` – Reusable UI components like buttons, modals, etc.
  - `pages/` – Components that represent entire pages/screens.

  - `locales/` – Language options.
  - `database/` – Wrappers for common CRUD fetch apis.
  - `_variables.scss` – Global colors included in all sass files.
  - `package.json` – Contains metadata, scripts, and project dependencies.
  - `fonts/` – Fonts used in project.

---

### Backend

#### Backend Prerequisites

Before setting up the project, ensure you have the following tools installed:

- **text editor** Your favorite  (e.g., **VS Code**, **Vim**)
- **java**
- **maven** maven (comes with **mvn** package manager)
- **git** for version control

#### Clone the Repository

Start by cloning the repository to your local machine using Git:

```bash
git clone <repository_url>
cd <repository_directory>
```

#### Install Java

- [Official Java Installation Guide](https://www.java.com/en/download/help/download_options.html)

Verify the installation:
```bash
java --version
```

#### Install Maven

- [Official Maven Installation Guide](https://maven.apache.org/install.html)

Verify the installation:
```bash
mvn -v
```

#### Install Dependencies

Synchronize and install the dependencies defined in the `pom.xml` file by running:
```bash
mvn clean install
```

This step downloads the required libraries for the project and creates the necessary JAR files in your local Maven repository.

#### Running the Backend Application

Once the application starts successfully, all necessary services should be running. Verify the following:
- **Backend API Health Check:** API health check endpoint returns the operational status of the API, and it should be available at `http://localhost:8080/health`   
- **Backend API Status:** The API documentation should be available at `http://localhost:8080/swagger-ui/index.html`.
- **Docker Services:** Ensure PostgreSQL and Redis are still active by checking Docker's active containers:
  ```bash
  docker stats
  ```
With these steps, you can successfully set up and run the application. If any issue arises, check the application logs in the IDE or the terminal for troubleshooting.

#### Backend Key Components and Files

##### Architecture and Technologies

- **Authentication** using JSON Web Tokens (JWT).
- **CRUD operations** for endpoints
- **Swagger/OpenAPI** integration for API documentation.
The application uses the following frameworks and tools:
- **Spring Boot 3.4.2** – Primary backend framework.
- **Spring Security** – Provides JWT-based authentication and role-based access control.
- **Spring Data JPA** – Used for data persistence with PostgreSQL.
- **Swagger/OpenAPI** – For documenting API endpoints.
- **Jakarta EE** – Utilized for standard validation and server-side Java components.
- **Redis** – Used for session management and caching.
- **Lombok** – Eliminates boilerplate code in Java projects.
- **Docker** – For containerized deployment.
- **ModelMapper** – Simplifies mapping between DTOs and entities.

The backend follows the **Controller-Service-Repository (CSR)** design pattern, which ensures clean separation between business logic, data management, and API endpoints.

##### API Documentation

The application is documented using **Swagger/OpenAPI**. Accessible at:

 ```
  http://localhost:8080/swagger-ui/index.html
  ```

This interface allows you to view and test all available endpoints.

Endpoints:
- `/api/auth/*` – Authentication and profile management.
- `/api/employees/*` – Employee CRUD operations.
- `/api/visitors/*` – Visitor management.
- `/api/information/*` – Multilingual system information.
- `/api/consultations/*` – Manage scheduled consultation areas (eg. Krankenkasse).
- `/api/consultation/events/*` – Manage a single consultation.
- `/api/health/*` – Checks the operational status of the API.

##### Authentication & Security

- **JWT-Based Security:**  
  JWT tokens are used for authenticating requests. All secured endpoints validate the JWT token before processing the request.
    - The token is generated upon successful login and contains user-specific claims (e.g., role, name, etc.).
    - Tokens are validated and parsed using the `JwtUtil` class.

- **Role-Based Access Control:**  
  Access to endpoints is governed by Spring Security's pre-authorization mechanisms (e.g., `@PreAuthorize("hasRole('ADMIN')")`).
    - Example: Only `ROLE_ADMIN` users can create employees.

- **Password Hashing:**  
  User passwords are hashed using a `PasswordEncoder` for enhanced security.

##### Data Management

- **Entities** act as the core data models (e.g., `Employee`, `Visitor`, `Consultation`). They are annotated with JPA annotations for database table mapping.
- **Repositories** provide database interaction via interfaces extending `JpaRepository`.

- **DTOs (Data Transfer Objects):**
    - Used to encapsulate API responses and control what data is returned to the frontend.
    - Example: `BaseResponseDto` is used across endpoints for consistent API response structures.

##### Controller-Service-Entity Layers

**1. Controller Layer**
- The controller layer serves as the entry point for API calls and handles incoming HTTP requests.
- Each entity (e.g., Employee, Visitor, Consultation) has a corresponding REST controller.
- Controllers do not contain business logic but instead delegate it to the service layer.

**Examples:**
- `EmployeeController` handles API requests related to employee management (`/api/employees`).
- `VisitorController` manages visitor-related functionalities (`/api/visitors`).

**Common Classes:**
- `BaseResponseDto`: Standardizes responses across all endpoints.
- Example:
  ```java
  ResponseEntity<BaseResponseDto> responseEntity;
  ```

**2. Service Layer**
- Services implement the application's business logic, delegating data management to repositories.
- Example functionality:
    - Creating new employees (`EmployeeServiceImpl`)
    - Fetching consultations (`ConsultationServiceImpl`)

**Key Classes:**
- `EmployeeService`
- `VisitorService`
- `ConsultationService`

**Detailed Features:**
- Services ensure validation and transformations (e.g., encoding sensitive data like passwords, catching entities that don't exist, etc.).
- Use of annotations like `@Transactional` guarantees consistent database state.

**3. Entity Layer**
- The entity layer represents database tables using JPA.
- Each entity corresponds to one or more tables in the PostgreSQL database.
- Example Entities:
    - `Employee`: Stores information like ID, Name, Role, and Password.
    - `Visitor`: Represents visitor details with attributes like ID, name, etc.
    - `Consultation`: Represents consultations scheduled within the system.

---

##### How They Work Together
1. **Request Flow:**
- The client sends a request to a specific endpoint managed by the controller.
- The controller passes the request to the appropriate service.
- The service layer performs business logic and communicates with the repository layer to retrieve or save data.
- The service returns the processed data back to the controller, which encapsulates it in a standard response object.

2. **Entity Mapping:**
- Controllers process request payloads into entities (if needed).
- Services map entities back or forth from DTOs, ensuring loosely coupled and secure responses.

##### Error Handling

Error handling in the application ensures consistent and meaningful error responses. The following components are used:

**1. BaseException**
- Serves as the foundation for all custom exceptions.
- Provides attributes like `httpStatus` and `errorCode` to standardize error messages across different exceptions.

**Attributes:**
- `httpStatus`: HTTP response status for the error.
- `message`: Error message conveyed to the client.
- `errorCode`: A unique integer code for each type of error.

Example custom exceptions extending `BaseException`:
- `EmployeeAlreadyExistException`: Triggered when attempting to create an employee that already exists.
- `EmployeeNotFoundException`: Thrown when an employee cannot be found in the database.
- `InvalidCredentialsException`: Raised during authentication for invalid username or password.

**2. GlobalExceptionFilter**
- A centralized exception-handling mechanism using `@ControllerAdvice`.
- Captures and processes exceptions globally, ensuring clients receive consistent JSON error responses.
- Handles various exception types, including:
    - `BaseException`: Returns structured error responses for business exceptions.
    - `MethodArgumentNotValidException`: Captures validation errors for input payloads and returns detailed validation error messages.
    - `AccessDeniedException`: Handles unauthorized access attempts.
    - Generic `RuntimeException`s: Provides a fallback processor for unexpected errors.

**Error Response Example:**
When a business exception occurs:
```json
{
  "errorCode": 2,
  "message": "Employee already exists",
  "path": "/api/employees",
  "status": 400,
  "timestamp": "2023-10-20T12:34:56"
}
```

**3. Validation**
- Validation errors for incoming requests are handled by `MethodArgumentNotValidException`, which maps field-level validation errors into descriptive JSON objects.

**Example Validation Error Response:**
```json
{
  "errorCode": 1,
  "message": "Validation error",
  "data": {
    "name": "Name must not be empty",
    "email": "Email is not valid"
  },
  "status": 400,
  "timestamp": "2023-10-20T12:34:56"
}
```

**Custom Exception Highlights:**
- `EmployeeAlreadyExistException`: Thrown if an employee with the given properties already exists.
- `EmployeeNotFoundException`: Thrown when a resource is missing from the database.
- `InvalidCredentialsException`: Used during login attempts for invalid username/password combinations.

By centralizing exception handling, the application reduces redundancy and provides a consistent developer and client experience.

---

### Docker Environment
- There are 4 services that are interconnected with one `docker-compose.yml` file.
    1. Frontend (see `frontend/dockerfile`)
    2. Backend (see `backend/dockerfile`)
    3. Database `PostgreSQL`
    4. Redis-Database `Redis`
- The `docker-compose.yml` builds Frontend and Backend from docker files and starts alongside the supporting services (Redis, PostgreSQL).

## **Future Features & Development Plans**

This section outlines planned features and improvements for the project. These represent ongoing efforts to enhance functionality and scalability.

### **Planned Features**
1. **Accessibility Features:**  
   Introduce enhanced accessibility features to better support handicapped users, such as optimized navigation and additional tools.

2. **Support for More Languages:**  
   Expand frontend language support beyond English and German, providing international users with a more inclusive experience.

3. **3D Room Model of Consultations & Events:**  
   Implement real-time 3D visualization of rooms holding consultation events to help users better locate and navigate scheduled events.

### **Development Plans**
1. **Enhanced Data Transfer Objects (DTOs):**  
   Extend the project with more dedicated DTO classes for all endpoints, improving request validations and ensuring consistent API responses.

2. **Better Password Encryption:**  
   Upgrade password encryption to use cutting-edge methods to guard against increasingly powerful attackers, ensuring higher levels of security.

## Additional Notes
- **Initialization:**  
  The system includes automatic **admin creation** at startup via the `AppInitializerServiceImpl`. Default admin credentials are fetched from environment variables.\
  The application supports **CORS configurations** (`WebConfig.java`) for cross-origin requests, allowing frontend integrations.

- **Error Handling:**  
  The application employs an error-handling Spring Boot Starter that ensures consistent HTTP error codes and detailed error descriptions are returned.

- **Security:**  
  Robust security is enforced via modern authentication and authorization mechanisms, including JWT validation, Redis-backed session management, and Spring Security to protect endpoints from unauthorized access.

- **Logging and Monitoring:**  
  The application is production-ready with support for HTTP/2, comprehensive logging configurations, and Actuator endpoints for monitoring.

- **Extensibility and Maintainability:**  
  With a modular design and clearly separated concerns, the system is highly extensible and maintainable, facilitating the addition of new features and modifications with minimal impact on existing functionality.

#### Further Readings

Here are some useful links to official documentation and resources for the technologies used in the project:

- **PostgreSQL Documentation:**  
  https://www.postgresql.org/docs/

- **Docker Documentation:**  
  https://docs.docker.com/

- **Redis Documentation:**  
  https://redis.io/docs/

- **Apache Maven Documentation:**  
  https://maven.apache.org/guides/index.html

- **Spring Boot Reference Documentation:**  
  https://docs.spring.io/spring-boot/docs/current/reference/html/

- **Spring Security (JWT):**  
  https://spring.io/projects/spring-security

- **Spring Data JPA Reference:**  
  https://docs.spring.io/spring-data/jpa/reference/jpa.html

---

This technical documentation details the structure and functioning of the International House Backend System, along with the necessary steps for local and containerized deployment. For any further questions, please contact the development or operations team.
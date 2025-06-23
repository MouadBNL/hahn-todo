# Hahn Todo App

![Hahn Todo Landing Page](https://raw.githubusercontent.com/MouadBNL/hahn-todo/refs/heads/main/assets/hahn-landing-page.png)

A modern todo application built with Spring Boot backend and Vite + React frontend.

## Getting Started

There are two ways to run the Hahn Todo application:
### Option 1: Using Docker

1. Make sure you have Docker installed on your system
2. Clone this repository:
   ```bash
   git clone https://github.com/MouadBNL/hahn-todo
   cd hahn-todo
   ```
3. From the root directory, run:
   ```bash
   docker compose up --build
   ```
4. The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

### Option 2: Manual Setup  

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The API will be available at http://localhost:8080

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```
   The frontend will be available at http://localhost:5173


### CORS Configuration

If you're running the frontend on a different port than the default (5173), you'll need to update the CORS configuration in the backend:

1. Open `backend/src/main/java/com/hahntask/backend/config/security/SecurityConfiguration.java`
2. Update the allowed origins in the `corsConfigurationSource` method:
   ```java
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:YOUR_PORT"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
   ```
3. Replace `YOUR_PORT` with your frontend port number
4. Restart the backend server for the changes to take effect

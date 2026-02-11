# 🚀 E-Commerce Platform Setup Guide (VS Code)

This guide explains how you and your teammates can set up and run this full-stack project in Visual Studio Code. This project uses a **Java Spring Boot backend** and a **React frontend**.

---

## 🛠️ Prerequisites

Ensure everyone has the following installed:

1.  **Visual Studio Code**: [Download](https://code.visualstudio.com/)
2.  **Java JDK 17+**: Required for Spring Boot.
    *   Verify: Open terminal -> `java -version`
3.  **Node.js (LTS)**: Required for React.
    *   Verify: Open terminal -> `node -v`
4.  **Maven** (Optional but Recommended): For building the backend.
    *   *Note: We have included a portable Maven wrapper in `apache-maven-3.9.5` if you don't have it installed globally.*

---

## 📦 VS Code Extension Pack

Install these extensions for the best development experience:
*   **Extension Pack for Java** (Microsoft)
*   **Spring Boot Extension Pack** (VMware)
*   **ES7+ React/Redux/React-Native snippets** (dsznajder)

---

## ▶️ How to Run the Project

You will need TWO terminal windows open in VS Code.

### Terminal 1: START BACKEND (Server)

1.  Open a new terminal in VS Code (`Ctrl + ~`).
2.  Navigate to the backend folder:
    ```powershell
    cd backend
    ```
3.  Start the Spring Boot application:
    ```powershell
    # Option A: Using Maven (Recommended)
    mvn spring-boot:run

    # Option B: Run the pre-built JAR (Faster)
    java -jar target/ecommerce-backend-1.0.0.jar
    ```
4.  Wait until you see: `Started ECommerceApplication in X.XXX seconds`.
    *   *The server is now running at: `http://localhost:8080`*

### Terminal 2: START FRONTEND (Client)

1.  Open a **second** terminal (`+` icon in terminal panel).
2.  Navigate to the frontend folder:
    ```powershell
    cd frontend
    ```
3.  Install dependencies (First time only):
    ```powershell
    npm install
    ```
4.  Start the React development server:
    ```powershell
    npm start
    ```
5.  Wait until it opens your browser automatically at: `http://localhost:3000`.

---

## 🛑 How to Stop

*   Click inside the terminal window and press `Ctrl + C`, then type `Y` to terminate the batch job.
*   Do this for both backend and frontend terminals.

## 🐛 Troubleshooting

*   **Port 8080 is already in use**:
    *   Make sure no other Java process is running.
    *   Command to kill: `taskkill /F /IM java.exe`
*   **Database Error**:
    *   The project uses an in-memory H2 database. Data resets when you restart the backend. This is by design for development.
*   **"mvn is not recognized"**:
    *   Use the full path to our local maven: `../apache-maven-3.9.5/bin/mvn spring-boot:run`

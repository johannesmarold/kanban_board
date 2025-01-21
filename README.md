# Full Stack Web Application of an exemplary kanban board

## Requirements

### General Requirements
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Frontend Specific
- Vite (installed via npm)

---

## Installation

### Linux

1. **Update your package manager:**
   ```bash
   sudo apt update && sudo apt upgrade
   ```

2. **Install Node.js and npm:**
   ```bash
   sudo apt install nodejs npm
   ```

3. **Verify installation:**
   ```bash
   node -v
   npm -v
   ```

4. **Navigate to the project directory:**
   ```bash
   cd /path/to/project
   ```

5. **Install dependencies for frontend:**
   ```bash
   cd frontend
   npm install
   ```

6. **Install dependencies for backend:**
   ```bash
   cd ../backend
   npm install
   ```

### Windows

1. **Download and install Node.js:**
   - Visit [Node.js official website](https://nodejs.org/).
   - Download the latest LTS version.
   - Follow the installation wizard.

2. **Verify installation:**
   Open Command Prompt and run:
   ```cmd
   node -v
   npm -v
   ```

3. **Navigate to the project directory:**
   ```cmd
   cd \path\to\project
   ```

4. **Install dependencies for frontend:**
   ```cmd
   cd frontend
   npm install
   ```

5. **Install dependencies for backend:**
   ```cmd
   cd ..\backend
   npm install
   ```

---

## Setup

### Frontend
1. Ensure you are in the `frontend` directory.
   ```bash
   cd frontend
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Access the application in your browser at `http://localhost:3000` (default).

### Backend
1. Ensure you are in the `backend` directory.
   ```bash
   cd backend
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. The backend will listen on `http://localhost:5000` (default).

---

## Running the Project

### Combined Workflow
1. Open two terminal windows or tabs.
2. In one terminal, navigate to the `frontend` directory and start the frontend server:
   ```bash
   cd /path/to/project/frontend
   npm run dev
   ```
3. In the second terminal, navigate to the `backend` directory and start the backend server:
   ```bash
   cd /path/to/project/backend
   node index.js
   ```

### Accessing the Application
- Open a web browser and navigate to `http://localhost:3000`.
- Ensure the backend is running to handle API requests properly.

---

## Additional Notes

### Troubleshooting
- If ports `3000` (frontend) or `5000` (backend) are already in use, update the configurations in the respective files (`vite.config.js` for frontend and `index.js` for backend).
- Ensure proper permissions for Linux users by running commands with `sudo` where necessary.

### Cleaning Up
- To remove `node_modules` and start fresh:
  ```bash
  rm -rf node_modules
  npm install
  ```

- On Windows, use:
  ```cmd
  rmdir /s /q node_modules
  npm install
  ```


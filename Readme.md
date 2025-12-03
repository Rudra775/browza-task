Browza - Job Management System
===================================

A full-stack SaaS dashboard to manage, track, and execute scraping jobs. Built with a focus on strict state management, security, and a clean, modern UI.

Key Features
--------------

*   ** Secure Authentication:** Complete User Sign Up & Login system using **JWT** and **Bcrypt**.
    
*   ** Data Isolation:** Multi-tenancy support—users can only access and modify their own jobs.
    
*   ** Advanced Search:** Real-time search functionality to filter jobs by title.
    
*   ** Strict State Machine:** Jobs follow a logical flow (PENDING → RUNNING → COMPLETED/FAILED) to prevent data corruption.
    
*   ** Responsive UI:** Built with **Tailwind CSS**, featuring a slide-out details drawer and dynamic status badges.
    

Tech Stack
--------------

### **Frontend (Client)**

*   **Framework:** Next.js 14 (App Router)
    
*   **Styling:** Tailwind CSS
    
*   **Icons:** lucide-react
    
*   **State:** React Context API & Native Fetch
    

### **Backend (Server)**

*   **Runtime:** Node.js & Express
    
*   **Database:** MongoDB & Mongoose
    
*   **Auth:** jsonwebtoken (JWT) & bcryptjs
    

Folder Structure
-------------------

Plaintext

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   root/  ├── backend/            # Express Server  │   ├── src/  │   │   ├── config/     # DB Connection  │   │   ├── controllers/# Business Logic  │   │   ├── models/     # DB Schemas  │   │   ├── routes/     # API Endpoints  │   │   └── middleware/ # Auth Protection  │   └── server.js       # Entry Point  │  └── frontend/           # Next.js Client      ├── app/            # Pages & Routes      ├── components/     # UI Components      ├── context/        # Auth Provider      └── lib/            # API Helpers   `

How to Run Locally
------------------------

### 1\. Clone the Repo

Bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   git clone https://github.com/your-username/taskflow.git  cd taskflow   `

### 2\. Setup Backend

Open a terminal in the backend folder:

Bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend  npm install  # Create a .env file (Replace with your actual MongoDB URI)  echo "PORT=5000" > .env  echo "MONGO_URI=mongodb+srv://..." >> .env  echo "JWT_SECRET=supersecretkey" >> .env  # Run Server  npm run dev   `

_Server runs on: http://localhost:5000_

### 3\. Setup Frontend

Open a **new** terminal in the frontend folder:

Bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd frontend  npm install  # Create a .env.local file  echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local  # Run Client  npm run dev   `

_Client runs on: http://localhost:3000_

Assumptions Made
-------------------

1.  **Workflow Logic:** A job cannot be marked "Completed" if it hasn't started yet. The system enforces PENDING → RUNNING before completion.
    
2.  **Job Assignment (Strict Contract):** Once a job has been created, critical fields like **Title** and **Budget** cannot be edited. This ensures the contract remains valid after creation.
    
3.  **Persistence:** No "Soft Delete" was implemented; data is kept permanently for historical reporting.
    

Improvements (Future Roadmap)
--------------------------------

1.  **Server-Side Pagination & Optimization:**
    
    *   _Current State:_ The dashboard fetches all user jobs at once.
        
    *   _Improvement:_ If a user has 1,000+ jobs, this becomes slow. I would implement pagination to send jobs in **batches of 5** (sorted by latest). The UI would include "Next" and "Previous" controls to navigate through the history, significantly reducing database load and improving "Time to Interactive."
        
2.  **Containerization:**
    
    *   Add Docker support to spin up the Database, Backend, and Frontend with a single command (docker-compose up) to simplify developer onboarding.
        
3.  **Real-Time Updates:**
    
    *   Implement **WebSockets (Socket.io)** so that if a background worker fails a job, the dashboard status turns Red instantly without the user needing to refresh the page.
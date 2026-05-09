# 🛡️ Secure Login System (Thiranex Project)

A professional, secure web application built with Node.js and Express. This project demonstrates industry-standard authentication techniques, including password hashing and session management, to protect against unauthorized access and common cyber attacks.

🚀 Key Features

Secure Password Hashing: Uses bcryptjs to salt and hash passwords before storage, ensuring that even if the database is compromised, user passwords remain safe.

Session Management: Implements express-session to maintain user state securely across requests and handle safe logouts.

SQL Injection Prevention: Built using modern JavaScript objects and logic-based data handling to avoid raw query vulnerabilities.

Centered Dashboard: A clean, modern UI that displays a personalized "Welcome" message centered in the browser after a successful login.

Input Validation: Ensures that usernames and passwords meet basic criteria before processing.

🛠️ Tech Stack

Backend: Node.js, Express.js

Security: Bcryptjs (Hashing), Express-Session (Authentication State)

Frontend: HTML5, CSS3 (Flexbox for centering)

Tools: VS Code, NPM

📂 Project Structure

Plaintext
secure-login-app/
├── public/
│   ├── index.html       # Centered Login UI
│   └── register.html    # Centered Registration UI
├── server.js            # Backend Logic & Session Handling
├── package.json         # Project Dependencies
└── README.md            # Documentation

⚙️ Installation & Setup

Clone or Create the Project Folder:
Open the folder in VS Code.

Initialize Node.js:
In your terminal, run:

Bash
npm init -y

Install Dependencies:
Run the following command to install the required security libraries:

Bash
npm install express bcryptjs express-session body-parser

Run the Application:
Start the server:

Bash
node server.js

Access the App:
Open your browser and navigate to http://localhost:3000.

🔒 Security Logic Explained

1. Password Hashing (Bcrypt)
When a user registers, the system does not store the actual password. It generates a "salt" and runs the password through a one-way hashing algorithm.

Plaintext: mypassword123

Stored Hash: $2a$10$7R6vYx... (gibberish that cannot be reversed)

2. Session Cookies
Upon successful login, the server creates a unique Session ID. This ID is stored in a cookie in the user's browser. For every subsequent request, the browser sends this cookie back to the server to prove the user is still logged in.

3. UI Centering
The application uses CSS Flexbox to calculate the available screen space and position the login/dashboard cards perfectly in the middle of the viewport:

CSS
display: flex;
justify-content: center;
align-items: center;
height: 100vh;

✅ Project Checklist

[x] Secure Password Hashing (Bcrypt)

[x] Input Validation (No empty fields)

[x] Session Management (Login/Logout)

[x] Centered UI (Modern CSS)

[x] Protection from basic SQL Injection

📄 Expected Outcome

A robust and secure authentication gateway that significantly reduces unauthorized access and protects user accounts through modern cryptographic standards.
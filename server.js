const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// --- 1. Middleware ---
// body-parser handles incoming form data and helps prevent basic injection
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files (HTML/CSS) from the "public" folder
app.use(express.static('public'));

// --- 2. Session Management ---
// This keeps users logged in using a secure cookie
app.use(session({
    secret: 'thiranex-secure-key-2026', // Secret key to sign the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 } // Session expires after 10 minutes of inactivity
}));

// --- 3. Mock Database ---
// In a real app, you would use MongoDB or MySQL here
const users = []; 

// --- 4. Routes ---

// Root Route: Checks if user is logged in
app.get('/', (req, res) => {
    if (req.session.userId) {
        // Styled Welcome Screen (Centered Dashboard)
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Dashboard</title>
                <style>
                    body {
                        font-family: 'Segoe UI', sans-serif;
                        background-color: #f0f2f5;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .welcome-card {
                        background: white;
                        padding: 50px;
                        border-radius: 15px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                        text-align: center;
                        max-width: 400px;
                    }
                    h1 { color: #1c1e21; margin-bottom: 10px; }
                    p { color: #606770; margin-bottom: 30px; line-height: 1.5; }
                    .btn-logout {
                        padding: 12px 25px;
                        background-color: #ff4757;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                        transition: 0.3s;
                        display: inline-block;
                    }
                    .btn-logout:hover { background-color: #ff6b81; transform: translateY(-2px); }
                </style>
            </head>
            <body>
                <div class="welcome-card">
                    <h1>Welcome, ${req.session.userId}! 👋</h1>
                    <p>Your secure session is active. You are now authorized to view this dashboard.</p>
                    <a href="/logout" class="btn-logout">Logout Session</a>
                </div>
            </body>
            </html>
        `);
    } else {
        // If not logged in, show the login page from the public folder
        res.sendFile(path.join(__dirname, 'public/index.html'));
    }
});

// Registration Logic
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Basic Validation
    if (!username || !password) {
        return res.send('Please provide both username and password. <a href="/register.html">Back</a>');
    }

    // Check if user already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.send('Username already taken. <a href="/register.html">Try another</a>');
    }

    // SECURE FEATURE: Password Hashing with Bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    users.push({ username, password: hashedPassword });
    console.log("Current Users in DB:", users); // View hashed passwords in VS Code terminal
    
    res.send('Registration successful! <a href="/">Click here to Login</a>');
});

// Login Logic
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Find user in our "database"
    const user = users.find(u => u.username === username);

    // SECURE FEATURE: Compare entered password with stored hash
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = username; // Create the session
        res.redirect('/');
    } else {
        res.send('Invalid username or password. <a href="/">Try again</a>');
    }
});

// Logout Logic
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send("Error logging out.");
        res.redirect('/');
    });
});

// --- 5. Start Server ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
    =========================================
    SECURE LOGIN SYSTEM RUNNING
    URL: http://localhost:${PORT}
    =========================================
    `);
});
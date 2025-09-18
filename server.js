// ============================================
// Quiz by Yogesh - Simple Node.js Server
// Created and Developed by Yogeshwar Yadav
// For IT Developer Company - Internship Project
// ============================================

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Simple data storage (in real app, use database)
let users = [
    { 
        id: 1, 
        name: 'Admin User', 
        email: 'admin@123', 
        password: 'admin@123', 
        isAdmin: true 
    }
];

let quizzes = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        category: "javascript",
        difficulty: "easy",
        timeLimit: 10,
        description: "Test your knowledge of JavaScript basics",
        questions: [
            {
                id: 1,
                question: "What is the correct way to declare a variable in JavaScript?",
                options: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
                correct: 0
            },
            {
                id: 2,
                question: "Which method is used to add an element to the end of an array?",
                options: ["append()", "add()", "push()", "insert()"],
                correct: 2
            },
            {
                id: 3,
                question: "What does DOM stand for?",
                options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Model"],
                correct: 0
            },
            {
                id: 4,
                question: "Which operator is used for strict equality in JavaScript?",
                options: ["==", "===", "=", "!="],
                correct: 1
            },
            {
                id: 5,
                question: "How do you create a function in JavaScript?",
                options: ["function myFunction() {}", "create myFunction() {}", "def myFunction() {}", "func myFunction() {}"],
                correct: 0
            },
            {
                id: 6,
                question: "What is the correct way to write a JavaScript array?",
                options: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
                correct: 1
            },
            {
                id: 7,
                question: "How do you write 'Hello World' in an alert box?",
                options: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
                correct: 2
            },
            {
                id: 8,
                question: "How do you create a function in JavaScript?",
                options: ["function = myFunction() {}", "function myFunction() {}", "create myFunction() {}", "function:myFunction() {}"],
                correct: 1
            },
            {
                id: 9,
                question: "How do you call a function named 'myFunction'?",
                options: ["call function myFunction()", "call myFunction()", "myFunction()", "Call.myFunction()"],
                correct: 2
            },
            {
                id: 10,
                question: "How can you add a comment in JavaScript?",
                options: ["'This is a comment", "<!-- This is a comment -->", "// This is a comment", "* This is a comment *"],
                correct: 2
            }
        ]
    },
    {
        id: 2,
        title: "Python Basics",
        category: "python",
        difficulty: "medium",
        timeLimit: 15,
        description: "Learn Python basics including data types, loops, and functions.",
        questions: [
            {
                id: 1,
                question: "Which of the following is the correct way to create a list in Python?",
                options: ["list = []", "list = {}", "list = ()", "list = <>"],
                correct: 0
            },
            {
                id: 2,
                question: "What is the output of print(2**3)?",
                options: ["6", "8", "9", "5"],
                correct: 1
            },
            {
                id: 3,
                question: "Which keyword is used to create a function in Python?",
                options: ["function", "def", "create", "func"],
                correct: 1
            },
            {
                id: 4,
                question: "What is the correct file extension for Python files?",
                options: [".pyth", ".pt", ".py", ".python"],
                correct: 2
            },
            {
                id: 5,
                question: "How do you insert comments in Python code?",
                options: ["/* This is a comment */", "// This is a comment", "# This is a comment", "<!-- This is a comment -->"],
                correct: 2
            },
            {
                id: 6,
                question: "Which of these is NOT a core data type in Python?",
                options: ["Lists", "Dictionary", "Tuples", "Class"],
                correct: 3
            },
            {
                id: 7,
                question: "What does pip stand for in Python?",
                options: ["Pip Installs Packages", "Python Install Program", "Package Installer for Python", "Python Integrated Platform"],
                correct: 0
            },
            {
                id: 8,
                question: "Which method is used to remove whitespace from the beginning and end of a string?",
                options: ["trim()", "strip()", "remove()", "clean()"],
                correct: 1
            },
            {
                id: 9,
                question: "What is the correct way to create a variable in Python?",
                options: ["var x = 5", "variable x = 5", "x = 5", "create x = 5"],
                correct: 2
            },
            {
                id: 10,
                question: "Which of the following is used to define a block of code in Python language?",
                options: ["Indentation", "Key", "Brackets", "All of the above"],
                correct: 0
            }
        ]
    }
];

let quizAttempts = [];

// Routes

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// User Authentication
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        isAdmin: false
    };

    users.push(newUser);

    res.json({
        success: true,
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        }
    });
});

// Quiz Management
app.get('/api/quizzes', (req, res) => {
    // Return quizzes without correct answers for security
    const publicQuizzes = quizzes.map(quiz => ({
        ...quiz,
        questions: quiz.questions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options
            // Don't include correct answer
        }))
    }));

    res.json(publicQuizzes);
});

app.get('/api/quizzes/:id', (req, res) => {
    const quizId = parseInt(req.params.id);
    const quiz = quizzes.find(q => q.id === quizId);

    if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    // Return quiz without correct answers
    const publicQuiz = {
        ...quiz,
        questions: quiz.questions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options
        }))
    };

    res.json(publicQuiz);
});

app.post('/api/quizzes', (req, res) => {
    const { title, category, difficulty, timeLimit, questions } = req.body;

    const newQuiz = {
        id: quizzes.length + 1,
        title,
        category,
        difficulty,
        timeLimit: parseInt(timeLimit),
        description: `Custom quiz: ${title}`,
        questions: questions.map((q, index) => ({
            id: index + 1,
            question: q.question,
            options: q.options,
            correct: q.correct
        }))
    };

    quizzes.push(newQuiz);

    res.json({ success: true, quiz: newQuiz });
});

// UPDATE QUIZ - EDIT FUNCTIONALITY
app.put('/api/quizzes/:id', (req, res) => {
    const quizId = parseInt(req.params.id);
    const { title, category, difficulty, timeLimit, questions } = req.body;

    const quizIndex = quizzes.findIndex(q => q.id === quizId);

    if (quizIndex === -1) {
        return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    quizzes[quizIndex] = {
        ...quizzes[quizIndex],
        title,
        category,
        difficulty,
        timeLimit: parseInt(timeLimit),
        description: `Updated quiz: ${title}`,
        questions: questions.map((q, index) => ({
            id: index + 1,
            question: q.question,
            options: q.options,
            correct: q.correct
        }))
    };

    res.json({ success: true, quiz: quizzes[quizIndex] });
});

app.delete('/api/quizzes/:id', (req, res) => {
    const quizId = parseInt(req.params.id);
    const index = quizzes.findIndex(q => q.id === quizId);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    quizzes.splice(index, 1);
    res.json({ success: true, message: 'Quiz deleted successfully' });
});

// Quiz Attempts
app.post('/api/quiz-attempts', (req, res) => {
    const { userId, quizId, answers, timeTaken } = req.body;

    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
        return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    // Calculate score
    let correctCount = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach(question => {
        const userAnswer = answers[question.id];
        if (userAnswer === question.correct) {
            correctCount++;
        }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const attempt = {
        id: quizAttempts.length + 1,
        userId,
        quizId,
        score: percentage,
        correctAnswers: correctCount,
        totalQuestions,
        timeTaken,
        date: new Date().toISOString(),
        answers
    };

    quizAttempts.push(attempt);

    res.json({
        success: true,
        result: {
            score: percentage,
            correctAnswers: correctCount,
            totalQuestions,
            timeTaken
        }
    });
});

// Leaderboard
app.get('/api/leaderboard', (req, res) => {
    // Get top attempts grouped by user
    const userBestScores = {};

    quizAttempts.forEach(attempt => {
        const userId = attempt.userId;
        if (!userBestScores[userId] || attempt.score > userBestScores[userId].score) {
            const user = users.find(u => u.id === userId);
            userBestScores[userId] = {
                name: user ? user.name : 'Unknown User',
                score: attempt.score,
                timeTaken: attempt.timeTaken,
                date: attempt.date
            };
        }
    });

    const leaderboard = Object.values(userBestScores)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

    res.json(leaderboard);
});

// User Management (Admin only)
app.get('/api/users', (req, res) => {
    // Return users without passwords
    const publicUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }));

    res.json(publicUsers);
});

// Analytics
app.get('/api/analytics', (req, res) => {
    res.json({
        totalQuizzes: quizzes.length,
        totalUsers: users.length,
        totalAttempts: quizAttempts.length,
        averageScore: quizAttempts.length > 0 ? 
            Math.round(quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / quizAttempts.length) : 0
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log('');
    console.log('🧠 Quiz by Yogesh - Server Started!');
    console.log('=====================================');
    console.log(`🌐 Server running on: http://localhost:${PORT}`);
    console.log('📊 Features available:');
    console.log('   ✅ User Authentication');
    console.log('   ✅ Quiz Management (Create/Edit/Delete)');
    console.log('   ✅ Timed Quizzes');
    console.log('   ✅ Leaderboard System');
    console.log('   ✅ Admin Dashboard');
    console.log('   ✅ Complete CRUD Operations');
    console.log('');
    console.log('🔑 Admin Login Credentials:');
    console.log('   📧 Email: admin@123');
    console.log('   🔒 Password: admin@123');
    console.log('');
    console.log('👨‍💻 Created and Developed by Yogeshwar Yadav');
    console.log('🏢 For IT Developer Company - Internship Project');
    console.log('📧 Contact: info@itdeveloper.in');
    console.log('');
});

module.exports = app;
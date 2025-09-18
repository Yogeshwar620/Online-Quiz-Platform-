// ============================================
// Quiz by Yogesh - Simple JavaScript WITH EDIT FUNCTIONALITY
// Created and Developed by Yogeshwar Yadav
// For IT Developer Company - Internship Project
// ============================================

// Global State
let currentUser = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let quizTimer = null;
let timeLeft = 0;
let isQuizActive = false;
let editingQuizId = null; // For edit functionality

// Sample Data
const sampleQuizzes = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        category: "javascript",
        difficulty: "easy",
        timeLimit: 10,
        description: "Test your knowledge of JavaScript basics including variables, functions, and DOM manipulation.",
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
    },
    {
        id: 3,
        title: "Java Object-Oriented Programming",
        category: "java",
        difficulty: "hard",
        timeLimit: 20,
        description: "Advanced Java concepts including inheritance, polymorphism, and encapsulation.",
        questions: [
            {
                id: 1,
                question: "Which access modifier allows access from any class?",
                options: ["private", "protected", "public", "default"],
                correct: 2
            },
            {
                id: 2,
                question: "What is method overriding in Java?",
                options: ["Creating multiple methods with same name", "Redefining a method in subclass", "Calling parent method", "None of the above"],
                correct: 1
            },
            {
                id: 3,
                question: "Which keyword is used to inherit a class in Java?",
                options: ["extends", "implements", "inherits", "super"],
                correct: 0
            },
            {
                id: 4,
                question: "What is encapsulation in Java?",
                options: ["Hiding implementation details", "Creating objects", "Method overloading", "Exception handling"],
                correct: 0
            },
            {
                id: 5,
                question: "Which of these is NOT a principle of OOP?",
                options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
                correct: 3
            },
            {
                id: 6,
                question: "What is the super keyword used for in Java?",
                options: ["To call parent class constructor", "To create objects", "To handle exceptions", "To declare variables"],
                correct: 0
            },
            {
                id: 7,
                question: "Which method is called when an object is created?",
                options: ["main()", "start()", "constructor", "init()"],
                correct: 2
            },
            {
                id: 8,
                question: "What is polymorphism in Java?",
                options: ["Having multiple forms", "Creating classes", "Handling errors", "Writing methods"],
                correct: 0
            },
            {
                id: 9,
                question: "Which keyword is used to prevent inheritance in Java?",
                options: ["static", "final", "private", "abstract"],
                correct: 1
            },
            {
                id: 10,
                question: "What is the difference between abstract class and interface?",
                options: ["No difference", "Abstract class can have concrete methods", "Interface is faster", "Abstract class is newer"],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: "General Programming Knowledge",
        category: "general",
        difficulty: "medium",
        timeLimit: 12,
        description: "Test your overall programming knowledge across different concepts.",
        questions: [
            {
                id: 1,
                question: "What does API stand for?",
                options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Program Interface", "Application Process Interface"],
                correct: 0
            },
            {
                id: 2,
                question: "Which data structure follows Last In First Out (LIFO)?",
                options: ["Queue", "Stack", "Array", "Linked List"],
                correct: 1
            },
            {
                id: 3,
                question: "What does HTML stand for?",
                options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
                correct: 0
            },
            {
                id: 4,
                question: "Which of the following is a NoSQL database?",
                options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
                correct: 2
            },
            {
                id: 5,
                question: "What does CSS stand for?",
                options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
                correct: 2
            },
            {
                id: 6,
                question: "Which HTTP method is used to retrieve data?",
                options: ["POST", "PUT", "GET", "DELETE"],
                correct: 2
            },
            {
                id: 7,
                question: "What is the time complexity of binary search?",
                options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                correct: 1
            },
            {
                id: 8,
                question: "Which version control system is most popular?",
                options: ["SVN", "Git", "Mercurial", "CVS"],
                correct: 1
            },
            {
                id: 9,
                question: "What does MVC stand for?",
                options: ["Model View Controller", "Multiple View Container", "Modern Visual Component", "Master View Control"],
                correct: 0
            },
            {
                id: 10,
                question: "Which is the correct way to declare a constant in most programming languages?",
                options: ["var CONSTANT = 5", "const CONSTANT = 5", "constant CONSTANT = 5", "final CONSTANT = 5"],
                correct: 1
            }
        ]
    }
];

const sampleUsers = [
    { name: "John Smith", score: 95, time: "5:30", date: "2025-08-25" },
    { name: "Alice Johnson", score: 88, time: "7:45", date: "2025-08-24" },
    { name: "Bob Wilson", score: 82, time: "6:15", date: "2025-08-23" },
    { name: "Emma Davis", score: 78, time: "8:20", date: "2025-08-22" },
    { name: "Mike Brown", score: 75, time: "9:10", date: "2025-08-21" }
];

let userHistory = [];

// DOM Elements
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadQuizzes();
    loadLeaderboard();

    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateNavigation();
        loadUserHistory();
    }
});

// Event Listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            updateActiveNav(this);
        });
    });

    // Login button
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('createQuizForm').addEventListener('submit', handleCreateQuiz);

    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

// Navigation Functions
function showPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    // Load page-specific data
    if (pageId === 'profile' && currentUser) {
        loadUserProfile();
    } else if (pageId === 'admin' && currentUser && currentUser.isAdmin) {
        loadAdminData();
    }
}

function updateActiveNav(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateNavigation() {
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const profileLink = document.querySelector('.nav-link[data-page="profile"]');
    const adminLink = document.querySelector('.nav-link[data-page="admin"]');

    if (currentUser) {
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.name;
        profileLink.style.display = 'block';

        if (currentUser.isAdmin) {
            adminLink.style.display = 'block';
        }
    } else {
        loginBtn.style.display = 'block';
        userInfo.style.display = 'none';
        profileLink.style.display = 'none';
        adminLink.style.display = 'none';
    }
}

// Authentication Functions
function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function showRegisterModal() {
    closeModal('loginModal');
    document.getElementById('registerModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    // Reset editing state when closing modals
    if (modalId === 'editQuizModal' || modalId === 'createQuizModal') {
        editingQuizId = null;
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation (in real app, this would be server-side)
    if (email && password) {
        // UPDATED ADMIN CREDENTIALS: admin@123 / admin@123
        const user = {
            id: Date.now(),
            name: email === 'admin@123' ? 'Admin User' : extractNameFromEmail(email),
            email: email,
            isAdmin: email === 'admin@123' && password === 'admin@123'
        };

        // Check admin credentials
        if (email === 'admin@123' && password !== 'admin@123') {
            showToast('Invalid admin password!', 'error');
            return;
        }

        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));

        updateNavigation();
        closeModal('loginModal');
        showToast('Login successful!', 'success');

        // Reset form
        document.getElementById('loginForm').reset();

        // Redirect based on role
        if (user.isAdmin) {
            showPage('admin');
        } else {
            showPage('quizzes');
        }
    } else {
        showToast('Please fill in all fields', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (name && email && password) {
        const user = {
            id: Date.now(),
            name: name,
            email: email,
            isAdmin: false
        };

        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));

        updateNavigation();
        closeModal('registerModal');
        showToast('Registration successful!', 'success');

        // Reset form
        document.getElementById('registerForm').reset();
        showPage('quizzes');
    } else {
        showToast('Please fill in all fields', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    userHistory = [];
    updateNavigation();
    showPage('home');
    showToast('Logged out successfully', 'success');
}

function extractNameFromEmail(email) {
    return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Quiz Functions
function loadQuizzes() {
    const quizGrid = document.getElementById('quizGrid');
    quizGrid.innerHTML = '';

    sampleQuizzes.forEach(quiz => {
        const quizCard = createQuizCard(quiz);
        quizGrid.appendChild(quizCard);
    });
}

function createQuizCard(quiz) {
    const card = document.createElement('div');
    card.className = 'quiz-card';

    card.innerHTML = `
        <div class="quiz-header">
            <h3>${quiz.title}</h3>
            <span class="difficulty-badge ${quiz.difficulty}">${quiz.difficulty}</span>
        </div>
        <div class="quiz-meta">
            <span><i class="fas fa-tag"></i> ${quiz.category}</span>
            <span><i class="fas fa-clock"></i> ${quiz.timeLimit} min</span>
            <span><i class="fas fa-question"></i> ${quiz.questions.length} questions</span>
        </div>
        <div class="quiz-description">
            <p>${quiz.description}</p>
        </div>
        <div class="quiz-actions">
            <div class="quiz-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
            <button class="btn-primary" onclick="startQuiz(${quiz.id})">
                <i class="fas fa-play"></i> Start Quiz
            </button>
        </div>
    `;

    return card;
}

function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;

    let filteredQuizzes = sampleQuizzes;

    if (category) {
        filteredQuizzes = filteredQuizzes.filter(quiz => quiz.category === category);
    }

    if (difficulty) {
        filteredQuizzes = filteredQuizzes.filter(quiz => quiz.difficulty === difficulty);
    }

    const quizGrid = document.getElementById('quizGrid');
    quizGrid.innerHTML = '';

    filteredQuizzes.forEach(quiz => {
        const quizCard = createQuizCard(quiz);
        quizGrid.appendChild(quizCard);
    });

    showToast(`Found ${filteredQuizzes.length} quizzes`, 'success');
}

function startQuiz(quizId) {
    if (!currentUser) {
        showToast('Please login to start quiz', 'warning');
        showLoginModal();
        return;
    }

    currentQuiz = sampleQuizzes.find(q => q.id === quizId);
    if (!currentQuiz) {
        showToast('Quiz not found', 'error');
        return;
    }

    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = {};
    timeLeft = currentQuiz.timeLimit * 60;
    isQuizActive = true;

    showPage('quiz-taking');
    loadQuestion();
    startTimer();
    updateProgress();

    showToast(`Quiz "${currentQuiz.title}" started!`, 'success');
}

function loadQuestion() {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
        finishQuiz();
        return;
    }

    const question = currentQuiz.questions[currentQuestionIndex];

    // Update header
    document.getElementById('quizTitle').textContent = currentQuiz.title;
    document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQ').textContent = currentQuiz.questions.length;

    // Update question
    document.getElementById('questionText').textContent = question.question;

    // Update options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.onclick = () => selectOption(index);

        optionDiv.innerHTML = `
            <input type="radio" name="question" value="${index}">
            <span>${option}</span>
        `;

        optionsContainer.appendChild(optionDiv);
    });

    // Restore previous answer if exists
    const savedAnswer = userAnswers[question.id];
    if (savedAnswer !== undefined) {
        selectOption(savedAnswer);
    }

    updateQuizControls();
}

function selectOption(index) {
    const question = currentQuiz.questions[currentQuestionIndex];
    userAnswers[question.id] = index;

    // Update UI
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = i === index;
        if (i === index) {
            option.classList.add('selected');
        }
    });
}

function updateQuizControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.disabled = currentQuestionIndex === 0;

    const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;

    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        updateProgress();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function startTimer() {
    updateTimerDisplay();

    quizTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            finishQuiz();
            showToast('Time is up! Quiz submitted automatically.', 'warning');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timeLeft').textContent = 
        minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function submitQuiz() {
    if (confirm('Are you sure you want to submit the quiz?')) {
        finishQuiz();
    }
}

function finishQuiz() {
    if (!isQuizActive) return;

    isQuizActive = false;
    clearInterval(quizTimer);

    // Calculate results
    let correctCount = 0;
    const totalQuestions = currentQuiz.questions.length;

    currentQuiz.questions.forEach(question => {
        const userAnswer = userAnswers[question.id];
        if (userAnswer === question.correct) {
            correctCount++;
        }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const timeTakenSeconds = (currentQuiz.timeLimit * 60) - timeLeft;
    const timeTaken = Math.floor(timeTakenSeconds / 60) + ':' + 
                     (timeTakenSeconds % 60 < 10 ? '0' : '') + (timeTakenSeconds % 60);

    // Save to user history
    const attempt = {
        id: Date.now(),
        quizTitle: currentQuiz.title,
        category: currentQuiz.category,
        score: percentage,
        correct: correctCount,
        total: totalQuestions,
        time: timeTaken,
        date: new Date().toLocaleDateString()
    };

    userHistory.unshift(attempt);
    localStorage.setItem('userHistory_' + currentUser.id, JSON.stringify(userHistory));

    // Display results
    document.getElementById('scorePercent').textContent = percentage + '%';
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = totalQuestions - correctCount;
    document.getElementById('timeTaken').textContent = timeTaken;

    showPage('results');

    // Add to leaderboard (simulate)
    sampleUsers.unshift({
        name: currentUser.name,
        score: percentage,
        time: timeTaken,
        date: new Date().toLocaleDateString()
    });

    showToast(`Quiz completed! You scored ${percentage}%`, 
              percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'error');
}

// Leaderboard Functions
function loadLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';

    // Sort by score (descending)
    const sortedUsers = [...sampleUsers].sort((a, b) => b.score - a.score);

    sortedUsers.slice(0, 10).forEach((user, index) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';

        let rankClass = '';
        if (index === 0) rankClass = 'gold';
        else if (index === 1) rankClass = 'silver';
        else if (index === 2) rankClass = 'bronze';

        row.innerHTML = `
            <div class="rank ${rankClass}">${index + 1}</div>
            <div>${user.name}</div>
            <div>${user.score}%</div>
            <div>${user.time}</div>
            <div>${user.date}</div>
        `;

        leaderboardBody.appendChild(row);
    });
}

// Profile Functions
function loadUserProfile() {
    if (!currentUser) return;

    loadUserHistory();

    // Calculate stats
    const totalQuizzes = userHistory.length;
    const avgScore = totalQuizzes > 0 ? 
        Math.round(userHistory.reduce((sum, attempt) => sum + attempt.score, 0) / totalQuizzes) : 0;
    const bestScore = totalQuizzes > 0 ? 
        Math.max(...userHistory.map(attempt => attempt.score)) : 0;

    document.getElementById('totalQuizzes').textContent = totalQuizzes;
    document.getElementById('avgScore').textContent = avgScore + '%';
    document.getElementById('bestScore').textContent = bestScore + '%';

    // Load history
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    userHistory.slice(0, 10).forEach(attempt => {
        const item = document.createElement('div');
        item.className = 'history-item';

        item.innerHTML = `
            <div>
                <strong>${attempt.quizTitle}</strong>
                <br>
                <small>${attempt.category} • ${attempt.date}</small>
            </div>
            <div>
                <strong>${attempt.score}%</strong>
                <br>
                <small>${attempt.correct}/${attempt.total} • ${attempt.time}</small>
            </div>
        `;

        historyList.appendChild(item);
    });
}

function loadUserHistory() {
    if (currentUser) {
        const saved = localStorage.getItem('userHistory_' + currentUser.id);
        userHistory = saved ? JSON.parse(saved) : [];
    }
}

// Admin Functions
function loadAdminData() {
    if (!currentUser || !currentUser.isAdmin) return;

    // Load quiz management
    loadAdminQuizzes();

    // Load user management (simplified)
    loadAdminUsers();

    // Load analytics
    loadAnalytics();
}

function loadAdminQuizzes() {
    const adminQuizList = document.getElementById('adminQuizList');
    adminQuizList.innerHTML = '';

    sampleQuizzes.forEach(quiz => {
        const row = document.createElement('div');
        row.className = 'admin-row';

        row.innerHTML = `
            <div>${quiz.title}</div>
            <div>${quiz.category}</div>
            <div>${quiz.questions.length}</div>
            <div class="difficulty-badge ${quiz.difficulty}">${quiz.difficulty}</div>
            <div class="action-buttons">
                <button class="btn-edit" onclick="editQuiz(${quiz.id})" title="Edit Quiz">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteQuiz(${quiz.id})" title="Delete Quiz">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        adminQuizList.appendChild(row);
    });
}

function loadAdminUsers() {
    const adminUserList = document.getElementById('adminUserList');
    adminUserList.innerHTML = '';

    // Sample user data
    const users = [
        { name: 'John Smith', email: 'john@example.com', quizzes: 15, avgScore: 85, joinDate: '2025-01-15' },
        { name: 'Alice Johnson', email: 'alice@example.com', quizzes: 12, avgScore: 92, joinDate: '2025-02-03' },
        { name: 'Bob Wilson', email: 'bob@example.com', quizzes: 8, avgScore: 78, joinDate: '2025-02-20' }
    ];

    users.forEach(user => {
        const row = document.createElement('div');
        row.className = 'admin-row';

        row.innerHTML = `
            <div>${user.name}</div>
            <div>${user.email}</div>
            <div>${user.quizzes}</div>
            <div>${user.avgScore}%</div>
            <div>${user.joinDate}</div>
        `;

        adminUserList.appendChild(row);
    });
}

function loadAnalytics() {
    document.getElementById('totalQuizzesCount').textContent = sampleQuizzes.length;
    document.getElementById('totalUsersCount').textContent = '25';
    document.getElementById('totalAttemptsCount').textContent = '143';
    document.getElementById('globalAvgScore').textContent = '78%';
}

function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabId).classList.add('active');

    // Add active to clicked button
    event.target.classList.add('active');
}

function showCreateQuizModal() {
    editingQuizId = null; // Reset editing state
    document.getElementById('createQuizModal').classList.add('active');
    // Change modal title for create mode
    document.querySelector('#createQuizModal .modal-header h3').textContent = 'Create New Quiz';
    // Clear form
    document.getElementById('createQuizForm').reset();
    document.getElementById('questionsContainer').innerHTML = '';
    // Add first question by default
    setTimeout(addQuestion, 100);
}

// EDIT FUNCTIONALITY - COMPLETE IMPLEMENTATION
function editQuiz(quizId) {
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    if (!quiz) {
        showToast('Quiz not found!', 'error');
        return;
    }

    editingQuizId = quizId;

    // Show the same modal but populate with existing data
    document.getElementById('createQuizModal').classList.add('active');

    // Change modal title for edit mode
    document.querySelector('#createQuizModal .modal-header h3').textContent = 'Edit Quiz';

    // Populate form fields
    document.getElementById('quizTitleInput').value = quiz.title;
    document.getElementById('quizCategoryInput').value = quiz.category;
    document.getElementById('quizDifficultyInput').value = quiz.difficulty;
    document.getElementById('quizTimeInput').value = quiz.timeLimit;

    // Clear existing questions container
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    // Add existing questions
    quiz.questions.forEach((question, index) => {
        addQuestion();
        const questionItem = questionsContainer.children[index];

        // Populate question text
        const questionTextarea = questionItem.querySelector('textarea');
        questionTextarea.value = question.question;

        // Populate options
        const optionInputs = questionItem.querySelectorAll('input[type="text"]');
        const correctRadios = questionItem.querySelectorAll('input[type="radio"]');

        question.options.forEach((option, optionIndex) => {
            if (optionInputs[optionIndex]) {
                optionInputs[optionIndex].value = option;
            }
        });

        // Set correct answer
        if (correctRadios[question.correct]) {
            correctRadios[question.correct].checked = true;
        }
    });

    showToast(`Editing quiz: ${quiz.title}`, 'warning');
}

function handleEditQuiz(e) {
    e.preventDefault();

    const title = document.getElementById('quizTitleInput').value;
    const category = document.getElementById('quizCategoryInput').value;
    const difficulty = document.getElementById('quizDifficultyInput').value;
    const timeLimit = document.getElementById('quizTimeInput').value;

    // Collect questions
    const questionItems = document.querySelectorAll('.question-item');
    const questions = [];

    questionItems.forEach((item, index) => {
        const questionText = item.querySelector('textarea').value;
        const options = Array.from(item.querySelectorAll('input[type="text"]')).map(input => input.value);
        const correct = parseInt(item.querySelector('input[type="radio"]:checked')?.value || 0);

        questions.push({
            id: index + 1,
            question: questionText,
            options: options,
            correct: correct
        });
    });

    // Find and update the quiz
    const quizIndex = sampleQuizzes.findIndex(q => q.id === editingQuizId);
    if (quizIndex > -1) {
        sampleQuizzes[quizIndex] = {
            ...sampleQuizzes[quizIndex],
            title: title,
            category: category,
            difficulty: difficulty,
            timeLimit: parseInt(timeLimit),
            description: `Updated quiz: ${title}`,
            questions: questions
        };

        loadQuizzes();
        loadAdminQuizzes();
        closeModal('createQuizModal');
        showToast('Quiz updated successfully!', 'success');

        // Reset form
        document.getElementById('createQuizForm').reset();
        document.getElementById('questionsContainer').innerHTML = '';
        editingQuizId = null;
    } else {
        showToast('Error updating quiz!', 'error');
    }
}

function addQuestion() {
    const container = document.getElementById('questionsContainer');
    const questionCount = container.children.length + 1;

    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';

    questionDiv.innerHTML = `
        <div class="question-header">
            <span class="question-number">Question ${questionCount}</span>
            <button type="button" class="remove-question" onclick="removeQuestion(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="form-group">
            <label>Question:</label>
            <textarea rows="2" required></textarea>
        </div>
        <div class="form-group">
            <label>Options:</label>
            <div class="options-grid">
                <div class="option-input">
                    <input type="radio" name="correct_${questionCount}" value="0">
                    <input type="text" placeholder="Option A" required>
                </div>
                <div class="option-input">
                    <input type="radio" name="correct_${questionCount}" value="1">
                    <input type="text" placeholder="Option B" required>
                </div>
                <div class="option-input">
                    <input type="radio" name="correct_${questionCount}" value="2">
                    <input type="text" placeholder="Option C" required>
                </div>
                <div class="option-input">
                    <input type="radio" name="correct_${questionCount}" value="3">
                    <input type="text" placeholder="Option D" required>
                </div>
            </div>
        </div>
    `;

    container.appendChild(questionDiv);
}

function removeQuestion(btn) {
    const container = document.getElementById('questionsContainer');
    if (container.children.length > 1) {
        btn.closest('.question-item').remove();
        // Update question numbers
        Array.from(container.children).forEach((item, index) => {
            const numberSpan = item.querySelector('.question-number');
            numberSpan.textContent = `Question ${index + 1}`;

            // Update radio button names to ensure uniqueness
            const radios = item.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                radio.name = `correct_${index + 1}`;
            });
        });
    } else {
        showToast('At least one question is required', 'warning');
    }
}

function handleCreateQuiz(e) {
    e.preventDefault();

    // Check if we're editing or creating
    if (editingQuizId) {
        handleEditQuiz(e);
        return;
    }

    const title = document.getElementById('quizTitleInput').value;
    const category = document.getElementById('quizCategoryInput').value;
    const difficulty = document.getElementById('quizDifficultyInput').value;
    const timeLimit = document.getElementById('quizTimeInput').value;

    // Collect questions
    const questionItems = document.querySelectorAll('.question-item');
    const questions = [];

    questionItems.forEach((item, index) => {
        const questionText = item.querySelector('textarea').value;
        const options = Array.from(item.querySelectorAll('input[type="text"]')).map(input => input.value);
        const correct = parseInt(item.querySelector('input[type="radio"]:checked')?.value || 0);

        questions.push({
            id: index + 1,
            question: questionText,
            options: options,
            correct: correct
        });
    });

    const newQuiz = {
        id: sampleQuizzes.length + 1,
        title: title,
        category: category,
        difficulty: difficulty,
        timeLimit: parseInt(timeLimit),
        description: `Custom quiz: ${title}`,
        questions: questions
    };

    sampleQuizzes.unshift(newQuiz);
    loadQuizzes();
    loadAdminQuizzes();
    closeModal('createQuizModal');
    showToast('Quiz created successfully!', 'success');

    // Reset form
    document.getElementById('createQuizForm').reset();
    document.getElementById('questionsContainer').innerHTML = '';
}

function deleteQuiz(quizId) {
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    if (!quiz) {
        showToast('Quiz not found!', 'error');
        return;
    }

    if (confirm(`Are you sure you want to delete the quiz "${quiz.title}"?\n\nThis action cannot be undone.`)) {
        const index = sampleQuizzes.findIndex(q => q.id === quizId);
        if (index > -1) {
            sampleQuizzes.splice(index, 1);
            loadQuizzes();
            loadAdminQuizzes();
            showToast('Quiz deleted successfully!', 'success');
        }
    }
}

// Utility Functions
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle'
    };

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type]}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

// Initialize sample data on first run
if (!localStorage.getItem('quizInitialized')) {
    localStorage.setItem('quizInitialized', 'true');
    console.log('Quiz by Yogesh initialized successfully!');
    console.log('Created and Developed by Yogeshwar Yadav for IT Developer Company');
    console.log('Admin Login: admin@123 / admin@123');
}
class AuthSystem {
    constructor() {
        this.checkLoginStatus();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form submission
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Register form submission
        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Toggle between login and register forms
        document.getElementById('showRegister')?.addEventListener('click', () => {
            document.querySelector('.login-box').style.display = 'none';
            document.querySelector('.register-box').style.display = 'block';
        });

        document.getElementById('showLogin')?.addEventListener('click', () => {
            document.querySelector('.register-box').style.display = 'none';
            document.querySelector('.login-box').style.display = 'block';
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = this.getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', username);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    }

    handleRegister() {
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const users = this.getUsers();
        if (users.some(u => u.username === username)) {
            alert('Username already exists');
            return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');

        // Switch to login form
        document.querySelector('.register-box').style.display = 'none';
        document.querySelector('.login-box').style.display = 'block';
    }

    getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentPath = window.location.pathname;

        if (!isLoggedIn && !currentPath.includes('login.html')) {
            window.location.href = 'login.html';
        } else if (isLoggedIn && currentPath.includes('login.html')) {
            window.location.href = 'index.html';
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = 'login.html';
    }
}

// for Authentication 
const auth = {
    logout: function () {
        localStorage.removeItem('currentUser');
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = 'login.html';
    },

    checkAuth: function () {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
        return isLoggedIn;
    }
};

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', function () {

    if (!window.location.href.includes('login.html')) {
        auth.checkAuth();
    }
});


document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const loginBox = document.querySelector('.login-box');
    const registerBox = document.querySelector('.register-box');


    showRegisterLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    });

    showLoginLink.addEventListener('click', function (e) {
        e.preventDefault();
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
    });


    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;


        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }


        let users = JSON.parse(localStorage.getItem('users')) || [];


        if (users.some(user => user.username === newUsername)) {
            alert('Username already exists!');
            return;
        }


        users.push({
            username: newUsername,
            password: newPassword // In a real application, this should be hashed
        });


        localStorage.setItem('users', JSON.stringify(users));


        registerForm.reset();


        alert('Registration successful! Please login.');
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
    });


    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;


        const users = JSON.parse(localStorage.getItem('users')) || [];


        const user = users.find(u => u.username === username && u.password === password);

        if (user) {

            localStorage.setItem('currentUser', username);
            localStorage.setItem('isLoggedIn', 'true');


            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password!');
        }
    });


    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        window.location.href = 'index.html';
    }
});
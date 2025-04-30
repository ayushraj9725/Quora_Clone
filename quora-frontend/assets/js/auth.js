import api from '../api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await api.login(email, password);
                
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    window.location.href = '../home/index.html';
                } else {
                    alert(response.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login');
            }
        });
    }
    
    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            try {
                const response = await api.signup(userData);
                
                if (response.success) {
                    alert('Account created successfully! Please login.');
                    window.location.href = '../auth/login.html';
                } else {
                    alert(response.message || 'Signup failed');
                }
            } catch (error) {
                console.error('Signup error:', error);
                alert('An error occurred during signup');
            }
        });
    }
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token && (window.location.pathname.includes('login.html') || 
                  window.location.pathname.includes('signup.html'))) {
        window.location.href = '../home/index.html';
    }
});
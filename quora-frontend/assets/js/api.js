const API_BASE_URL = 'http://localhost:8080/api';

const api = {
    // Authentication
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    },

    signup: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    },

    // Questions
    getQuestions: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_BASE_URL}/questions?page=${page}&limit=${limit}`);
        return await response.json();
    },

    getQuestion: async (id) => {
        const response = await fetch(`${API_BASE_URL}/questions/${id}`);
        return await response.json();
    },

    createQuestion: async (questionData) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(questionData)
        });
        return await response.json();
    },

    // Answers
    createAnswer: async (questionId, answerData) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/questions/${questionId}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(answerData)
        });
        return await response.json();
    },

    // Users
    getUserProfile: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        return await response.json();
    },

    updateUserProfile: async (userId, userData) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    },

    // Spaces
    getSpaces: async () => {
        const response = await fetch(`${API_BASE_URL}/spaces`);
        return await response.json();
    },

    getSpace: async (spaceId) => {
        const response = await fetch(`${API_BASE_URL}/spaces/${spaceId}`);
        return await response.json();
    },

    // Notifications
    getNotifications: async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/notifications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
};

export default api;
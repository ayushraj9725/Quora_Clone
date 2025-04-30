import api from '../api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
        return;
    }

    // Load notifications
    const notificationsList = document.getElementById('notificationsList');
    if (notificationsList) {
        try {
            const notifications = await api.getNotifications();
            renderNotifications(notifications);
        } catch (error) {
            console.error('Error loading notifications:', error);
            notificationsList.innerHTML = '<p>Error loading notifications</p>';
        }
    }
});

function renderNotifications(notifications) {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;

    notificationsList.innerHTML = '';

    if (notifications.length === 0) {
        notificationsList.innerHTML = '<p>No notifications</p>';
        return;
    }

    notifications.forEach(notification => {
        const notificationEl = document.createElement('div');
        notificationEl.className = `notification-item ${notification.unread ? 'notification-unread' : ''}`;
        notificationEl.innerHTML = `
            <img src="../assets/images/default-avatar.jpg" alt="${notification.sender.name}" class="notification-avatar">
            <div class="notification-content">
                <div class="notification-text">${notification.message}</div>
                <div class="notification-time">${formatTime(notification.createdAt)}</div>
            </div>
        `;
        notificationsList.appendChild(notificationEl);
    });
}

function formatTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
}
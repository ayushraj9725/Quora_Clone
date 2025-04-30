import api from '../api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
        return;
    }

    // Load user profile
    const profileName = document.getElementById('profileName');
    const profileBio = document.getElementById('profileBio');
    const answersCount = document.getElementById('answersCount');
    const questionsCount = document.getElementById('questionsCount');
    const followersCount = document.getElementById('followersCount');
    
    if (profileName) {
        try {
            // Get user ID from URL or use current user
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('id') || JSON.parse(localStorage.getItem('user')).id;
            
            const user = await api.getUserProfile(userId);
            
            profileName.textContent = user.name;
            profileBio.textContent = user.bio || 'No bio yet';
            answersCount.textContent = user.answersCount || 0;
            questionsCount.textContent = user.questionsCount || 0;
            followersCount.textContent = user.followersCount || 0;
            
            // TODO: Load profile content (answers/questions)
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }

    // Edit profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        // Load current user data
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const currentUser = await api.getUserProfile(user.id);
            
            document.getElementById('name').value = currentUser.name;
            document.getElementById('bio').value = currentUser.bio || '';
            document.getElementById('location').value = currentUser.location || '';
            document.getElementById('website').value = currentUser.website || '';
        } catch (error) {
            console.error('Error loading user data:', error);
        }

        // Avatar upload preview
        const avatarUpload = document.getElementById('avatarUpload');
        const avatarPreview = document.getElementById('avatarPreview');
        
        avatarUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    avatarPreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Form submission
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userData = {
                name: document.getElementById('name').value,
                bio: document.getElementById('bio').value,
                location: document.getElementById('location').value,
                website: document.getElementById('website').value
            };
            
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const response = await api.updateUserProfile(user.id, userData);
                
                if (response.success) {
                    // Update local user data
                    localStorage.setItem('user', JSON.stringify({
                        ...user,
                        ...userData
                    }));
                    
                    alert('Profile updated successfully');
                    window.location.href = 'view.html';
                } else {
                    alert(response.message || 'Failed to update profile');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('An error occurred while updating the profile');
            }
        });
    }
});
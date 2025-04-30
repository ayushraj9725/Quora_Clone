import api from '../api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
        return;
    }

    // Load spaces list
    const spacesGrid = document.getElementById('spacesGrid');
    if (spacesGrid) {
        try {
            const spaces = await api.getSpaces();
            renderSpaces(spaces);
        } catch (error) {
            console.error('Error loading spaces:', error);
            spacesGrid.innerHTML = '<p>Error loading spaces</p>';
        }
    }

    // Load space detail
    const spaceDetail = document.getElementById('spaceDetail');
    if (spaceDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const spaceId = urlParams.get('id');
        
        if (spaceId) {
            try {
                const space = await api.getSpace(spaceId);
                renderSpaceDetail(space);
                
                // TODO: Load space questions
            } catch (error) {
                console.error('Error loading space:', error);
                spaceDetail.innerHTML = '<p>Error loading space</p>';
            }
        } else {
            spaceDetail.innerHTML = '<p>Space not found</p>';
        }
    }
});

function renderSpaces(spaces) {
    const spacesGrid = document.getElementById('spacesGrid');
    if (!spacesGrid) return;

    spacesGrid.innerHTML = '';

    if (spaces.length === 0) {
        spacesGrid.innerHTML = '<p>No spaces found</p>';
        return;
    }

    spaces.forEach(space => {
        const spaceEl = document.createElement('div');
        spaceEl.className = 'space-card';
        spaceEl.innerHTML = `
            <img src="../../assets/images/space-avatar.jpg" alt="${space.name}" class="space-avatar">
            <h3 class="space-name">${space.name}</h3>
            <p class="space-description">${space.description}</p>
            <div class="space-members">${space.membersCount} members</div>
        `;
        spaceEl.addEventListener('click', () => {
            window.location.href = `detail.html?id=${space.id}`;
        });
        spacesGrid.appendChild(spaceEl);
    });
}

function renderSpaceDetail(space) {
    const spaceDetail = document.getElementById('spaceDetail');
    if (!spaceDetail) return;

    spaceDetail.innerHTML = `
        <div class="space-detail-header">
            <img src="../../assets/images/space-avatar.jpg" alt="${space.name}" class="space-detail-avatar">
            <div class="space-detail-info">
                <h1 class="space-detail-name">${space.name}</h1>
                <p class="space-detail-description">${space.description}</p>
                <div class="space-detail-stats">
                    <span class="space-detail-stat">${space.membersCount} members</span>
                    <span class="space-detail-stat">${space.questionsCount} questions</span>
                </div>
                <div class="space-detail-actions">
                    <button class="btn btn-primary">Join Space</button>
                </div>
            </div>
        </div>
    `;
}
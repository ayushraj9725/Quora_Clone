import api from '../api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
        return;
    }

    // Load questions
    try {
        const questions = await api.getQuestions();
        renderQuestions(questions);
    } catch (error) {
        console.error('Error loading questions:', error);
    }

    // Load spaces
    try {
        const spaces = await api.getSpaces();
        renderSpaces(spaces);
    } catch (error) {
        console.error('Error loading spaces:', error);
    }

    // Ask question button
    const askQuestionBtn = document.querySelector('.ask-question-footer .btn');
    if (askQuestionBtn) {
        askQuestionBtn.addEventListener('click', () => {
            window.location.href = '../question/ask.html';
        });
    }
});

function renderQuestions(questions) {
    const questionsList = document.getElementById('questionsList');
    if (!questionsList) return;

    questionsList.innerHTML = '';

    if (questions.length === 0) {
        questionsList.innerHTML = '<p>No questions found</p>';
        return;
    }

    questions.forEach(question => {
        const questionEl = document.createElement('div');
        questionEl.className = 'question-card';
        questionEl.innerHTML = `
            <div class="question-header">
                <img src="../../assets/images/default-avatar.jpg" alt="${question.user.name}" class="user-avatar" width="32">
                <span class="question-user">${question.user.name}</span>
            </div>
            <h3 class="question-title">${question.title}</h3>
            <div class="question-content">${question.content}</div>
            <div class="question-actions">
                <button class="action-btn">
                    <img src="../../assets/images/upvote-icon.png" alt="Upvote" width="16">
                    <span>${question.upvotes}</span>
                </button>
                <button class="action-btn">
                    <img src="../../assets/images/downvote-icon.png" alt="Downvote" width="16">
                </button>
                <button class="action-btn">
                    <img src="../../assets/images/comment-icon.png" alt="Comment" width="16">
                    <span>${question.answersCount} answers</span>
                </button>
                <button class="action-btn">
                    <img src="../../assets/images/share-icon.png" alt="Share" width="16">
                </button>
            </div>
        `;

        questionEl.addEventListener('click', () => {
            window.location.href = `../question/detail.html?id=${question.id}`;
        });

        questionsList.appendChild(questionEl);
    });
}

function renderSpaces(spaces) {
    const spacesList = document.getElementById('spacesList');
    if (!spacesList) return;

    spacesList.innerHTML = '';

    if (spaces.length === 0) {
        spacesList.innerHTML = '<p>No spaces found</p>';
        return;
    }

    spaces.slice(0, 5).forEach(space => {
        const spaceEl = document.createElement('div');
        spaceEl.className = 'space-item';
        spaceEl.innerHTML = `
            <img src="../../assets/images/space-avatar.jpg" alt="${space.name}" class="space-avatar">
            <span class="space-name">${space.name}</span>
        `;
        spaceEl.addEventListener('click', () => {
            window.location.href = `../spaces/detail.html?id=${space.id}`;
        });
        spacesList.appendChild(spaceEl);
    });
}
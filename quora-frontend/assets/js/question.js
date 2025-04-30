import api from '../api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../auth/login.html';
        return;
    }

    // Ask question form
    const askQuestionForm = document.getElementById('askQuestionForm');
    if (askQuestionForm) {
        askQuestionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const title = document.getElementById('questionTitle').value;
            const content = document.getElementById('questionDetails').value;
            const topics = document.getElementById('questionTopics').value.split(',').map(t => t.trim());
            
            try {
                const response = await api.createQuestion({
                    title,
                    content,
                    topics
                });
                
                if (response.id) {
                    window.location.href = `detail.html?id=${response.id}`;
                } else {
                    alert(response.message || 'Failed to create question');
                }
            } catch (error) {
                console.error('Error creating question:', error);
                alert('An error occurred while creating the question');
            }
        });
    }

    // Load question detail
    const questionDetail = document.getElementById('questionDetail');
    if (questionDetail) {
        const urlParams = new URLSearchParams(window.location.search);
        const questionId = urlParams.get('id');
        
        if (questionId) {
            try {
                const question = await api.getQuestion(questionId);
                renderQuestionDetail(question);
                
                // Load answers
                const answersList = document.getElementById('answersList');
                if (answersList && question.answers) {
                    renderAnswers(question.answers);
                }
            } catch (error) {
                console.error('Error loading question:', error);
                questionDetail.innerHTML = '<p>Error loading question</p>';
            }
        } else {
            questionDetail.innerHTML = '<p>Question not found</p>';
        }
    }

    // Add answer form
    const addAnswerForm = document.getElementById('addAnswerForm');
    if (addAnswerForm) {
        addAnswerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const urlParams = new URLSearchParams(window.location.search);
            const questionId = urlParams.get('id');
            const content = addAnswerForm.querySelector('textarea').value;
            
            if (!questionId) return;
            
            try {
                const response = await api.createAnswer(questionId, { content });
                
                if (response.id) {
                    // Reload the page to show the new answer
                    window.location.reload();
                } else {
                    alert(response.message || 'Failed to post answer');
                }
            } catch (error) {
                console.error('Error posting answer:', error);
                alert('An error occurred while posting the answer');
            }
        });
    }
});

function renderQuestionDetail(question) {
    const questionDetail = document.getElementById('questionDetail');
    if (!questionDetail) return;

    questionDetail.innerHTML = `
        <div class="question-detail-header">
            <img src="../../assets/images/default-avatar.jpg" alt="${question.user.name}" class="user-avatar" width="40">
            <span class="question-user">${question.user.name}</span>
        </div>
        <h1 class="question-detail-title">${question.title}</h1>
        <div class="question-detail-content">${question.content}</div>
        <div class="question-detail-actions">
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
}

function renderAnswers(answers) {
    const answersList = document.getElementById('answersList');
    if (!answersList) return;

    answersList.innerHTML = '';

    if (answers.length === 0) {
        answersList.innerHTML = '<p>No answers yet</p>';
        return;
    }

    answers.forEach(answer => {
        const answerEl = document.createElement('div');
        answerEl.className = 'answer-card';
        answerEl.innerHTML = `
            <div class="answer-header">
                <img src="../../assets/images/default-avatar.jpg" alt="${answer.user.name}" class="user-avatar" width="32">
                <span class="answer-user">${answer.user.name}</span>
            </div>
            <div class="answer-content">${answer.content}</div>
            <div class="answer-actions">
                <button class="action-btn">
                    <img src="../../assets/images/upvote-icon.png" alt="Upvote" width="16">
                    <span>${answer.upvotes}</span>
                </button>
                <button class="action-btn">
                    <img src="../../assets/images/downvote-icon.png" alt="Downvote" width="16">
                </button>
                <button class="action-btn">
                    <img src="../../assets/images/comment-icon.png" alt="Comment" width="16">
                </button>
            </div>
        `;
        answersList.appendChild(answerEl);
    });
}
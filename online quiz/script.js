let quizzes = [];
let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = [];

document.getElementById('create-quiz').onclick = () => {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('quiz-creation').classList.remove('hidden');
};

document.getElementById('add-question').onclick = () => {
    const questionsDiv = document.getElementById('questions');
    const questionCount = questionsDiv.children.length + 1;
    questionsDiv.innerHTML += `
        <div>
            <input type="text" placeholder="Question ${questionCount}" required>
            <input type="text" placeholder="Option A" required>
            <input type="text" placeholder="Option B" required>
            <input type="text" placeholder="Option C" required>
            <input type="text" placeholder="Option D" required>
            <input type="text" placeholder="Correct Answer" required>
        </div>
    `;
};

document.getElementById('quiz-form').onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('quiz-title').value;
    const questionsDiv = document.getElementById('questions');
    const questions = Array.from(questionsDiv.children).map(q => {
        const inputs = q.querySelectorAll('input');
        return {
            question: inputs[0].value,
            options: [
                inputs[1].value,
                inputs[2].value,
                inputs[3].value,
                inputs[4].value
            ],
            correctAnswer: inputs[5].value
        };
    });
    
    quizzes.push({ title, questions });
    alert('Quiz created successfully!');
    document.getElementById('quiz-creation').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
};

document.getElementById('take-quiz').onclick = () => {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('quiz-taking').classList.remove('hidden');
    displayQuiz();
};

function displayQuiz() {
    const quiz = quizzes[currentQuizIndex];
    document.getElementById('quiz-title-taking').innerText = quiz.title;
    userAnswers = [];
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    const quiz = quizzes[currentQuizIndex];
    const question = quiz.questions[currentQuestionIndex];
    document.getElementById('quiz-questions').innerHTML = `
        <p>${question.question}</p>
        ${question.options.map((option, index) => `<label><input type="radio" name="answer" value="${option}">${option}</label><br>`).join('')}
    `;
}

document.getElementById('next-question').onclick = () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers.push(selectedAnswer.value);
        currentQuestionIndex++;
        if (currentQuestionIndex < quizzes[currentQuizIndex].questions.length) {
            showQuestion();
        } else {
            calculateResults();
        }
    } else {
        alert('Please select an answer.');
    }
};

document.getElementById('submit-quiz').onclick = () => {
    calculateResults();
};

function calculateResults() {
    const quiz = quizzes[currentQuizIndex];
    let score = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
            score++;
        }
    });

    document.getElementById('score').innerText = `You scored ${score} out of ${quiz.questions.length}.`;
    document.getElementById('quiz-taking').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
}

document.getElementById('back-to-home').onclick = () => {
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
};

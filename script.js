const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Hyperlinks and Text Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which company developed React?",
        options: ["Google", "Facebook", "Microsoft", "Apple"],
        answer: "Facebook"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "22"],
        answer: "4"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const quizEl = document.getElementById("quiz");

function loadQuestion() {
    selectedAnswer = null;
    const q = questions[currentQuestion];
    questionEl.innerText = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.onclick = () => selectOption(button, option);
        optionsEl.appendChild(button);
    });
}

function selectOption(button, option) {
    if (selectedAnswer) return; // prevent multiple selection

    selectedAnswer = option;
    const correct = questions[currentQuestion].answer;

    // Highlight correct and wrong
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        if (btn.innerText === correct) {
            btn.classList.add("correct");
        } else if (btn.innerText === option && option !== correct) {
            btn.classList.add("wrong");
        }
        btn.disabled = true;
    });

    if (option === correct) {
        score++;
    }
}

function nextQuestion() {
    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizEl.classList.add("hidden");
    resultEl.classList.remove("hidden");
    scoreEl.innerText = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add("hidden");
    quizEl.classList.remove("hidden");
    loadQuestion();
}

// Start the quiz
loadQuestion();
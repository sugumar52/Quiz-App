const questions = [
    {
        question: "What does HTML stand for?  [HTML]",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Marketing Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Markup Level", correct: false },
        ]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?  [HTML]",
        answers: [
            { text: "<style>", correct: true },
            { text: "<script>", correct: false },
            { text: "<css>", correct: false },
            { text: "<link>", correct: false },
        ]
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?  [HTML]",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false },
        ]
    },
    {
        question: "What is the correct HTML tag for inserting a line break?  [HTML]",
        answers: [
            { text: "<lb>", correct: false },
            { text: "<break>", correct: false },
            { text: "<line>", correct: false },
            { text: "<br>", correct: true },
        ]
    },
    {
        question: "Which attribute is used to provide alternate text for an image?  [HTML]",
        answers: [
            { text: "title", correct: false },
            { text: "alt", correct: true },
            { text: "src", correct: false },
            { text: "longdesc", correct: false },
        ]
    },
    {
        question: "Which HTML tag is used to define a table row?  [HTML]",
        answers: [
            { text: "<tr>", correct: true },
            { text: "<table>", correct: false },
            { text: "<td>", correct: false },
            { text: "<th>", correct: false },
        ]
    },
    {
        question: "What is the correct way to start an HTML document?  [HTML]",
        answers: [
            { text: "<html>", correct: false },
            { text: "<head>", correct: false },
            { text: "<!DOCTYPE html>", correct: true },
            { text: "<body>", correct: false },
        ]
    },
    {
        question: "Which tag is used to define a list item?  [HTML]",
        answers: [
            { text: "<list>", correct: false },
            { text: "<ul>", correct: false },
            { text: "<li>", correct: true },
            { text: "<item>", correct: false },
        ]
    },
    {
        question: "How can you make a numbered list in HTML?  [HTML]",
        answers: [
            { text: "<ol>", correct: true },
            { text: "<ul>", correct: false },
            { text: "<dl>", correct: false },
            { text: "<list>", correct: false },
        ]
    },
    {
        question: "Which tag is used to display a checkbox in HTML forms?  [HTML]",
        answers: [
            { text: "<input type=\"checkbox\">", correct: true },
            { text: "<checkbox>", correct: false },
            { text: "<check>", correct: false },
            { text: "<box>", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;

        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(sa) {
    const selectedBtn = sa.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

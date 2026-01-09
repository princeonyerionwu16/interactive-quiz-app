// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");

const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

const progressBar = document.getElementById("progress");

const usernameInput = document.getElementById("username");
const leaderboardList = document.getElementById("leaderboard-list");
const clearLeaderboardBtn = document.getElementById("clear-leaderboard");



// Quiz questions
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "Which tag is used to create a link in HTML?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<a>", correct: true },
      { text: "<href>", correct: false },
      { text: "<url>", correct: false },
    ],
  },
  {
    question: "Which property is used to change text color in CSS?",
    answers: [
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "text-color", correct: false },
      { text: "background-color", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "<!-- -->", correct: false },
      { text: "#", correct: false },
      { text: "**", correct: false },
    ],
  },
  {
    question: "Which keyword declares a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "int", correct: false },
      { text: "string", correct: false },
      { text: "declare", correct: false },
    ],
  },
  {
    question: "Which method is used to print output in JavaScript?",
    answers: [
      { text: "console.log()", correct: true },
      { text: "print()", correct: false },
      { text: "echo()", correct: false },
      { text: "log()", correct: false },
    ],
  },
  {
    question: "Which HTML element is used to insert JavaScript?",
    answers: [
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<code>", correct: false },
    ],
  },
  {
    question: "Which CSS unit is relative to the font size?",
    answers: [
      { text: "px", correct: false },
      { text: "em", correct: true },
      { text: "%", correct: false },
      { text: "cm", correct: false },
    ],
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Method", correct: false },
      { text: "Digital Object Model", correct: false },
      { text: "Document Oriented Method", correct: false },
    ],
  },
  {
    question: "Which operator is used to compare values in JavaScript?",
    answers: [
      { text: "=", correct: false },
      { text: "==", correct: true },
      { text: "+", correct: false },
      { text: "=>", correct: false },
    ],
  },
  {
    question: "Which HTML attribute is used to provide an ID?",
    answers: [
      { text: "class", correct: false },
      { text: "id", correct: true },
      { text: "name", correct: false },
      { text: "style", correct: false },
    ],
  },
  {
    question: "Which method converts JSON to a JavaScript object?",
    answers: [
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false },
      { text: "parse.JSON()", correct: false },
      { text: "convert.JSON()", correct: false },
    ],
  },
  {
    question: "Which language runs in the browser?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
    ],
  },
  {
    question: "Which keyword is used to create a function in JavaScript?",
    answers: [
      { text: "function", correct: true },
      { text: "method", correct: false },
      { text: "func", correct: false },
      { text: "define", correct: false },
    ],
  },
];

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;
let timeLeft = 30;
let timer;


// Initial setup
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  shuffleArray(quizQuestions);


  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  shuffleArray(currentQuestion.answers);


  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
  startTimer();



}

function selectAnswer(event) {
  if (answerDisabled) return;
  clearInterval(timer);

  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  clearInterval(timer);

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  saveScore();
displayLeaderboard();
document.getElementById("leaderboard").classList.remove("hidden");




  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

function startTimer() {
  clearInterval(timer); // stop any previous timer
  timeLeft = 30;
  document.getElementById("time").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      currentQuestionIndex++;

      if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }
  }, 1000);
}
function saveScore() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push({
    name: usernameInput.value || "Anonymous",
    score: score
  });

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function displayLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.sort((a, b) => b.score - a.score);
  leaderboardList.innerHTML = "";

  leaderboard.slice(0, 5).forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} — ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}
if (clearLeaderboardBtn){
clearLeaderboardBtn.addEventListener("click", () => {
  localStorage.removeItem("leaderboard");
  leaderboardList.innerHTML = "";
});
}




const questions = [
  { question: "What planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest ocean on Earth?", answer: "Pacific" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
  { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon dioxide" },
  { question: "What is 9 x 7?", answer: "63" }
];

const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const answerForm = document.getElementById("answer-form");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

let currentIndex = 0;
let score = 0;
let answeredCurrent = false;

function normalize(text) {
  return text.trim().toLowerCase();
}

function updateScore() {
  scoreEl.textContent = `Score: ${score} / ${questions.length}`;
}

function setFeedback(message, type = "info") {
  feedbackEl.textContent = message;
  feedbackEl.className = `feedback ${type}`;
}

function renderQuestion() {
  updateScore();

  if (currentIndex >= questions.length) {
    questionEl.textContent = "Quiz complete!";
    setFeedback(`Final score: ${score} out of ${questions.length}.`, "info");
    answerInput.value = "";
    answerInput.disabled = true;
    submitBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const currentQuestion = questions[currentIndex];
  questionEl.textContent = currentQuestion.question;
  answerInput.value = "";
  answerInput.disabled = false;
  submitBtn.disabled = false;
  nextBtn.disabled = true;
  answeredCurrent = false;
  setFeedback("Enter your guess and submit.", "info");
  answerInput.focus();
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (currentIndex >= questions.length || answeredCurrent) {
    return;
  }

  const guess = normalize(answerInput.value);
  const correct = normalize(questions[currentIndex].answer);

  if (!guess) {
    setFeedback("Please enter an answer before submitting.", "info");
    return;
  }

  if (guess === correct) {
    score += 1;
    setFeedback("Correct! Nice work.", "correct");
  } else {
    setFeedback(
      `Incorrect. The correct answer is: ${questions[currentIndex].answer}.`,
      "incorrect"
    );
  }

  answeredCurrent = true;
  answerInput.disabled = true;
  submitBtn.disabled = true;
  nextBtn.disabled = false;
  updateScore();
});

nextBtn.addEventListener("click", () => {
  if (!answeredCurrent) {
    setFeedback("Submit an answer before moving on.", "info");
    return;
  }

  currentIndex += 1;
  renderQuestion();
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  answeredCurrent = false;
  renderQuestion();
});

renderQuestion();

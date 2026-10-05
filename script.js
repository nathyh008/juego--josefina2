// ==========================================
// LABORATORIO DE MEZCLAS
// Ciencias Naturales - 6.º grado
// ==========================================

const questions = [
  {
    icon: "🥤",
    title: "Agua con sal",
    description: "La sal se disuelve completamente en el agua y no podemos distinguirla a simple vista.",
    answer: "homogenea",
    explanation: "¡Correcto! La sal se distribuye de manera uniforme en el agua. Es una mezcla homogénea."
  },

  {
    icon: "🫗",
    title: "Agua y aceite",
    description: "Al mezclarlos, el aceite queda separado del agua y se pueden observar dos capas.",
    answer: "heterogenea",
    explanation: "¡Muy bien! Se distinguen dos fases diferentes: agua y aceite."
  },

  {
    icon: "🍬",
    title: "Agua con azúcar",
    description: "El azúcar se disuelve completamente y la mezcla presenta un aspecto uniforme.",
    answer: "homogenea",
    explanation: "¡Correcto! Una vez disuelta, el azúcar no se distingue a simple vista."
  },

  {
    icon: "🏖️",
    title: "Agua y arena",
    description: "Los granos de arena permanecen separados y pueden observarse dentro del agua.",
    answer: "heterogenea",
    explanation: "¡Exacto! Podemos distinguir la arena del agua, por eso es heterogénea."
  },

  {
    icon: "🌬️",
    title: "Aire",
    description: "El aire está formado por varios gases que se encuentran mezclados de manera uniforme.",
    answer: "homogenea",
    explanation: "¡Excelente! El aire es una mezcla homogénea de gases."
  },

  {
    icon: "🥗",
    title: "Ensalada",
    description: "Podemos distinguir fácilmente sus diferentes componentes: tomate, lechuga, zanahoria y otros.",
    answer: "heterogenea",
    explanation: "¡Correcto! Sus componentes pueden distinguirse a simple vista."
  },

  {
    icon: "☕",
    title: "Café con azúcar disuelta",
    description: "El azúcar se disuelve completamente dentro del café y deja de distinguirse.",
    answer: "homogenea",
    explanation: "¡Muy bien! Al estar distribuido uniformemente, es una mezcla homogénea."
  },

  {
    icon: "🪨",
    title: "Agua con piedras",
    description: "Las piedras pueden verse y separarse fácilmente del agua.",
    answer: "heterogenea",
    explanation: "¡Exacto! Se pueden distinguir claramente sus diferentes componentes."
  },

  {
    icon: "🧃",
    title: "Jugo en polvo disuelto en agua",
    description: "Cuando el polvo se disuelve completamente, la mezcla presenta un aspecto uniforme.",
    answer: "homogenea",
    explanation: "¡Correcto! El jugo queda distribuido uniformemente en el agua."
  },

  {
    icon: "🥣",
    title: "Agua con harina",
    description: "La harina no se disuelve completamente y pueden observarse partículas en el agua.",
    answer: "heterogenea",
    explanation: "¡Muy bien! Como podemos distinguir diferentes partes, es heterogénea."
  }
];


// ==========================================
// VARIABLES DEL JUEGO
// ==========================================

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let streak = 0;
let bestStreak = 0;
let answered = false;


// ==========================================
// ELEMENTOS HTML
// ==========================================

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const streakElement = document.getElementById("streak");
const progressFill = document.getElementById("progress-fill");

const sampleIcon = document.getElementById("sample-icon");
const questionText = document.getElementById("question-text");
const questionDescription = document.getElementById("question-description");

const answerButtons = document.querySelectorAll(".answer-btn");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const correctElement = document.getElementById("correct-answers");
const wrongElement = document.getElementById("wrong-answers");
const bestStreakElement = document.getElementById("best-streak");

const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const resultIcon = document.getElementById("result-icon");
const scientistLevel = document.getElementById("scientist-level");


// ==========================================
// COMENZAR
// ==========================================

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", startGame);


function startGame() {

  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  streak = 0;
  bestStreak = 0;
  answered = false;

  scoreElement.textContent = score;
  streakElement.textContent = streak;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  gameScreen.classList.add("active");

  loadQuestion();
}


// ==========================================
// CARGAR PREGUNTA
// ==========================================

function loadQuestion() {

  answered = false;

  const question = questions[currentQuestion];

  questionNumber.textContent = currentQuestion + 1;

  scoreElement.textContent = score;

  streakElement.textContent = streak;

  progressFill.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  sampleIcon.textContent = question.icon;

  questionText.textContent = question.title;

  questionDescription.textContent = question.description;

  feedback.className = "feedback";
  feedback.textContent = "";

  answerButtons.forEach(button => {

    button.classList.remove("correct", "wrong", "disabled");

    button.disabled = false;

  });
}


// ==========================================
// RESPUESTAS
// ==========================================

answerButtons.forEach(button => {

  button.addEventListener("click", () => {

    if (answered) {
      return;
    }

    answered = true;

    const selectedAnswer = button.dataset.answer;

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {

      handleCorrect(button);

    } else {

      handleWrong(button, correctAnswer);

    }

  });

});


// ==========================================
// RESPUESTA CORRECTA
// ==========================================

function handleCorrect(button) {

  button.classList.add("correct");

  answerButtons.forEach(btn => {
    btn.classList.add("disabled");
  });

  correctAnswers++;

  streak++;

  if (streak > bestStreak) {
    bestStreak = streak;
  }

  // Sistema de puntos:
  // 100 puntos base + bonus por racha
  const points = 100 + ((streak - 1) * 25);

  score += points;

  scoreElement.textContent = score;
  streakElement.textContent = streak;

  feedback.textContent =
    `✅ ¡Correcto! +${points} puntos. ${questions[currentQuestion].explanation}`;

  feedback.className = "feedback show correct";

  createConfetti(12);

  setTimeout(nextQuestion, 1800);
}


// ==========================================
// RESPUESTA INCORRECTA
// ==========================================

function handleWrong(button, correctAnswer) {

  button.classList.add("wrong");

  wrongAnswers++;

  streak = 0;

  streakElement.textContent = streak;

  answerButtons.forEach(btn => {

    btn.classList.add("disabled");

    if (btn.dataset.answer === correctAnswer) {
      btn.classList.add("correct");
    }

  });

  feedback.textContent =
    `❌ Casi... La respuesta correcta era ${correctAnswer === "homogenea" ? "HOMOGÉNEA" : "HETEROGÉNEA"}. ${questions[currentQuestion].explanation}`;

  feedback.className = "feedback show wrong";

  setTimeout(nextQuestion, 2300);
}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion >= questions.length) {

    showResults();

  } else {

    loadQuestion();

  }
}


// ==========================================
// RESULTADOS
// ==========================================

function showResults() {

  gameScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScore.textContent = score;

  correctElement.textContent = correctAnswers;

  wrongElement.textContent = wrongAnswers;

  bestStreakElement.textContent = bestStreak;

  const percentage =
    Math.round((correctAnswers / questions.length) * 100);


  if (percentage === 100) {

    resultIcon.textContent = "🏆";

    resultTitle.textContent = "¡Científico/a experto/a!";

    resultMessage.textContent =
      "¡Impresionante! Clasificaste todas las mezclas correctamente.";

    scientistLevel.textContent =
      "🧪 CIENTÍFICO/A EXPERTO/A";

    createConfetti(45);

  } else if (percentage >= 80) {

    resultIcon.textContent = "🔬";

    resultTitle.textContent = "¡Excelente trabajo!";

    resultMessage.textContent =
      "Tenés un gran conocimiento sobre las mezclas.";

    scientistLevel.textContent =
      "🔬 INVESTIGADOR/A AVANZADO/A";

    createConfetti(30);

  } else if (percentage >= 60) {

    resultIcon.textContent = "🧪";

    resultTitle.textContent = "¡Muy buen trabajo!";

    resultMessage.textContent =
      "Estás aprendiendo a reconocer las diferentes mezclas.";

    scientistLevel.textContent =
      "🧪 INVESTIGADOR/A EN PROGRESO";

  } else {

    resultIcon.textContent = "🔍";

    resultTitle.textContent = "¡A seguir investigando!";

    resultMessage.textContent =
      "Cada experimento nos ayuda a aprender algo nuevo.";

    scientistLevel.textContent =
      "🔍 APRENDIZ DE LABORATORIO";

  }
}


// ==========================================
// CONFETI
// ==========================================

function createConfetti(amount) {

  const container =
    document.getElementById("confetti-container");

  for (let i = 0; i < amount; i++) {

    const piece = document.createElement("div");

    piece.classList.add("confetti");

    const shapes = ["◆", "●", "■", "★"];

    piece.textContent =
      shapes[Math.floor(Math.random() * shapes.length)];

    piece.style.left =
      Math.random() * 100 + "vw";

    piece.style.fontSize =
      (8 + Math.random() * 12) + "px";

    piece.style.animationDuration =
      (1.5 + Math.random() * 2) + "s";

    piece.style.opacity =
      0.7 + Math.random() * 0.3;

    container.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 4000);
  }
}

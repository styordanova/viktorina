const questions = [
    { question: "Кое от следните е пример за твърдо тяло?", answers: ["Вода", "Пясък", "Кислород"], correct: 1 },
    { question: "Кое от изброените е газ?", answers: ["Дърво", "Желязо", "Въглероден диоксид"], correct: 2 },
    { question: "Какво представлява солта?", answers: ["Течност", "Твърдо вещество", "Газ"], correct: 1 },
    { question: "Кое от следните е течност?", answers: ["Камък", "Мляко", "Желязо"], correct: 1 },
    { question: "Въздухът е…", answers: ["Смес от газове", "Елемент", "Течно вещество"], correct: 0 },
    { question: "Кой от изброените примери е естествено вещество?", answers: ["Пластмаса", "Камък", "Стъкло"], correct: 1 },
    { question: "Кое от следните вещества е разтворимо във вода?", answers: ["Пясък", "Сол", "Желязо"], correct: 1 },
    { question: "Кое от следните вещества има най-голяма твърдост?", answers: ["Дърво", "Въглерод (диамант)", "Вода"], correct: 1 },
    { question: "Кое от изброените е смес?", answers: ["Захар", "Вода", "Почва"], correct: 2 },
    { question: "Какво е характерно за течностите?", answers: ["Запазват формата си", "Променят формата си според съда", "Нямат обем"], correct: 1 },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    document.getElementById("next-btn").style.display = "none";
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    questionElement.innerText = questions[currentQuestion].question;
    answersElement.innerHTML = "";

    questions[currentQuestion].answers.forEach((answer, index) => {
        const button = document.createElement("div");
        button.classList.add("answer");
        button.innerText = answer;
        button.onclick = () => selectAnswer(index);
        answersElement.appendChild(button);
    });
}

function selectAnswer(index) {
    const correct = questions[currentQuestion].correct;
    const answers = document.getElementById("answers").children;

    if (index === correct) {
        answers[index].classList.add("correct");
        score++;
        document.getElementById("points").innerText = score;
    } else {
        answers[index].classList.add("incorrect");
        answers[correct].classList.add("correct");
    }

    for (let btn of answers) {
        btn.onclick = null;
    }

    document.getElementById("next-btn").style.display = "block";
    document.getElementById("next-btn").innerText = currentQuestion < questions.length - 1 ? "Следващ въпрос" : "Край";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    const resultText = `Вие събрахте общо ${score} точки.`;
    let feedback = "";
    let emoji = "";

    if (score >= 9) {
        feedback = "Справихте се отлично!";
        emoji = "😊";
    } else if (score >= 7) {
        feedback = "Справихте се много добре!";
        emoji = "😊";
    } else if (score >= 5) {
        feedback = "Справихте се добре!";
        emoji = "😊";
    } else {
        feedback = "Прочети още по темата и играй отново!";
        emoji = "😞";
    }

    document.getElementById("result").innerHTML = `${resultText}<br>${feedback} ${emoji}`;
}

loadQuestion();

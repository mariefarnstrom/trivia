let questions = [];
let questionDetails = [];
let correctAnswer = "";
let score = 0;
let currentIndex = 0; 

// shuffle function 
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const showScore = document.querySelector(".score");

// submit button event
const form = document.querySelector(".options");
form.addEventListener("submit", (event) => {
  const formData = new FormData(form);
  const selected = formData.get("answerOptions");
  console.log(selected);
  // prevent page from reloading
  event.preventDefault();
  // if statement for right or wrong answer
  if (selected === correctAnswer) {
    score++;
    showScore.innerText = score;
    console.log(score);
  } else {
    console.log("wrong answer!");
  }
  currentIndex++;
  const options = document.querySelector(".options");
  options.querySelectorAll('input[type="radio"], label').forEach(el => el.remove());
  loadQuestion();

})

// API
const generalUrl = "https://opentdb.com/api.php?amount=15&category=9&type=multiple";
const sportsUrl = "https://opentdb.com/api.php?amount=10";
const sportsHard = "https://opentdb.com/api.php?amount=10&category=21&difficulty=hard";
const sportsEasy = "https://opentdb.com/api.php?amount=1&category=21&difficulty=easy";
const tenRandom = "https://opentdb.com/api.php?amount=10&category=10&type=multiple";

// connect to API 
const url = generalUrl;

const getQuestions = async () => {
  try {
    const response = await fetch(url);
    questionDetails = await response.json();
    questions = questionDetails.results;
    currentIndex = 0; 
    console.log(questionDetails);

    // get question 
    loadQuestion(); 

  } catch (error) {
    console.error(error);
  }
};

const questionSpace = document.querySelector(".question");

function loadQuestion() {
    const question = questions[currentIndex];

    if (!question) {
        console.log("No more questions!");
        return;
    } else {
    // get alternatives 
    questionSpace.innerHTML = `<pre>${question.question}</pre>`;
    const alternatives = [];
    questionDetails.results[currentIndex].incorrect_answers.forEach((answer) => {
      alternatives.push(answer);
    });
    correctAnswer = questionDetails.results[currentIndex].correct_answer;
    alternatives.push(correctAnswer);

    // shuffle alternatives
    shuffle(alternatives);

    console.log(alternatives);
    // get answer alternatives and put into form
    const options = document.querySelector(".options");
    alternatives.forEach((alternative) => {

      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="answerOptions" value="${alternative}"> <pre>${alternative}</pre>`;
      options.appendChild(label);
    });
  }}

getQuestions();

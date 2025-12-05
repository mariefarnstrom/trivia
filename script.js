// API
const generalUrl = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";
const sportsUrl = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";
const musicUrl = "https://opentdb.com/api.php?amount=10&category=12&type=multiple";

let url = generalUrl;

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

const welcome = document.querySelector(".welcome");
const scoreTracker = document.querySelector(".scoreTracker");
const scoreCard = document.querySelector(".scoreCard");
const questionCard = document.querySelector(".questionCard");
const options = document.querySelector(".options");
const showScore = document.querySelector(".score");
const finalScore = document.querySelector(".finalScore");

// Category choice submit button event
const chooseCategoryForms = document.querySelectorAll(".chooseCategory");
// const chooseCategory = document.querySelector(".chooseCategory");
chooseCategoryForms.forEach((form) => {
  form.addEventListener("submit", async (e) => {
// chooseCategory.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const selected = formData.get("categories");
  url = selected;
  console.log(url);
  // reset variables
  currentIndex = 0;
  questions = [];
  score = 0;
  showScore.innerText = score;
  scoreCard.classList.add("invisible");
  // remove previous answer alternatives
  options.querySelectorAll('input[type="radio"], label').forEach(el => el.remove());
  // get new questions
  getQuestions();
  welcome.classList.add("invisible");
  setTimeout(() => {
  questionCard.classList.remove("invisible");
  scoreTracker.classList.remove("invisible");
  }, 700)
  })
})

// answer submit button event
const answerForm = document.querySelector(".options");
answerForm.addEventListener("submit", (event) => {
  const formData = new FormData(answerForm);
  const selected = formData.get("answerOptions");
  console.log(selected);
  // prevent page from reloading
  event.preventDefault();
  // if statement for right or wrong answer
  if (selected === correctAnswer) {
    score++;
    showScore.innerText = score;
    showScore.classList.add("numberAnimation");
    setTimeout(() => {
      showScore.classList.remove("numberAnimation");
    }, 2000)
    console.log(score);
  } else {
    console.log("wrong answer!");
  }
  currentIndex++;
  options.querySelectorAll('input[type="radio"], label').forEach(el => el.remove());
  loadQuestion();

})

// connect to API 
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
    let currentQuestion = currentIndex + 1;

    if (!question) {
        console.log("No more questions!");
        questionCard.classList.add("invisible");
        scoreCard.classList.remove("invisible");
        finalScore.innerText = score;

        return;
    } else {
    // get alternatives 
    questionSpace.innerHTML = `<pre>${currentQuestion}. ${question.question}</pre>`;
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


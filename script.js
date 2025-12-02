let correctAnswer = "";
let score = 0;

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

})

// API
const generalUrl = "https://opentdb.com/api.php?amount=15&category=9&type=multiple";
const sportsUrl = "https://opentdb.com/api.php?amount=10";
const sportsHard =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=hard";
const sportsEasy =
  "https://opentdb.com/api.php?amount=1&category=21&difficulty=easy";
const tenRandom =
  "https://opentdb.com/api.php?amount=10&category=10&type=multiple";

  // connect to API 
const url = generalUrl;

const getQuestion = async () => {
  try {
    const response = await fetch(url);
    const questionDetails = await response.json();
    console.log(questionDetails);

    // get question 
    const question = questionDetails.results[0].question;
    const questionSpace = document.querySelector(".question");
    questionSpace.innerHTML = `<pre>${question}</pre>`;
    // get alternatives 
    const alternatives = [];
    questionDetails.results[0].incorrect_answers.forEach((answer) => {
      alternatives.push(answer);
    });
    correctAnswer = questionDetails.results[0].correct_answer;
    alternatives.push(correctAnswer);
    console.log(alternatives);
    // get answer alternatives and put into form
    const options = document.querySelector(".options");
    alternatives.forEach((alternative) => {
      const option = document.createElement("input");
      option.setAttribute("type", "radio");
      option.name = "answerOptions";
      option.value = alternative;
      options.appendChild(option);
      const label = document.createElement("label");
      options.appendChild(label);
      // add "for" for label?? 
      label.innerText = alternative;
    });
  } catch (error) {
    console.error(error);
  }
};

getQuestion();

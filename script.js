const sportsUrl = "https://opentdb.com/api.php?amount=10";
const sportsHard =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=hard";
const sportsEasy =
  "https://opentdb.com/api.php?amount=1&category=21&difficulty=easy";
const tenRandom =
  "https://opentdb.com/api.php?amount=10&category=10&type=multiple";

const url = sportsEasy;

// const easy = document.querySelector(".easy");
// easy.addEventListener("change", () => {
// if(easy.checked) {
//     console.log("Easy chosen");
// }
// });
const getQuestion = async () => {
  try {
    const response = await fetch(url);
    const questionDetails = await response.json();
    console.log(questionDetails);
    const question = questionDetails.results[0].question;
    const questionSpace = document.querySelector(".question");
    questionSpace.innerHTML = `<pre>${question}</pre>`;
    const alternatives = [];
    questionDetails.results[0].incorrect_answers.forEach((answer) => {
      alternatives.push(answer);
    });
    alternatives.push(questionDetails.results[0].correct_answer);
    console.log(alternatives);
    const options = document.querySelector(".options");
    alternatives.forEach((alternative) => {
      const optionHolder = document.createElement("div");
      optionHolder.setAttribute("class", "OptionHolder");
      const option = document.createElement("input");
      options.appendChild(optionHolder);
      option.setAttribute("type", "radio");
      option.name = "answerOptions";
      option.value = alternative;
      const label = document.createElement("label");
      optionHolder.appendChild(option);
      optionHolder.appendChild(label);
      label.innerText = alternative;
      // You're creating the .options query inside the loop each time (not a bug, but move it out for clarity).
    });
  } catch (error) {
    console.error(error);
  }
};

getQuestion();

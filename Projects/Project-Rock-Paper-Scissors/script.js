{
  let playerScore = 0;
  let robotScore = 0;

  function getComputerChoice() {
    let num = Math.floor(Math.random() * 3) + 1;
    if (num == 3) {
      return "rock";
    } else if (num == 2) {
      return "paper";
    } else {
      return "scissors";
    }
  }

  function playRound(playerChoice) {
    let computer = getComputerChoice();
    let player = playerChoice.target.getAttribute("data-type");
    console.log(`Computer: ${computer}, Player: ${player}`);
    if (player == "rock" && computer == "paper") {
      robotScore++;
      return "You Lose! Paper beats Rock.";
    } else if (player == "rock" && computer == "scissors") {
      playerScore++;
      return "You Win! Rock beats Scissors.";
    } else if (player == "paper" && computer == "rock") {
      playerScore++;
      return "You Win! Paper beats Rock.";
    } else if (player == "paper" && computer == "scissors") {
      robotScore++;
      return "You Lose! Scissors beats Paper.";
    } else if (player == "scissors" && computer == "paper") {
      playerScore++;
      return "You Win! Scissors beats Paper.";
    } else if (player == "scissors" && computer == "rock") {
      robotScore++;
      return "You Lose! Rock beats Scissors.";
    } else {
      return "You tied!";
    }
  }

  function displayResults(playerChoice) {
    let results = playRound(playerChoice);
    let resultsGUI = document.querySelector("#results");
    let scoreGUI = document.querySelector("#score");

    resultsGUI.textContent = results;
    scoreGUI.textContent = `Robot Score: ${robotScore}, Human Score ${playerScore}`;
  }

  let btnRock = document.querySelector("#btn-rock");
  let btnScissors = document.querySelector("#btn-scissors");
  let btnPaper = document.querySelector("#btn-paper");

  let buttons = [btnRock, btnPaper, btnScissors];
  buttons.forEach((button) => {
    button.addEventListener("click", displayResults);
  });
}

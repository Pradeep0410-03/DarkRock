let playerScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const playerScorePara = document.querySelector("#player_score");
const compScorePara = document.querySelector("#comp_score");

// Generate computer choice
const genCompChoice = () => {
    const options = ["stone", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// Draw game
const drawGame = () => {
    msg.innerText = "It's a Draw!";
};

// Show winner
const showWinner = (playerWin, playerChoice, compChoice) => {
    if (playerWin) {
        playerScore++;
        playerScorePara.innerText = playerScore;
        msg.innerText = `You Win! ${playerChoice} beats ${compChoice}`;
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose! ${compChoice} beats ${playerChoice}`;
    }
};

// Play game
const playGame = (playerChoice) => {
    const compChoice = genCompChoice();

    if (playerChoice === compChoice) {
        drawGame();
    } else {
        let playerWin = true;

        if (playerChoice === "stone") {
            playerWin = compChoice === "scissor";
        } else if (playerChoice === "paper") {
            playerWin = compChoice === "stone";
        } else {
            playerWin = compChoice === "paper";
        }

        showWinner(playerWin, playerChoice, compChoice);
    }
};

// Add click events
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.getAttribute("id");
        playGame(playerChoice);
    });
});

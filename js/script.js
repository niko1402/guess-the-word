const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

// Display circle symbols as placeholders for correct letter guesses
const placeholder = function () {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// Event listener for Guess button, prevent reloading, and capture (then empty) the text input
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const letterGuess = textInput.value;
    console.log(letterGuess);
    textInput.value = "";
});
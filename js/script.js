const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

const guessedLetters = [];

// Display circle symbols as placeholders for correct letter guesses
const placeholder = function (word) {
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
    // Empty the message paragraph
    message.innerText = "";
    // Get what was entered as an input
    const guess = textInput.value;
    // Is it a single letter?
    const luckyGuess = validateInput(guess);

    if (luckyGuess) {
    makeGuess(guess);
    }
    textInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === "0") {
        // Input empty?
        message.interText = "Enter a letter";
    } else if (input.length > 1) {
        // Type more than one letter?
        message.innerText = "One letter at a time, no need to rush!";
    } else if (!input.match(acceptedLetter)) {
        // Typed numbers or special characters?
        message.innerText = "Letters only please!";
    } else {
        // Dude, we're good to go.
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Sorry, you've already chosen that one. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};
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

    // check the function above is returning a valid letter then pass as argument to makeGuess function
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
    // transform input letters into uppercase
    guess = guess.toUpperCase();
    //  check if letter has already been guessed
    if (guessedLetters.includes(guess)) {
        message.innerText = "Sorry, you've already chosen that one. Try again.";
    } else {
        // if it hasn't already been guessed then add it to the guessed letters array
        guessedLetters.push(guess);
        letterUpdate();
        console.log(guessedLetters);
        wordUpdate(guessedLetters);
    }
};

const letterUpdate = function () {
    guessedLettersElement.innerHTML = "";
    // choose the letter from the input and add to array
    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        // display the guessed letter as a list item
        listItem.innerText = letter;
        // add the letter to the unordered list
        guessedLettersElement.append(listItem);
    }
};

// function to update the word in progressed with correctly guessed letters, using guessedLetters array as para
const wordUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    // split the letters into an array
    const wordArray = wordUpper.split("");
    // create new array for the updated characters
    const characterUpdate = [];
    // check if the wordArray contains any letters from the guessedLetters array
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            // then add the letter to the new array
            characterUpdate.push(letter.toUpperCase())
        } else {
            // otherwise leave the placeholder
            characterUpdate.push("●");
        }
    }
    // update the characters to the word in progress paragraph
    wordInProgress.innerText = characterUpdate.join("");
    checkWin();
};

// check if the player successfully guessed the word
// verify their word in progress matches the word
const checkWin = function () {
    // remember it has to match the upperCase input
    if (word.toUpperCase() === wordInProgress.innerHTML) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`
        }
};
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 12;
// fetch different words from a text file
const getWord = async function () {
    const getWordRequest = await fetch ("https://gist.githubusercontent.com/niko1402/f25cb7bd98c4b1a6ec0ec9fe9aa62f7b/raw/eb2de185ca25342c22e8226f82be0c606f97da83/stranger-things-word-list");
    const words = await getWordRequest.text();
    // split the words into an array, with each word on a new line (\n)
    const wordArray = words.split("\n");
    // pick a random word from the returned word list above
    const randomWord = Math.floor(Math.random() * wordArray.length);
    // use trim to take off any whitespace around the word
    word = wordArray[randomWord].trim();
    // Change the placeholder space to the new random word
    placeholder(word);
}
getWord();


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
        message.innerText = "One letter at a time, wastoid!";
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
        message.innerText = "Why are you keeping this curiosity door locked? You've already chosen that one. Try again.";
    } else {
        // if it hasn't already been guessed then add it to the guessed letters array
        guessedLetters.push(guess);
        countGuesses(guess);
        letterUpdate();
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

const countGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Friends don't lie. ${guess} isn't in this word`;
        remainingGuesses -= 1;
    } else { 
        message.innerText = "Bitchin'!";
    }
    if (remainingGuesses ===0) {
        message.innerHTML = `Mouthbreather! The word was <span class="highlight">${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerHTML = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerHTML = `${remainingGuesses} guesses`;
    }
};


// check if the player successfully guessed the word
// verify their word in progress matches the word
const checkWin = function () {
    // remember it has to match the upperCase input
    if (word.toUpperCase() === wordInProgress.innerHTML) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">"Dude - you did it! You won a fight!"</p>`
        startOver();
        }
};

// when player chooses to play again, hide guess button and remaining guesses, and show play again button
const startOver = function (){
    guessButton.classList.add("hide");
    remainingGuess.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// if player clicks play again, remove play again button, show Guess button and reset all fields
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingSpan.innerHTML = `${remainingGuesses} guesses`;

    getWord();

    playAgainButton.classList.add("hide");
    guessButton.classList.remove("hide");
    remainingGuess.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");

});

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 200,
        "density": {
          "enable": true,
          "value_area": 789.1476416322727
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.48927153781200905,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 0.2,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.5,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 83.91608391608392,
          "size": 1,
          "duration": 3,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
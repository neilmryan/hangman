let instruction = document.querySelector('h5');
let display = document.getElementById('board');
let input = document.querySelector('.input');
let status = document.getElementById('status');
let announce = document.getElementById('announce');
let cartoon = document.getElementById('img');
let letters = document.getElementById('letters');

//resets the game flow on browser refresh
window.onload = function() {
  letters.style.display = "none";
  instruction.innerHTML = "Number of attempts? (1-10)";
  input.append(guessnum_input);
  input.append(guessnum_submit);
  $('#guessnum_input').focus();
};

//input to capture the number of guesses to allow
let guessnum_input = document.createElement('input');
guessnum_input.setAttribute('id', 'guessnum_input');
let guessnum_submit = document.createElement('button');
guessnum_submit.setAttribute('id', 'guessnum_submit');
guessnum_submit.innerHTML = "Submit";

//input to capture the letter to be guessed
let letter_input = document.createElement('input');
letter_input.setAttribute('id', 'letter_input');
let letter_submit = document.createElement('button');
letter_submit.setAttribute('id', 'letter_submit');
letter_submit.innerHTML = "Submit";

//input to capture the word to be guessed
let word_input = document.createElement('input');
word_input.setAttribute('id', 'word_input');
let word_submit = document.createElement('button');
word_submit.setAttribute('id', 'word_submit');
word_submit.innerHTML = "Submit";

//Global variables
let word_array = [];
let guess_array = [];
let board = [];
let letters_array = [];
let guess_num = "";
let game_over = false;
let guess_num_options = ['1','2','3','4','5','6','7','8','9','10'];

//Event listener to capture guess allowance
guessnum_submit.addEventListener('click', function() {
  if (!guess_num_options.includes(guessnum_input.value)) {
    status.innerHTML = "That's not a number!";
  } else {
    guess_num = Number((guessnum_input.value));
    status.innerHTML = "Guesses: " + guess_num;
    guessnum_input.style.display = "none";
    guessnum_submit.style.display = "none";
    instruction.innerHTML = "Secret word to guess?";
    input.append(word_input);
    input.append(word_submit);
    $('#word_input').focus();
  }
});

//Event listener copy for Enter key
$(guessnum_input).keypress(function(e) {
  let key = e.code;
  if (key === "Enter") {
    if (!guess_num_options.includes(guessnum_input.value)) {
      status.innerHTML = "That's not a number!";
    } else {
      guess_num = Number((guessnum_input.value));
      status.innerHTML = "Guesses: " + guess_num;
      guessnum_input.style.display = "none";
      guessnum_submit.style.display = "none";
      instruction.innerHTML = "Secret word to guess?";
      input.append(word_input);
      input.append(word_submit);
      $('#word_input').focus();
    }
  }
});

//Event listener to collect word to guess
word_submit.addEventListener('click', function() {
  word_array = (word_input.value).toLowerCase().split('');
  console.log(word_array);
  makeBoardArray(word_array);
});

//Event listener copy for Enter key
$(word_input).keypress(function(e) {
  let key = e.code;
  if (key === "Enter") {
    word_array = (word_input.value).toLowerCase().split('');
    console.log(word_array);
    makeBoardArray(word_array);
  }
});

//Event listener to capture letter to guess
letter_submit.addEventListener('click', function() {
  let letter = (letter_input.value);
  letter = letter.toLowerCase();
  console.log(letter);
  checkGuess(letter, word_array);
  status.innerHTML = "Guesses: " + guess_num;
  if ((word_array.toString()) === (guess_array.toString())) {
    status.innerHTML = "Congrats, you got it!";
    announce.innerHTML = "Refresh browser!"
    instruction.style.display = "none";
    letter_input.style.display = "none";
    letter_submit.style.display = "none";
    letters.style.display = "none";
    display.setAttribute('id', 'won');
    cartoon.setAttribute('src', 'images/1.png');
  } else {
    if (guess_num === 0) {
      game_over = true;
      letter_input.style.display = "none";
      letter_submit.style.display = "none";
      status.innerHTML = "Game Over!";
      cartoon.setAttribute('src', 'images/3.png');
      displayBoard(word_array);
      announce.innerHTML = "Refresh browser!"
    }
  }
});

$(letter_input).keypress(function(e) {
  let key = e.code;
  if (key === "Enter") {
    let letter = (letter_input.value);
    letter = letter.toLowerCase();
    console.log(letter);
    checkGuess(letter, word_array);
    status.innerHTML = "Guesses: " + guess_num;
    if ((word_array.toString()) === (guess_array.toString())) {
      status.innerHTML = "Congrats, you got it!";
      announce.innerHTML = "Refresh browser!"
      instruction.style.display = "none";
      letter_input.style.display = "none";
      letter_submit.style.display = "none";
      letters.style.display = "none";
      display.setAttribute('id', 'won');
      cartoon.setAttribute('src', 'images/1.png');
    } else {
      if (guess_num === 0) {
        game_over = true;
        letter_input.style.display = "none";
        letter_submit.style.display = "none";
        status.innerHTML = "Game Over!";
        instruction.style.display = "none";
        cartoon.setAttribute('src', 'images/3.png');
        displayBoard(word_array);
        announce.innerHTML = "Refresh browser!"
      }
    }
  }
});

function makeBoardArray(array) {
  board = new Array(array.length);
  board.fill("_");
  guess_array = new Array(array.length);
  guess_array.fill("_");
  console.log(board);
  displayBoard(board);
  instruction.innerHTML = "Enter the letter to guess?";
  word_input.style.display = "none";
  word_submit.style.display = "none";
  input.append(letter_input);
  input.append(letter_submit);
  $('#letter_input').focus();
}

function displayBoard(array) {
  display.innerHTML = "" + array.join(" ").toUpperCase() + "";
  word_input.value = "";
  letter_input.value = "";
};

function displayWrongLetters(array) {
    letters.style.display = "block";
    letters.innerHTML = "Missed Letters: " + array.join(" ").toUpperCase() + "";
}

function checkGuess(letter, word_array) {
  if (word_array.includes(letter)) {
    for (let i = 0; i < word_array.length; i++) {
      if (letter === word_array[i]) {
        guess_array[i] = letter;
      }
    }
  } else {
      if (!letters_array.includes(letter)) {
        letters_array.push(letter)
        guess_num--;
      }
  }
  displayWrongLetters(letters_array);
  displayBoard(guess_array);
  $('#letter_input').focus();
}

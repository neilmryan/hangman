let display = document.getElementById('board');
let word_input = document.getElementById('word_input');
let word_submit = document.getElementById('word_submit');

let letter_input = document.createElement('input');
    letter_input.setAttribute('id', 'letter_input');
let letter_submit = document.createElement('button');
    letter_submit.setAttribute('id', 'letter_submit');
    letter_submit.innerHTML = "Submit";

let instruction = document.querySelector('h5');
let input = document.querySelector('.input');

let word_array = [];
let guess_array = []
let board = [];
let guess_count = 0;

word_submit.addEventListener('click', function() {
    word_array = (word_input.value).split('');
    console.log(word_array);
    makeBoardArray(word_array);
});

letter_submit.addEventListener('click', function() {
  let letter = (letter_input.value);
  console.log(letter);
  checkGuess(letter, word_array);
});

function makeBoardArray(array) {
    board = new Array(array.length);
    board.fill("_");
    guess_array = new Array(array.length);
    guess_array.fill("_");
    console.log(board);
    displayBoard(board);
    instruction.innerHTML = "Enter your letter to guess!";
    word_input.style.display = "none";
    word_submit.style.display = "none";
    input.append(letter_input);
    input.append(letter_submit);
  }

function displayBoard(array) {
    display.innerHTML = "" + array.join(" ") + "";
    word_input.value = "";
    letter_input.value = "";
};

function checkGuess(letter, word_array) {
  for (let i = 0; i < word_array.length; i++) {
    if (letter === word_array[i]) {
      guess_array[i] = letter;
    }
  }
  displayBoard(guess_array);
}

//document.onload = function () {
//  instruction.innerHTML = "Enter your word to guess!";
//}

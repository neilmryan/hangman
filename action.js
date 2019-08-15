let display = document.getElementById('board');
let data_input = document.getElementById('data_input');
let submit_button = document.getElementById('submit');

let board = [];

submit_button.addEventListener('click', function() {
    word = data_input.value;
    convertToArray(word)
})

function convertToArray(word) {
    word = word.split('');
    makeBoardArray(word);
}

function makeBoardArray(array) {
    board = new Array(array.length);
    board.fill("_");
    console.log(board);
    displayBoard(board);
};

function displayBoard(array) {
    display.innerHTML = "" + array.join(" ") + "";
    data_input.value = "";
};















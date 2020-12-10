
var cardsArray = [
  { 'name': 'CSS', 'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true', },
  { 'name': 'HTML', 'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true', },
  { 'name': 'jQuery', 'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true', },
  { 'name': 'JS', 'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true', },
  { 'name': 'Node', 'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true', },
  { 'name': 'Photo Shop', 'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true', },
  { 'name': 'PHP', 'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true', },
  { 'name': 'Python', 'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true', },
  { 'name': 'Ruby', 'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true', },
  { 'name': 'Sass', 'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true', },
  { 'name': 'Sublime', 'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true', },
  { 'name': 'Wordpress', 'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true', },
];

// 6  to Duplicate cardsArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);
// 7  to arrange cards  randomly 
gameGrid.sort(function () {
  return 0.5 - Math.random();
})
// 1 to create div with an id of game-board and assign to a variable game
var game = document.getElementById('game-board');
// 2 to Create a section element and assign it to variable grid
var grid = document.createElement('section');
// 3 to  Give section element a class of grid.
grid.setAttribute('class', 'grid');
//4 to  Append the grid section to the game-board div
game.appendChild(grid);

// 5 to Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++) {
  // to create a div element and assign to variable card
  var card = document.createElement('div');
  // to Apply a card class to that div
  card.classList.add('card');
  // to  Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = gameGrid[i].name;   // to compare names 

  // to Create front of card
  var front = document.createElement('div');
  front.classList.add('front'); //classname front to div 

  // to Create back of card when game loads 
  var back = document.createElement('div');
  back.classList.add('back'); 
  back.style.backgroundImage = `url(${gameGrid[i].img})`; // cardsarray images  

  // to Append card to grid
  grid.appendChild(card);  // grid div  > card div 
  card.appendChild(front);  // card >front div
  card.appendChild(back);
}


var firstGuess = '';
var secondGuess = '';
// Set count to 0
var count = 0;
var previousTarget = null;// if we click on card twice 
var delay = 1200;

// Adding match CSS
var match = function () {
  var selected = document.querySelectorAll('.selected');   //all the ele that have  selected class
  // loop through the array like object containing `selected` class
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
};

// Reset guesses after two attempts
var resetGuesses = function () {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null; // if we click on card twice 

  var selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected'); // removee selected class from array
  }
};


//8  to  Add event listener to grid
grid.addEventListener('click', function (event) {
  // to Declare variable to target our clicked item
  var clicked = event.target;
  // Do not allow the grid section itself to be selected;
  // only select divs inside the grid 
  //if items are aready  matched 
  //if items are already selected  
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  // only two sec must be selected at time  We only want to add `selected` class if the current count is less than 2
  if (count < 2) {
    count++;

    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    // If both guesses are not empty
    if (firstGuess !== '' && secondGuess !== '') {
      // And the firstGuess matches secondGuess with same values
      if (firstGuess === secondGuess) {
        // Run the match function
        setTimeout(match, delay); // callback fun   (fun as argument )
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});
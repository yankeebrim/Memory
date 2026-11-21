'use strict';
// main.js - the game so far. cards get built from a list, they flip, and pairs get checked.
// midway through step 6, plus the New Game button. todo list at the bottom

// the board from the page
const boardEl = document.getElementById('board');

// every card in the game. two per character: the TCG card and the face from website.
// same name = a match
const cards = [
  { name: 'daemon', image: 'img/card-daemon.webp' },
  { name: 'daemon', image: 'img/face-daemon.webp' },
  { name: 'ada',    image: 'img/card-ada.webp' },
  { name: 'ada',    image: 'img/face-ada.webp' },
  { name: 'red',    image: 'img/card-red.webp' },
  { name: 'red',    image: 'img/face-red.webp' },
  { name: 'blue',   image: 'img/card-blue.webp' },
  { name: 'blue',   image: 'img/face-blue.webp' },
  { name: 'green',  image: 'img/card-green.webp' },
  { name: 'green',  image: 'img/face-green.webp' },
  { name: 'purple', image: 'img/card-purple.webp' },
  { name: 'purple', image: 'img/face-purple.webp' }
];

// the two cards flip
let firstCard = null;
let secondCard = null;

// id of the timer that flips a miss back, so restart can cancel it
let flipBackId = null;

// mix up the cards. fisher-yates: walk back from the last card,
// swap each one with a random card at or before it
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
}

// build the board. one card on the page per item in the list
function generateCards() {
  for (const card of cards) {
    const cardEl = document.createElement('button');
    cardEl.classList.add('card');

    // data-name is how i tell who matches who
    cardEl.setAttribute('data-name', card.name);

    // both sides of the card. front has the picture, back gets the card back from css
    cardEl.innerHTML = `
      <span class="card-inner">
        <span class="front"><img src="${card.image}" alt="${card.name}"></span>
        <span class="back"></span>
      </span>`;

    // click, flip
    cardEl.addEventListener('click', flipCard);
    boardEl.appendChild(cardEl);
  }
}

// New Game button runs this (onclick in index.html).
// kill a flip back thats still waiting, clear the turn, empty the board, shuffle, deal again
function restart() {
  clearTimeout(flipBackId);
  firstCard = null;
  secondCard = null;
  boardEl.innerHTML = '';
  shuffleCards();
  generateCards();
}

// first deal when the page loads
shuffleCards();
generateCards();

// runs when a card gets clicked. "this" = the card that got clicked
function flipCard() {
  // flip it face up
  this.classList.add('flipped');

  // if nothing waiting yet? then this is card one. hold onto it and stop here
  if (!firstCard) {
    firstCard = this;
    return;
  }

  // if it made it here = this is card two. check them
  secondCard = this;
  checkForMatch();
}

// check the two flipped cards
function checkForMatch() {
  // same name? its a match, keep them up and clear the turn
  if (firstCard.dataset.name === secondCard.dataset.name) {
    firstCard = null;
    secondCard = null;
  // different? pause to see both, then flip em back and clear the turn
  } else {
    flipBackId = setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard = null;
      secondCard = null;
    }, 1000);
  }
}

// TODO - (game rules)
// - lock the board while two cards are getting checked. right now a 3rd card
//   can be clicked during the one second wait and it breaks the turn
// - ignore a click on the same card twice. right now a card matches itself
// - matched cards should stop being clickable
//
// TODO - move the card list into data/cards.json and load it with fetch
// TODO - move counter, win message, canvas logo
// TODO - split into modules, finish comments, finish the README

let deckId;
let cardsArr = [];
let cardsImg = [];
let compScore = 0;
let playerScore = 0;

const newdeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards");
const warBtn = document.getElementById("draw-three");
const pileContainer = document.getElementById("piles");
const pilePlaceholder = document.getElementsByClassName("pilePlaceholder");

const cardValsArr = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

const winnerDisplay = document.getElementById("header");
const cardsRemaining = document.getElementById("cards-remaining");
const compScoreText = document.getElementById("comp-score");
const playerScoreText = document.getElementById("player-score");

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

async function handleClick() {
  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await res.json();
  cardsContainer.children[0].innerHTML = "";
  cardsContainer.children[1].innerHTML = "";
  loadCards(data);
  deckId = data.deck_id;
  drawBtn.disabled = false;
  document.getElementById("draw-cards").style.display = "block";
  compScore = 0;
  playerScore = 0;
  scoreSync();
  winnerDisplay.textContent = "Game of War";
}
newdeckBtn.addEventListener("click", handleClick);
/**
 * Challenge
 *
 * Background:
 * The Deck of Cards API expects us to provide the deck id
 * of the deck we're playing with so it can remember which
 * cards we've already drawn, how many are remaining in the
 * deck, etc.
 *
 * Task: save the deck_id from the returned data to a local
 * variable so we can use it later
 */

/**
 * Challenge
 *
 * Task: Using the saved deckId, draw 2 new cards from the deck
 *
 * Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
 * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
 * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
 * that you'll see in the deck of cards API docs.
 */

async function draw() {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  loadCards(data);
  loadImages();
  toggle("pilePlaceholder", "none");
  pileContainer.children[0].innerHTML = "";
  pileContainer.children[1].innerHTML = "";
  cardsContainer.children[0].innerHTML = `
        <image src=${cardsImg[0]} class="card">`;
  cardsContainer.children[1].innerHTML = `
        <image src=${cardsImg[1]} class="card">`;

  cardsImg = [];
  determineWinner(cardsArr[0].value, cardsArr[1].value);
  endgame(data);
  return cardsArr;
}

function endgame(data) {
  if (data.remaining === 0) {
    drawBtn.disabled = true;
    winnerDisplay.textContent = "GAME OVER";
    compScore > playerScore
      ? (compScoreText.textContent = "You Lost")
      : compScore < playerScore
      ? (compScoreText.textContent = "You Won!")
      : (compScoreText.textContent = "It's a Tie Game");
  }
}

function determineWinner(card1, card2) {
  const card1Index = cardValsArr.indexOf(card1);
  const card2Index = cardValsArr.indexOf(card2);
  card1Index > card2Index
    ? ((winnerDisplay.textContent = "Computer Wins!"), compScore++, scoreSync())
    : card1Index < card2Index
    ? ((winnerDisplay.textContent = "You Win!"), playerScore++, scoreSync())
    : ((winnerDisplay.textContent = "It's War!"),
      (warBtn.style.display = "block"),
      (drawBtn.disabled = true),
      toggle("pilePlaceholder", "block"));
}

drawBtn.addEventListener("click", draw);

function scoreSync() {
  compScoreText.textContent = `Computer Score: ${compScore}`;
  playerScoreText.textContent = `My Score: ${playerScore}`;
}
function loadImages() {
  for (card of cardsArr) {
    cardsImg.push(card.image);
  }
}

function loadCards(data) {
  cardsRemaining.innerText = `
        cards remaining: ${data.remaining}`;
  cardsArr = data.cards;
}

function toggle(className, displayState) {
  const els = document.getElementsByClassName(className);
  for (let i = 0; i < els.length; i++) {
    els[i].style.display = displayState;
  }
}

warBtn.addEventListener("click", war);

async function war() {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=6`
  );
  const data = await res.json();
  loadCards(data);
  loadImages();
  pileContainer.children[0].innerHTML = `
    <img src=${cardsImg[2]} class="pile"/>`;
  pileContainer.children[1].innerHTML = `
    <img src=${cardsImg[5]} class="pile"/>`;
  cardsImg = [];
  determineWinner(cardsArr[2].value, cardsArr[5].value);
  (warBtn.style.display = "none"), (drawBtn.disabled = false);
  endgame(data);
  return cardsArr;
}

/**
 * Challenge:
 *
 * Try to determine which of the 2 cards is the "winner" (has higher value)
 * Aces are the card with the highest "score"
 *
 * In parts:
 *
 * 1. Create a function that takes 2 card objects as parameters,
 * `card1` and `card2`. These card objects have a property called
 * `value`, which can be any one of the following strings, in
 * order of rising "score":
 *
 * "2", "3", "4", "5", "6", "7", "8", "9",
 * "10", "JACK", "QUEEN", "KING", "ACE"
 *
 * I.e. "2" is the lowest score and "ACE" is the highest.
 *
 * The function should determine which of the 2 cards (`card1`
 * or `card2`) has the higher score, or if they have the same score.
 *
 * Log which card wins (or "It's a tie!"
 * if they're the same) to the console
 */

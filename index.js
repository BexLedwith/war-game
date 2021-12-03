let deckId;
let cardsArr = [];
let cardsImg = [];

const newdeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards");

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

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then(function (data) {
      deckId = data.deck_id;
    })
    .then((document.getElementById("draw-cards").style.display = "block"));
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

function draw() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then(function (data) {
      cardsRemaining.innerText = `
        cards remaining: ${data.remaining}`;
      cardsArr = data.cards;
      for (card of cardsArr) {
        cardsImg.push(card.image);
      }
      cardsContainer.children[0].innerHTML = `
          <image src=${cardsImg[0]} class="card">`;
      cardsContainer.children[1].innerHTML = `
          <image src=${cardsImg[1]} class="card">`;

      cardsImg = [];

      return cardsArr;
    })
    .then(function (cardsArr) {
      const card1 = cardsArr[0].value;
      const card2 = cardsArr[1].value;
      const card1Index = cardValsArr.indexOf(card1);
      const card2Index = cardValsArr.indexOf(card2);
      card1Index > card2Index
        ? (winnerDisplay.innerText = "Computer Wins!")
        : card1Index < card2Index
        ? (winnerDisplay.innerText = "You Win!")
        : (winnerDisplay.innerText = "It's War!");
    });
}

drawBtn.addEventListener("click", draw);
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

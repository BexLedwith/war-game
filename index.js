let deckId;
let cardsArr = [];
let cardsImg = [];

const newdeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards");
function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
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
      cardsArr = data.cards;
      for (card of cardsArr) {
        cardsImg.push(card.image);
      }
      cardsContainer.children[0].innerHTML = `
          <image src=${cardsImg[0]} class="card">`;
      cardsContainer.children[1].innerHTML = `
          <image src=${cardsImg[1]} class="card">`;

      cardsImg = [];
    });
}

drawBtn.addEventListener("click", draw);

/**
 * Challenge:
 *
 * Display the images of the 2 cards you drew in the browser.
 * Probably best to use `innerHTML` to insert a couple <img> elements
 * on the page.
 */

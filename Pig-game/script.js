'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let currentScore, scores, activePlayer, playing;

playing = true;
score0El.textContent = 0;
score1El.textContent = 0;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};

init();

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling a Dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Roll a dice
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    // Image of the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Checking the dice
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add the current score to player score
    scores[activePlayer] += currentScore;
    console.log(scores);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // Check if the score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //  Switch the player
    switchPlayer();
  }
});

// Resetting
btnNew.addEventListener('click', init);
/*currentScore = 0;
scores = [0, 0];
activePlayer = 0;
playing = true;
// console.log(document.querySelectorAll('.score'));
document.querySelector('.player--winner').classList.remove('player--winner');

// for (let i = 0; i < document.querySelectorAll('.score').length; i++) {
//   document.querySelectorAll('.current-score')[i].textContent = 0;
//   document.querySelectorAll('.score')[i].textContent = 0;
// }

current0El.textContent = 0;
current1El.textContent = 0;
score0El.textContent = 0;
score0El.textContent = 0;
score1El.textContent = 0;
*/

// Modal Window for Rules

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.addEventListener('click', openModal);

btnsCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    console.log('Escape');
    closeModal();
  }
});

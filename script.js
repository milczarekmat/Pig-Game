'use strict';

let activePlayer, currentScore;
const scores = [0, 0],
  pointsToWin = 100;

// selecting elements
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImgElement = document.querySelector('.dice');
const overlayElement = document.querySelector('.overlay');
const modalElement = document.querySelector('.modal');
const modalAnnouncementElement = document.querySelector('.winner-announcement');
const closeModalBtn = document.querySelector('.close-modal');

// definitions of additional functions
const initGame = () => {
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
  }
  activePlayer = 0;
  currentScore = 0;
  document.querySelector('#score--0').textContent = '0';
  document.querySelector('#score--1').textContent = '0';
  document.querySelector('#current--0').textContent = '0';
  document.querySelector('#current--1').textContent = '0';
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
};

const showWinner = player => {
  overlayElement.classList.remove('hidden');
  modalElement.classList.remove('hidden');
  modalAnnouncementElement.textContent = `Player ${player + 1} wins!`;
};

const changeActivePlayerClass = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const closeModal = () => {
  overlayElement.classList.add('hidden');
  modalElement.classList.add('hidden');
  initGame();
};

initGame();

// button listeners
rollBtn.addEventListener('click', () => {
  const rolledValue = Math.floor(Math.random() * 6 + 1);
  diceImgElement.src = `/dice-${rolledValue}.png`;

  if (rolledValue !== 1) {
    currentScore += rolledValue;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    changeActivePlayerClass();
  }
});

holdBtn.addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= pointsToWin) {
    showWinner(activePlayer);
    return;
  }
  changeActivePlayerClass();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

document.addEventListener(
  'click',
  e => {
    if (modalElement.classList.contains('hidden')) {
      return;
    }
    if (!e.target.closest('.modal')) {
      closeModal();
    }
  },
  true //turn on capturing
);

newGameBtn.addEventListener('click', initGame);

closeModalBtn.addEventListener('click', closeModal);

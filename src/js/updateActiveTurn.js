import * as Timer from './timer.js';

const turnTitle = document.getElementById('turn-title');

export default () => {
  // Update turn title UI
  turnTitle.style.backgroundColor = `var(--piece-${playerTurn})`;
  turnTitle.style.color = `var(--piece-${playerTurn === 'white' ? 'black' : 'white'})`;

  turnTitle.textContent = playerTurn;

  // Update active timer UI
  Timer.updateActiveTurn();
};
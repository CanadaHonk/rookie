const startTime = 1 * 60 + 10;

let playerTimers = [];

const resetPlayerTimers = () => {
  playerTimers = [ startTime, startTime ];
};

resetPlayerTimers();

const timerEl = document.getElementById('timer');

window.timerChildren = [
  document.getElementById('timer-black'),
  document.getElementById('timer-white')
];

const timerTick = () => {
  const timerIndex = playerTurn === 'white' ? 1 : 0;

  playerTimers[timerIndex] -= 0.01;

  updateTimerUI();
};

const updateTimerUI = () => {
  for (let i = 0; i < playerTimers.length; i++) {
    const totalTime = playerTimers[i];

    const minutes = Math.floor(Math.floor(totalTime) / 60);
    const seconds = Math.floor(Math.floor(totalTime) % 60);
    const milli = totalTime % 1;

    const formatted = (minutes > 0 ? `${minutes}:` : '') +
      `${seconds.toString().padStart(2, '0')}` + 
      (minutes === 0 ? `.${milli.toFixed(1).split('.')[1]}` : '');

    const el = timerChildren[i];
    el.textContent = formatted;
  }
};

export const updateActiveTurn = () => {
  const currentTimerIndex = playerTurn === 'white' ? 1 : 0;
  timerChildren[currentTimerIndex].className = 'active';
  timerChildren[currentTimerIndex === 1 ? 0 : 1].className = '';
};

setInterval(timerTick, 10);
import pieceTypes from './pieceTypes.js';
import updateActiveTurn from './updateActiveTurn.js';
import { } from './drag.js';

const accentDropdown = document.getElementById('accent-dropdown');

accentDropdown.oninput = () => {
  document.documentElement.style.setProperty('--accent', accentDropdown.value);
};

const boardBaseDropdown = document.getElementById('board-base-dropdown');

boardBaseDropdown.oninput = () => {
  document.documentElement.style.setProperty('--board-base', boardBaseDropdown.value);
};

window.playerTurn = 'white';

updateActiveTurn();

window.board = document.getElementById('board');

window.boardRows = 8;
window.boardColumns = 8;

const pieces = document.querySelectorAll('#board > div');

const makePieceTypesDebugPanel = () => {
  const el = document.getElementById('d-pt');

  for (const t of pieceTypes) {
    const header = document.createElement('h1');
    header.textContent = t.name;

    el.appendChild(header);

    const con = document.createElement('div');
    con.style.display = 'flex';
    con.style.flexDirection = 'row';
    con.style.flexWrap = 'wrap';
    con.style.gap = '15px';

    for (const k of Object.keys(t)) {
      const par = document.createElement('div');
      par.style.backgroundColor = '#333';
      par.style.padding = '6px';
      
      const kEl = document.createElement('span');
      kEl.textContent = k;

      const vEl = document.createElement('span');
      vEl.textContent = t[k];

      par.append(kEl, vEl);

      con.appendChild(par);
    }

    el.appendChild(con);
  }
};

makePieceTypesDebugPanel();

for (let p of pieces) {
  p.draggable = true;
}
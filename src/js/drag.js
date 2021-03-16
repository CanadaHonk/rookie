import { isMoveValid } from './movement/core.js';
import updateActiveTurn from './updateActiveTurn.js';
import { getTextPos } from './movement/utils.js';

const uciLogPanel = document.getElementById('uci-log');

var dragged;

document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  dragged = event.target;

  event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
  event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
  if (event.target.parentElement.id === 'board') {
    event.target.style.background = isMoveValid(dragged, event.target) ? 'green' : 'red';
  }

}, false);

document.addEventListener("dragleave", function(event) {
  if (event.target.parentElement.id === 'board') {
    event.target.style.background = "";
  }
}, false);

document.addEventListener("drop", function(event) {
  event.preventDefault();

  if (event.target.parentElement.id === 'board') {
    event.target.style.background = "";

    if (!isMoveValid(dragged, event.target)) return;

    playerTurn = playerTurn === 'white' ? 'black' : 'white';
    updateActiveTurn();

    const uciEl = document.createElement('div');
    uciEl.className = `uci-move-${dragged.className.replace('-piece', '')}`
    uciEl.textContent = `${dragged.textContent === '♟︎' ? '' : dragged.textContent}${getTextPos(event.target)}`; // `${getTextPos(dragged)}${getTextPos(event.target)}`;
  
    uciLogPanel.appendChild(uciEl);

    const origText = dragged.textContent;
    const origClass = dragged.className;

    dragged.textContent = event.target.textContent;
    dragged.className = event.target.className;

    event.target.textContent = origText;
    event.target.className = origClass;
  }
}, false);
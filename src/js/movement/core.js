import pieceTypes from './../pieceTypes.js';
import { getBoardPos, doesPosHavePiece } from './utils.js';

export const isMoveValid = (from, to) => {
  const pieceType = pieceTypes.find((x) => x.char === from.textContent);

  const pieceColor = from.className.replace('-piece', '');

  if (pieceColor !== playerTurn) {
    return false;
  }

  const fromBoardPos = getBoardPos(from);
  const toBoardPos = getBoardPos(to);

  const relativeDiff = pieceColor === 'white' ? {
    x: fromBoardPos.x - toBoardPos.x,
    y: fromBoardPos.y - toBoardPos.y
  } : {
    x: toBoardPos.x - fromBoardPos.x,
    y: toBoardPos.y - fromBoardPos.y
  };

  let dirs = [];
  let amount = 0;

  if (!(relativeDiff.y > 0 && relativeDiff.x === 0) && ((relativeDiff.x !== 0 && relativeDiff.y === 0) || (relativeDiff.y !== 0 && relativeDiff.x === 0))) {
    dirs.push('straight');
    amount = Math.abs(relativeDiff.x) || Math.abs(relativeDiff.y);
  }

  if (relativeDiff.y > 0 && relativeDiff.x === 0) {
    dirs.push('forward');
    amount = relativeDiff.y;
  }

  if (Math.abs(relativeDiff.x) === Math.abs(relativeDiff.y)) {
    dirs.push('diagonal');
    amount = Math.abs(relativeDiff.x);
  }

  if ((Math.abs(relativeDiff.x) === Math.abs(relativeDiff.y) * 2) || (Math.abs(relativeDiff.y) === Math.abs(relativeDiff.x) * 2)) {
    dirs.push('l-shape');
    amount = Math.min(Math.abs(relativeDiff.x), Math.abs(relativeDiff.y));
  }

  console.log(dirs, amount, relativeDiff);

  let betweenPoses = [];

  let replX = relativeDiff.x;
  let replY = relativeDiff.y;

  while (replX !== 0 || replY !== 0) {
    if (replX > 0) {
      replX--;
    } else if (replX !== 0) {
      replX++;
    }

    if (replY > 0) {
      replY--;
    } else if (replY !== 0) {
      replY++;
    }

    const pos = {
      x: (pieceColor === 'white' ? toBoardPos.x : fromBoardPos.x) + replX,
      y: (pieceColor === 'white' ? toBoardPos.y : fromBoardPos.y) + replY
    };

    if (pos.x === fromBoardPos.x && pos.y === fromBoardPos.y) continue;

    betweenPoses.push(pos);
  }

  const pieceBetween = betweenPoses.some((x) => doesPosHavePiece(x));

  return !(pieceBetween === true && pieceType.hop === false) && dirs.every((x) => pieceType.dirs.includes(x)) && pieceType.amounts.includes(amount);
};
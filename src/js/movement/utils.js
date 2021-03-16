export const getTextPos = (el) => {
  const boardPos = getBoardPos(el);

  console.log(boardPos);

  return `${String.fromCharCode(97 + boardPos.x)}${(boardRows - boardPos.y)}`;
};

export const getBoardPos = (el) => { // top left is (0, 0)
  const boardIndex = [...board.children].indexOf(el);

  return {
    x: boardIndex % 8,
    y: Math.floor(boardIndex / 8)
  };
};

export const doesPosHavePiece = (pos) => {
  const index = pos.x + pos.y * 8;

  return board.children[index].className !== '';
};
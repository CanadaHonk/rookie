export default [
  {
    char: '♟︎',
    dirs: ['forward'],
    name: 'Pawn',
    amounts: [1, 2],
    hop: false
  },
  {
    char: '♝',
    dirs: ['diagonal'],
    name: 'Bishop',
    amounts: [1, 2, 3, 4, 5, 6, 7, 8],
    hop: false
  },
  {
    char: '♛',
    dirs: ['forward', 'straight', 'diagonal'],
    name: 'Queen',
    amounts: [1, 2, 3, 4, 5, 6, 7, 8],
    hop: false
  },
  {
    char: '♜',
    dirs: ['forward', 'straight'],
    name: 'Rook',
    amounts: [1, 2, 3, 4, 5, 6, 7, 8],
    hop: false
  },
  {
    char: '♚',
    dirs: ['forward', 'straight', 'diagonal'],
    name: 'King',
    amounts: [1]
  },
  {
    char: '♞',
    dirs: ['l-shape'],
    name: 'Knight',
    amounts: [1]
  }
];
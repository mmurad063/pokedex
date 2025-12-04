import React, { useState } from "react";
import "./App.css";

/*
 Sadə useState ilə şahmat.
 Qaydalar: əsas hərəkətlər + bloklanma + promotion (queen).
 Xeyli sadələşdirilmişdir: castling, en-passant, check yoxlaması yoxdur.
*/

const initialBoard = () => {
  // board[row][col] — row: 0..7 (0 = rank8), col: 0..7 (0 = file a)
  const emptyRow = () => Array(8).fill(null);
  const board = Array.from({ length: 8 }, emptyRow);

  const backRank = (color) => [
    { type: "r", color },
    { type: "n", color },
    { type: "b", color },
    { type: "q", color },
    { type: "k", color },
    { type: "b", color },
    { type: "n", color },
    { type: "r", color },
  ];

  board[0] = backRank("b");
  board[1] = Array(8).fill({ type: "p", color: "b" });
  board[6] = Array(8).fill({ type: "p", color: "w" });
  board[7] = backRank("w");

  // ensure unique objects for pawns
  board[1] = board[1].map(() => ({ type: "p", color: "b" }));
  board[6] = board[6].map(() => ({ type: "p", color: "w" }));

  return board;
};

const UNICODE = {
  p: "♟",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
};

function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function cloneBoard(board) {
  return board.map((row) => row.map((cell) => (cell ? { ...cell } : null)));
}

function idxToSquare(row, col) {
  const file = "abcdefgh"[col];
  const rank = 8 - row;
  return `${file}${rank}`;
}

// generate legal moves (simplified, no check detection)
function getLegalMoves(board, row, col) {
  const piece = board[row][col];
  if (!piece) return [];
  const moves = [];
  const color = piece.color;

  const pushIf = (r, c) => {
    if (!inBounds(r, c)) return false;
    const target = board[r][c];
    if (!target) {
      moves.push([r, c]);
      return true; // can continue for sliding pieces
    }
    if (target.color !== color) {
      moves.push([r, c]);
    }
    return false; // blocked after encountering piece
  };

  if (piece.type === "p") {
    const dir = color === "w" ? -1 : 1;
    const startRow = color === "w" ? 6 : 1;

    // forward 1
    if (inBounds(row + dir, col) && !board[row + dir][col]) {
      moves.push([row + dir, col]);

      // forward 2 from start
      if (row === startRow && !board[row + 2 * dir][col]) {
        moves.push([row + 2 * dir, col]);
      }
    }

    // captures
    for (let dc of [-1, 1]) {
      const r = row + dir,
        c = col + dc;
      if (inBounds(r, c) && board[r][c] && board[r][c].color !== color) {
        moves.push([r, c]);
      }
    }
    return moves;
  }

  if (piece.type === "n") {
    const deltas = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];
    for (let [dr, dc] of deltas) {
      const r = row + dr,
        c = col + dc;
      if (!inBounds(r, c)) continue;
      if (!board[r][c] || board[r][c].color !== color) moves.push([r, c]);
    }
    return moves;
  }

  // sliding pieces: rook, bishop, queen
  const slideDirs = {
    r: [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ],
    b: [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ],
    q: [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ],
  };

  if (piece.type === "r" || piece.type === "b" || piece.type === "q") {
    const dirs = slideDirs[piece.type];
    for (let [dr, dc] of dirs) {
      let r = row + dr,
        c = col + dc;
      while (inBounds(r, c)) {
        if (!board[r][c]) {
          moves.push([r, c]);
        } else {
          if (board[r][c].color !== color) moves.push([r, c]);
          break; // blocked
        }
        r += dr;
        c += dc;
      }
    }
    return moves;
  }

  if (piece.type === "k") {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr,
          c = col + dc;
        if (!inBounds(r, c)) continue;
        if (!board[r][c] || board[r][c].color !== color) moves.push([r, c]);
      }
    }
    return moves;
  }

  return moves;
}

export default function App() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("w"); // 'w' or 'b'
  const [selected, setSelected] = useState(null); // [r,c] or null
  const [legal, setLegal] = useState([]); // array of [r,c]

  function onSquareClick(r, c) {
    const cell = board[r][c];

    // if selecting own piece
    if (!selected) {
      if (cell && cell.color === turn) {
        setSelected([r, c]);
        setLegal(getLegalMoves(board, r, c));
      }
      return;
    }

    // if clicked same square -> deselect
    if (selected[0] === r && selected[1] === c) {
      setSelected(null);
      setLegal([]);
      return;
    }

    // check if target is legal
    const isLegal = legal.some(([lr, lc]) => lr === r && lc === c);
    if (!isLegal) {
      // if clicked other own piece -> change selection
      if (cell && cell.color === turn) {
        setSelected([r, c]);
        setLegal(getLegalMoves(board, r, c));
        return;
      }
      // otherwise ignore
      setSelected(null);
      setLegal([]);
      return;
    }

    // perform move
    const [sr, sc] = selected;
    const newBoard = cloneBoard(board);
    const moving = newBoard[sr][sc];
    newBoard[sr][sc] = null;

    // promotion: pawn reaches last rank
    if (
      moving.type === "p" &&
      ((moving.color === "w" && r === 0) || (moving.color === "b" && r === 7))
    ) {
      newBoard[r][c] = { type: "q", color: moving.color }; // auto-queen
    } else {
      newBoard[r][c] = moving;
    }

    setBoard(newBoard);
    setSelected(null);
    setLegal([]);
    setTurn((t) => (t === "w" ? "b" : "w"));
  }

  function restart() {
    setBoard(initialBoard());
    setTurn("w");
    setSelected(null);
    setLegal([]);
  }

  const renderPiece = (cell) => {
    if (!cell) return "";
    const key = cell.color === "w" ? cell.type.toUpperCase() : cell.type;
    return UNICODE[key] ?? "";
  };

  // simple status (no check detection)
  const status = `Növbə: ${turn === "w" ? "Ağ (White)" : "Qara (Black)"}`;

  return (
    <div className="app">
      <h1>Sadə Şahmat </h1>
      <div className="topbar">
        <div className="status">{status}</div>
        <button onClick={restart}>Yenidən başla</button>
      </div>

      <div className="board-wrap">
        <div className="board">
          {board.map((rowArr, r) => (
            <div key={r} className="board-row">
              {rowArr.map((cell, c) => {
                const isLight = (r + c) % 2 === 0;
                const isSelected =
                  selected && selected[0] === r && selected[1] === c;
                const isLegal = legal.some(([lr, lc]) => lr === r && lc === c);
                const classNames = [
                  "square",
                  isLight ? "light" : "dark",
                  isSelected ? "selected" : "",
                  isLegal ? "legal" : "",
                ].join(" ");

                return (
                  <div
                    key={c}
                    className={classNames}
                    onClick={() => onSquareClick(r, c)}
                  >
                    <div className="piece">{renderPiece(cell)}</div>
                    <div className="coord">{idxToSquare(r, c)}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="side">
          <div>
            <strong>Qaydalar (qısa):</strong>
            <ul>
              <li>Piyadalar 1 və başlanğıcdan 2 addım gedə bilir; tutma diaqonalla.</li>
              <li>At, fil, top  , vezir, şah üçün əsas hərəkətlər nəzərə alınıb.</li>
              <li>Castling və en-passant yoxdur. Check yoxlanmır.</li>
              <li>Piyada son sıraya çatanda avtomatik queen olur.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

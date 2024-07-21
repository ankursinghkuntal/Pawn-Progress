import { blackPawn } from "../data/pieces.js";
import { whitePawn } from "../data/pieces.js";
import { blackRook } from "../data/pieces.js";
import { whiteRook } from "../data/pieces.js";
import { blackBishop } from "../data/pieces.js";
import { whiteBishop } from "../data/pieces.js";
import { blackKnight } from "../data/pieces.js";
import { whiteKnight } from "../data/pieces.js";
import { blackQueen } from "../data/pieces.js";
import { whiteQueen } from "../data/pieces.js";
import { blackKing } from "../data/pieces.js";
import { whiteKing } from "../data/pieces.js";
import * as piece from "../data/pieces.js";
import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";

const globalPiece = new Object();
//  global stateRender function (this function is useful to render pieces fromglobalState Data)
// => use when updating globalstate
function globalStateRender() {
  globalState.forEach((row) => {
    row.forEach((element) => {
      if (element.highlight) {
        const hightlightSpan = document.createElement("span");
        hightlightSpan.classList.add("highlight");
        document.getElementById(element.id).appendChild(hightlightSpan);
        // } else if (element.highlight === null) {
      } else {
        const el = document.getElementById(element.id);
        const highlights = Array.from(el.getElementsByTagName("span"));
        // const highlights = Array.from(el.getElementsByTagName("span"));
        highlights.forEach((element) => {
          el.removeChild(element);
        });
        // document.getElementById(element.id).innerHTML = "";
      }
    });
  });
}

// // move element to square with id
function moveElement(piece, id) {
  const flatData = globalState.flat();
  // console.log(piece);
  flatData.forEach((el) => {
    if (el.id == piece.current_position) {
      delete el.piece;
    }
    if (el.id == id) {
      el.piece = piece;
    }
  });

  clearhighlight();
  const previouspiece = document.getElementById(piece.current_position);
  previouspiece.classList.remove("highlightYellow");
  const curentpiece = document.getElementById(id);

  curentpiece.innerHTML = previouspiece.innerHTML;
  previouspiece.innerText = "";

  piece.current_position = id;
}

// function clearPreviousSelfHighlight(piece) {
//   if (piece) {
//     document
//       .getElementById(piece.current_position)
//       .classList.remove("highlightYellow");
//   }
// }

function selfHighlight(piece) {
  document
    .getElementById(piece.current_position)
    .classList.add("highlightYellow");
}

// use when you want render the board pieces
function pieceRender(data) {
  data.forEach((row) => {
    row.forEach((square) => {
      // if square ha spiece
      if (square.piece) {
        const squareEl = document.getElementById(square.id);

        // create piece
        const piece = document.createElement("img");
        piece.src = square.piece.img;
        piece.classList.add("piece");

        // insert piece into square element
        squareEl.appendChild(piece);
      }
    });
  });
}

// this function calls when game starts(only for one time)
function initGameRender(data) {
  data.forEach((element) => {
    // console.log(element);
    const rowEl = document.createElement("div");
    element.forEach((square) => {
      const squareDiv = document.createElement("div");
      squareDiv.id = square.id;
      squareDiv.classList.add(square.color, "square");

      // label id into square
      // const labelId = document.createElement("span");
      // labelId.textContent = square.id;
      // labelId.classList.add("labelId",`${square.color}-label-id`);
      // squareDiv.append(labelId);

      // render blackpawn
      if (square.id[1] == 7) {
        square.piece = blackPawn(square.id);
        globalPiece.black_pawn = square.piece;
      }
      // render blackRook
      if (square.id == "h8" || square.id == "a8") {
        square.piece = blackRook(square.id);
        if(globalPiece.black_rook_1){
          globalPiece.black_rook_2 = square.piece;
        }else{
          globalPiece.black_rook_1 = square.piece;
        }
      }
      // render blackBishop
      if (square.id == "f8" || square.id == "c8") {
        square.piece = blackBishop(square.id);
        if(globalPiece.black_bishop_1){
          globalPiece.black_bishop_2 = square.piece;
        }else{
          globalPiece.black_bishop_1 = square.piece;
        }
      }
      // render blackKnight
      if (square.id == "g8" || square.id == "b8") {
        square.piece = blackKnight(square.id);
        if(globalPiece.black_knight_1){
          globalPiece.black_knight_2 = square.piece;
        }else{
          globalPiece.black_knight_1 = square.piece;
        }
      }
      // render blackQueen
      if (square.id == "d8") {
        square.piece = blackQueen(square.id);
        globalPiece.black_queen = square.piece;
      }
      // render blackKing
      if (square.id == "e8") {
        square.piece = blackKing(square.id);
        globalPiece.black_king = square.piece;
      }
      // render white pawn
      if (square.id[1] == 2) {
        square.piece = whitePawn(square.id);
        globalPiece.white_pawn = square.piece;
      }

      // render whiteRook
      if (square.id == "h1" || square.id == "a1") {
        square.piece = whiteRook(square.id);
        if(globalPiece.white_rook_1){
          globalPiece.white_rook_2 = square.piece;
        }else{
          globalPiece.white_rook_1 = square.piece;
        }
      }
      // render whiteBishop
      if (square.id == "f1" || square.id == "c1") {
        square.piece = whiteBishop(square.id);
        if(globalPiece.white_bishop_1){
          globalPiece.white_bishop_2 = square.piece;
        }else{
          globalPiece.white_bishop_1 = square.piece;
        }
      }
      // render whiteKnight
      if (square.id == "g1" || square.id == "b1") {
        square.piece = whiteKnight(square.id);
        if(globalPiece.white_knight_1){
          globalPiece.white_knight_2 = square.piece;
        }else{
          globalPiece.white_knight_1 = square.piece;
        }
      }
      // render whiteKing
      if (square.id == "e1") {
        square.piece = whiteKing(square.id);
        globalPiece.white_king = square.piece;
      }
      // render whiteQueen
      if (square.id == "d1") {
        square.piece = whiteQueen(square.id);
        globalPiece.white_queen = square.piece;
      }
      rowEl.appendChild(squareDiv);
    });
    rowEl.classList.add("squareRow");
    ROOT_DIV.appendChild(rowEl);
  });

  pieceRender(data);
}

// render highlight circle
function renderHighlight(squareId) {
  // console.log(squareId);
  const highlightspan = document.createElement("span");
  highlightspan.classList.add("highlight");
  document.getElementById(squareId).appendChild(highlightspan);
}

// clear all highlights from the board
function clearhighlight() {
  const flatData = globalState.flat();

  flatData.forEach((el) => {
    if (el.captureHighlight) {
      document.getElementById(el.id).classList.remove("captureColor");
      el.captureHighlight = false;
    }

    if (el.highlight) {
      el.highlight = null;
    }

    globalStateRender();
  });
}
// clear all highlights from the pawn
export {
  initGameRender,
  renderHighlight,
  clearhighlight,
  selfHighlight,
  // clearPreviousSelfHighlight,
  globalStateRender,
  globalPiece,
};

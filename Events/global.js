import { ROOT_DIV } from "../Helper/constants.js";
import { checkSquareCaptureId, giveQueenCapturesIds } from "../Helper/commonhelper.js";
import { globalState } from "../index.js";
import { renderHighlight } from "../Renderer/main.js";
import { clearhighlight } from "../Renderer/main.js";
import { selfHighlight } from "../Renderer/main.js";
import { checkPieceofopponentonElement } from "../Helper/commonhelper.js";
import { globalStateRender } from "../Renderer/main.js";
import { keySquareMapper } from "../index.js";
import { giveBishopHighlightIds } from "../Helper/commonhelper.js";
import { checkWhetherPieceExistsOrNot } from "../Helper/commonhelper.js";
import { giveRookHighlightIds } from "../Helper/commonhelper.js";
import { giveKnightHighlightIds } from "../Helper/commonhelper.js";
import { giveQueenHighlightIds } from "../Helper/commonhelper.js";
import { giveKingHighlightIds } from "../Helper/commonhelper.js";
import { globalPiece } from "../Renderer/main.js";
import { giveKnightCaptureIds } from "../Helper/commonhelper.js";
import { giveKingCaptureIds } from "../Helper/commonhelper.js";
import { giveBishopCaptureIds } from "../Helper/commonhelper.js";
import { giveRookCapturesIds } from "../Helper/commonhelper.js";
import logMoves from "../Helper/logging.js";


// highlighted or  not => state
let highlight_state = false;
let inTurn = "white";
let whoInCheck = null; 
function changeTurn(){
  inTurn = inTurn === "white" ? "black" : "white";
}
function checkForCheck() {
  if (inTurn === "black") {
    const whiteKingCurrentPosition = globalPiece.white_king.current_position;
    const knight_1 = globalPiece.black_knight_1.current_position;
    const knight_2 = globalPiece.black_knight_2.current_position;
    const king = globalPiece.black_king.current_position;
    const bishop_1 = globalPiece.black_bishop_1.current_position;
    const bishop_2 = globalPiece.black_bishop_2.current_position;
    const rook_1 = globalPiece.black_rook_1.current_position;
    const rook_2 = globalPiece.black_rook_2.current_position;
    const queen = globalPiece.black_queen.current_position;

    let finalCheckList = [];
    finalCheckList.push(giveKnightCaptureIds(knight_1, inTurn));
    finalCheckList.push(giveKnightCaptureIds(knight_2, inTurn));
    finalCheckList.push(giveKingCaptureIds(king, inTurn));
    finalCheckList.push(giveBishopCaptureIds(bishop_1, inTurn));
    finalCheckList.push(giveBishopCaptureIds(bishop_2, inTurn));
    finalCheckList.push(giveRookCapturesIds(rook_1, inTurn));
    finalCheckList.push(giveRookCapturesIds(rook_2, inTurn));
    finalCheckList.push(giveQueenCapturesIds(queen, inTurn));

    finalCheckList = finalCheckList.flat();
    const checkOrNot = finalCheckList.find(
      (element) => element === whiteKingCurrentPosition
    );

    if (checkOrNot) {
      whoInCheck = "white";
    }
  } else {
    const blackKingCurrentPosition = globalPiece.black_king.current_position;
    const knight_1 = globalPiece.white_knight_1.current_position;
    const knight_2 = globalPiece.white_knight_2.current_position;
    const king = globalPiece.white_king.current_position;
    const bishop_1 = globalPiece.white_bishop_1.current_position;
    const bishop_2 = globalPiece.white_bishop_2.current_position;
    const rook_1 = globalPiece.white_rook_1.current_position;
    const rook_2 = globalPiece.white_rook_2.current_position;
    const queen = globalPiece.white_queen.current_position;

    let finalCheckList = [];
    finalCheckList.push(giveKnightCaptureIds(knight_1, inTurn));
    finalCheckList.push(giveKnightCaptureIds(knight_2, inTurn));
    finalCheckList.push(giveKingCaptureIds(king, inTurn));
    finalCheckList.push(giveBishopCaptureIds(bishop_1, inTurn));
    finalCheckList.push(giveBishopCaptureIds(bishop_2, inTurn));
    finalCheckList.push(giveRookCapturesIds(rook_1, inTurn));
    finalCheckList.push(giveRookCapturesIds(rook_2, inTurn));
    finalCheckList.push(giveQueenCapturesIds(queen, inTurn));

    finalCheckList = finalCheckList.flat();
    const checkOrNot = finalCheckList.find(
      (element) => element === blackKingCurrentPosition
    );

    if (checkOrNot) {
      whoInCheck = "black";
    }
  }
}

function captureinTurn(square){
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }
  
  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }
}
// move element to square with id
function moveElement(piece, id) {
  changeTurn();
  // checkForCheck();
  // logMoves({from : piece.current_position,to:id,piece:piece.piece_name},inTurn);
  const flatData = globalState.flat();
  // console.log(piece);
  flatData.forEach((el) => {
    if (el.id == piece.current_position) {
      delete el.piece;
    }
    if (el.id == id) {
      if (el.piece) {
        el.piece.current_position = null;
      }
      el.piece = piece;
    }
  });

  clearhighlight();
  const previouspiece = document.getElementById(piece.current_position);
  previouspiece.classList.remove("highlightYellow");
  const curentpiece = document.getElementById(id);
  curentpiece.innerHTML += previouspiece.querySelector('img').outerHTML;
  previouspiece.innerText = "";
  piece.current_position = id;
  checkForCheck();
  // changeTurn();
}
// current selfhighlighted square state
let selfHighlightState = null;
// in move state or not
let moveState = null;
// local function that will clear with state
function clearHighlightLocal() {
  clearhighlight();
  highlight_state = false;
}
// move piece from x-square to y-square
function movePieceFromXtoY(from, to) {
  to.piece = from.piece;
  from.piece = null;
  globalStateRender();
}
// white pawn event
function whitePawnClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = null;

  // on initial position movement
  if (current_pos[1] == "2") {
    highlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];
  } else {
    highlightSquareIds = [`${current_pos[0]}${Number(current_pos[1]) + 1}`];
  }
  highlightSquareIds = checkSquareCaptureId(highlightSquareIds);
  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });
  // capture id logic
  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${
    Number(current_pos[1]) + 1
  }`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${
    Number(current_pos[1]) + 1
  }`;

  let captureIds = [col1, col2];
  // captureIds = checkSquareCaptureId(captureIds);
  captureIds.forEach((element) => {
    checkPieceofopponentonElement(element, "white");
  });
  globalStateRender();
}
// Black Pawn Event
function BlackPawnClick(square) {
  // clear board for any previous highlight

  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = null;

  // on initial position movement
  if (current_pos[1] == "7") {
    highlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) - 1}`,
      `${current_pos[0]}${Number(current_pos[1]) - 2}`,
    ];
  } else {
    highlightSquareIds = [`${current_pos[0]}${Number(current_pos[1]) - 1}`];
  }

  highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  // capture logic id
  const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${
    Number(current_pos[1]) - 1
  }`;
  const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${
    Number(current_pos[1]) - 1
  }`;

  let captureIds = [col1, col2];
  // captureIds = checkSquareCaptureId(captureIds);

  captureIds.forEach((element) => {
    checkPieceofopponentonElement(element, "black");
  });

  globalStateRender();
}
// White Bishop Event
function whiteBishopClick(square) {
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveBishopHighlightIds(current_pos);
  let temp = [];
  const { bottomLeft, bottomRight, topLeft, topRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));

  //  insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);

  highlightSquareIds = result.flat();
  // console.log(highlightSquareIds);
  // highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];
      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if(checkPieceResult && 
         checkPieceResult.piece &&
         checkPieceResult.piece.piece_name.toLowerCase().includes("white")){
         break;
      }
      if(checkPieceofopponentonElement(element, "white")){
        break;
      }
    }
  }

  // console.log(captureIds);
  // // capture id logic
  // const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${
  //   Number(current_pos[1]) + 1
  // }`;
  // const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${
  //   Number(current_pos[1]) + 1
  // }`;

  // let captureIds = [col1, col2];
  // // captureIds = checkSquareCaptureId(captureIds);
  // captureIds.forEach((element) => {
  //   checkPieceofopponentonElement(element, "white");
  // });
  globalStateRender();
}
// Black Bishop Event
function BlackBishopClick(square) {
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveBishopHighlightIds(current_pos);
  let temp = [];
  const { bottomLeft, bottomRight, topLeft, topRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));

  //  insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);

  highlightSquareIds = result.flat();
  // console.log(highlightSquareIds);
  // highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];
      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if(checkPieceResult && 
         checkPieceResult.piece &&
         checkPieceResult.piece.piece_name.toLowerCase().includes("black")){
         break;
      }
      if(checkPieceofopponentonElement(element, "black")){
        break;
      }
    }
  }
  globalStateRender();
}

// white Rook Event
function whiteRookClick(square){
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveRookHighlightIds(current_pos);
  let temp = [];
  const {left, bottom,top, right } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(left));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));

  //  insert into temp
  temp.push(left);
  temp.push(bottom);
  temp.push(top);
  temp.push(right);

  highlightSquareIds = result.flat();
  // console.log(highlightSquareIds);
  // highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];
      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if(checkPieceResult && 
         checkPieceResult.piece &&
         checkPieceResult.piece.piece_name.toLowerCase().includes("white")){
         break;
      }
      if(checkPieceofopponentonElement(element,"white")){
        break;
      }
    }
  }
  globalStateRender();
}

// Black Rook Event
function BlackRookClick(square){
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveRookHighlightIds(current_pos);
  let temp = [];
  const {left, bottom,top, right } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(left));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));

  //  insert into temp
  temp.push(left);
  temp.push(bottom);
  temp.push(top);
  temp.push(right);

  highlightSquareIds = result.flat();
  // console.log(highlightSquareIds);
  // highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];
      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if(checkPieceResult && 
         checkPieceResult.piece &&
         checkPieceResult.piece.piece_name.toLowerCase().includes("black")){
         break;
      }
      if(checkPieceofopponentonElement(element, "black")){
        break;
      }
    }
  }
  globalStateRender();
}

// white Knight Event
function whiteKnightClick(square){
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveKnightHighlightIds(current_pos);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });
  highlightSquareIds.forEach((element) => {
    checkPieceofopponentonElement(element, "white");
  });
  globalStateRender();
}

// Black Knight Event
function BlackKnightClick(square){
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveKnightHighlightIds(current_pos);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });
  highlightSquareIds.forEach((element) => {
    checkPieceofopponentonElement(element, "black");
  });
  globalStateRender();
}

// white Queen Event
function whiteQueenClick(square){
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveQueenHighlightIds(current_pos);
  let temp = [];
  const {left, bottom,top, right,topLeft, topRight, bottomLeft, bottomRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(left));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(bottomRight));

  //  insert into temp
  temp.push(left);
  temp.push(bottom);
  temp.push(top);
  temp.push(right);
  temp.push(topRight);
  temp.push(bottomRight);
  temp.push(topLeft);
  temp.push(bottomRight);

  highlightSquareIds = result.flat();
  // console.log(highlightSquareIds);
  // highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];
      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if(checkPieceResult && 
         checkPieceResult.piece &&
         checkPieceResult.piece.piece_name.toLowerCase().includes("white")){
         break;
      }
      if(checkPieceofopponentonElement(element,"white")){
        break;
      }
    }
  }
  globalStateRender();
}

// black Queen Event
function BlackQueenClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveQueenHighlightIds(current_pos);
  let temp = [];

  const {left, bottom,top, right,topLeft, topRight, bottomLeft, bottomRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(left));

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  temp.push(top);
  temp.push(right);
  temp.push(bottom);
  temp.push(left);

  // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  let captureIds = [];

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break;
      }

      if (checkPieceofopponentonElement(element, "black")) {
        break;
      }
    }
  }

  // let captureIds = [col1, col2];
  // console.log(captureIds);
  // // captureIds = checkSquareCaptureId(captureIds);

  // captureIds.forEach((element) => {
  //   checkPieceofopponentonElement(element, "white");
  // });

  globalStateRender();
}

// white King Events
function whiteKingClick(square){
  const piece = square.piece;
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveKingHighlightIds(current_pos);
  let temp = [];
  const {left, bottom,top, right,topLeft, topRight, bottomLeft, bottomRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(left));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(bottomRight));

  //  insert into temp
  temp.push(left);
  temp.push(bottom);
  temp.push(top);
  temp.push(right);
  temp.push(topRight);
  temp.push(bottomRight);
  temp.push(topLeft);
  temp.push(bottomRight);

  highlightSquareIds = result.flat();
  // console.log(highlightSquareIds);
  // highlightSquareIds = checkSquareCaptureId(highlightSquareIds);

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  let captureIds = [];
  // console.log(temp);
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];
      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if(checkPieceResult && 
         checkPieceResult.piece &&
         checkPieceResult.piece.piece_name.toLowerCase().includes("white")){
         break;
      }
      if(checkPieceofopponentonElement(element,"white")){
        break;
      }
    }
  }
  globalStateRender();
}

// Black King Events
function BlackKingClick(square) {
  const piece = square.piece;

  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  if (square.captureHighlight) {
    // movePieceFromXToY();
    moveElement(selfHighlightState, piece.current_position);
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();
    return;
  }

  // clear all highlights
  clearPreviousSelfHighlight(selfHighlightState);
  clearHighlightLocal();

  // highlighting logic
  selfHighlight(piece);
  highlight_state = true;
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  let highlightSquareIds = giveKingHighlightIds(current_pos);
  let temp = [];

  const {left, bottom,top, right,topLeft, topRight, bottomLeft, bottomRight } = highlightSquareIds;

  let result = [];
  result.push(checkSquareCaptureId(bottomLeft));
  result.push(checkSquareCaptureId(topLeft));
  result.push(checkSquareCaptureId(bottomRight));
  result.push(checkSquareCaptureId(topRight));
  result.push(checkSquareCaptureId(top));
  result.push(checkSquareCaptureId(right));
  result.push(checkSquareCaptureId(bottom));
  result.push(checkSquareCaptureId(left));

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  temp.push(top);
  temp.push(right);
  temp.push(bottom);
  temp.push(left);

  // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
  highlightSquareIds = result.flat();

  highlightSquareIds.forEach((hightlight) => {
    const element = keySquareMapper[hightlight];
    element.highlight = true;
  });

  let captureIds = [];

  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWhetherPieceExistsOrNot(element);
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes("black")
      ) {
        break;
      }

      if (checkPieceofopponentonElement(element, "black")) {
        break;
      }
    }
  }

  // let captureIds = [col1, col2];
  // console.log(captureIds);
  // // captureIds = checkSquareCaptureId(captureIds);

  // captureIds.forEach((element) => {
  //   checkPieceofopponentonElement(element, "white");
  // });

  globalStateRender();
}

function clearPreviousSelfHighlight(piece) {
  if (piece) {
    document
      .getElementById(piece.current_position)
      .classList.remove("highlightYellow");
    selfHighlightState = null;
  }
}

function GlobalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickId = event.target.parentNode.id;
      const square = keySquareMapper[clickId];
      if(
        (square.piece.piece_name.includes("WHITE") && inTurn === "black") ||
        (square.piece.piece_name.includes("BLACK") && inTurn === "white")
        )
      {
        captureinTurn(square);
        return;
      }
      if (square.piece.piece_name == "WHITE_PAWN") {
        if(inTurn == "white") whitePawnClick(square);
      } else if (square.piece.piece_name == "BLACK_PAWN") {
        if(inTurn == "black") BlackPawnClick(square);
      } else if (square.piece.piece_name == "WHITE_BISHOP") {
        if(inTurn == "white") whiteBishopClick(square);
      } else if (square.piece.piece_name == "BLACK_BISHOP") {
        if(inTurn == "black") BlackBishopClick(square);
      }else if (square.piece.piece_name == "BLACK_ROOK") {
        if(inTurn == "black") BlackRookClick(square);
      }else if (square.piece.piece_name == "WHITE_ROOK") {
        if(inTurn == "white") whiteRookClick(square);
      }else if (square.piece.piece_name == "WHITE_KNIGHT") {
        if(inTurn == "white") whiteKnightClick(square);
      }else if (square.piece.piece_name == "BLACK_KNIGHT") {
        if(inTurn == "black") BlackKnightClick(square);
      }else if (square.piece.piece_name == "BLACK_QUEEN") {
        if(inTurn == "black") BlackQueenClick(square);
      }else if (square.piece.piece_name == "WHITE_QUEEN") {
        if(inTurn == "white") whiteQueenClick(square);
      }else if (square.piece.piece_name == "BLACK_KING") {
        if(inTurn == "black") BlackKingClick(square);
      }else if (square.piece.piece_name == "WHITE_KING") {
        if(inTurn == "white") whiteKingClick(square);
      } 
    } else {
      const childElementsofclickedEl = Array.from(event.target.childNodes);

      if (
        childElementsofclickedEl.length == 1 ||
        event.target.localName == "span"
      ) {
        if (event.target.localName == "span") {
          const id = event.target.parentNode.id;
          moveElement(moveState, id);
          moveState = null;
        } else {
          const id = event.target.id;
          moveElement(moveState, id);
          moveState = null;
        }
      } else {
        // clear highlights 
        clearHighlightLocal();
        clearPreviousSelfHighlight(selfHighlightState);
      }
    }
  });
}

export { GlobalEvent };

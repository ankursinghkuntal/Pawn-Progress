import {initGame} from"./data/data.js";
import  {initGameRender}  from "./Renderer/main.js";
import { GlobalEvent } from "./Events/global.js";

// will we useful till game end
const globalState = initGame();// we are getting the data
let keySquareMapper = {}; // empty object notation


globalState.flat().forEach((square) => {
    keySquareMapper[square.id] = square;
});
initGameRender(globalState);
GlobalEvent();

export{globalState,keySquareMapper,};
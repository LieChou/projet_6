import { CharacterMove } from "./characterMove.js";
import { CharacterManager } from "./characterManager.js";

const characterMove = new CharacterMove();

document.onkeyup = function (e) {
    let key = e.keyCode || e.which;
    characterMove.move(key);
    console.log(characterMove.galaxyBoard.squareList);
}



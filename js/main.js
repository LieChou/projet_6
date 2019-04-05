import { CharacterMove } from "./characterMove.js";

const characterMove = new CharacterMove();

document.onkeyup = function (e) {
    let key = e.keyCode || e.which;
    characterMove.move(key);
}

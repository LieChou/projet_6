import { CharacterMove } from "./characterMove.js";

const characterMove = new CharacterMove();

alert('***Bonjour et bienvenue sur le Galaxy Game**** Vous pouvez jouer à tour de rôle en vous déplaçant de 3 cases. Des armes sont disponibles sur le plateau, vous devez les ramasser pour gagner en puissance avant de vous affronter jusqu\'à ce que mort s\'en suive ! Que le meilleur gagne !');

document.onkeyup = function (e) {
    let key = e.keyCode || e.which;
    characterMove.move(key);
}
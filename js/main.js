import { Board } from "./board.js";
import { GreySquare } from "./greySquare.js";
import { Characters } from "./characters.js";
import { Gun } from "./gun.js";
import { CharacterManager } from "./characterManager.js";

//Instanciation de la classe Board et de ses méthodes pour générer le plateau avec les cases grises, les personnages et les armes
const galaxyBoard = new Board(600, 600, 0, 0, 10);
galaxyBoard.generateBoard();
galaxyBoard.generateGreySquare();
galaxyBoard.generateGuns();

//création des character1 and ch2
galaxyBoard.generateCharacters();
console.log(galaxyBoard.viewedGuns);

let characterManager = new CharacterManager(galaxyBoard.viewedCharacters);
let character = characterManager.getCharacter();

character.startTurn();
console.log(character);
document.onkeyup = function (e) {
    let key = e.keyCode || e.which;
    character = characterManager.getCharacter();
    switch (key) {
        case 37: //gauche 
            if ((character.X >= galaxyBoard.squareSize) && (character.checkGreySquaresLeft()) && character.checkLeftSquare()) {
                character.moveLeft();
                character.countCharacterMove();
                character.changeGun();
                if (character.getCountMove() >= 3) {
                    galaxyBoard.repaint();
                    characterManager.switchCharacter();
                };
            };
            break;
        case 39: //droite
            if ((character.X <= galaxyBoard.maxWidth - galaxyBoard.squareSize) && (character.checkGreySquaresRight()) && character.checkRightSquare()) {
                character.moveRight();
                character.countCharacterMove();
                character.changeGun();
                if (character.getCountMove() >= 3) {
                    galaxyBoard.repaint();
                    characterManager.switchCharacter();
                };
            };
            break;
        case 38: //haut
            if ((character.Y >= galaxyBoard.squareSize) && (character.checkGreySquaresUp()) && character.checkUpSquare()) {
                character.moveUp();
                character.countCharacterMove();
                character.changeGun();
                if (character.getCountMove() >= 3) {
                    galaxyBoard.repaint();
                    characterManager.switchCharacter();
                };
            };
            break;
        case 40: //bas
            if ((character.Y <= galaxyBoard.maxHeight - galaxyBoard.squareSize) && (character.checkGreySquaresDown()) && character.checkDownSquare()) {
                character.moveDown();
                character.countCharacterMove();
                character.changeGun();
                if (character.getCountMove() >= 3) {
                    galaxyBoard.repaint();
                    characterManager.switchCharacter();
                };
            };
            break;
        default:
            alert('Votre personnage est bloqué');
    }
}



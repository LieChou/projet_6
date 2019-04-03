import { CharacterManager } from "./characterManager.js";
import { Board } from "./board.js";

export class CharacterMove {
    constructor() {
        this.galaxyBoard = new Board(600, 600, 0, 0, 10);
        this.characterManager = new CharacterManager(this.galaxyBoard.viewedCharacters);
        this.characterManager.getCharacter().startTurn();
    }

    move(key) {
        let character = this.characterManager.getCharacter();
        switch (key) {
            case 37: //gauche 
                if ((character.X >= this.galaxyBoard.squareSize) && (character.checkGreySquaresLeft()) && character.checkLeftSquare()) {
                    character.moveLeft();
                    character.countCharacterMove();
                    character.changeGun();
                    console.log(character);
                    if (character.getCountMove() >= 3) {
                        this.galaxyBoard.repaint();
                        this.characterManager.switchCharacter();
                        console.log(character);
                    };
                };
                break;
            case 39: //droite
                if ((character.X <= this.galaxyBoard.maxWidth - this.galaxyBoard.squareSize) && (character.checkGreySquaresRight()) && character.checkRightSquare()) {
                    character.moveRight();
                    character.countCharacterMove();
                    character.changeGun();
                    if (character.getCountMove() >= 3) {
                        this.galaxyBoard.repaint();
                        this.characterManager.switchCharacter();
                    };
                };
                break;
            case 38: //haut
                if ((character.Y >= this.galaxyBoard.squareSize) && (character.checkGreySquaresUp()) && character.checkUpSquare()) {
                    character.moveUp();
                    character.countCharacterMove();
                    character.changeGun();
                    if (character.getCountMove() >= 3) {
                        this.galaxyBoard.repaint();
                        this.characterManager.switchCharacter();
                    };
                };
                break;
            case 40: //bas
                if ((character.Y <= this.galaxyBoard.maxHeight - this.galaxyBoard.squareSize) && (character.checkGreySquaresDown()) && character.checkDownSquare()) {
                    character.moveDown();
                    character.countCharacterMove();
                    character.changeGun();
                    if (character.getCountMove() >= 3) {
                        this.galaxyBoard.repaint();
                        this.characterManager.switchCharacter();
                    };
                };
                break;
            case 13: //enter (si on ne veut pas attendre de pacourir les 3 cases)
                if (character.getCountMove() >= 1) {
                    this.galaxyBoard.repaint();
                    this.characterManager.getCharacter().characterRepaint();
                    this.characterManager.switchCharacter();
                }
                break;
            default:
                alert('Votre personnage est bloqué');
        }
    }
}
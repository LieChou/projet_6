import { CharacterManager } from "./characterManager.js";
import { Board } from "./board.js";

export class CharacterMove {
    constructor(images) {
        console.log(images);
        this.galaxyBoard = new Board(600, 600, 0, 0, 10, images);
        this.characterManager = new CharacterManager(this.galaxyBoard.viewedCharacters, this.galaxyBoard);
        this.characterManager.getCharacter().startTurn();
        this.characterManager.getCharacter().updateInfo();
        this.images = images;

    }

    move(key) {
        let character = this.characterManager.getCharacter();
        switch (key) {
            case 37: //left
                if ((character.X >= this.galaxyBoard.squareSize) && (character.checkGreySquaresLeft())) {
                    character.moveLeft();
                    this.afterMove();
                };
                break;
            case 39: //right
                if ((character.X <= this.galaxyBoard.maxWidth - this.galaxyBoard.squareSize) && (character.checkGreySquaresRight())) {
                    character.moveRight();
                    this.afterMove();
                };
                break;
            case 38: //up
                if ((character.Y >= this.galaxyBoard.squareSize) && (character.checkGreySquaresUp())) {
                    character.moveUp();
                    this.afterMove();
                };
                break;
            case 40: //down
                if ((character.Y <= this.galaxyBoard.maxHeight - this.galaxyBoard.squareSize) && (character.checkGreySquaresDown())) {
                    character.moveDown();
                    this.afterMove();
                };
                break;
            case 13: //enter (if player wants to stop before 3 steps)
                if (character.getCountMove() >= 1) {
                    character.updateInfo();
                    this.characterManager.initFight();
                    this.galaxyBoard.repaint();
                    this.characterManager.getCharacter().characterRepaint();
                    this.characterManager.switchCharacter();
                }
                break;
            default: ;
        }
    }

    checkCountMove() {
        let character = this.characterManager.getCharacter();
        if (character.getCountMove() >= 3) {
            this.galaxyBoard.repaint();
            this.characterManager.switchCharacter();
            character.characterRepaint();
        };
    }

    afterMove() {
        let character = this.characterManager.getCharacter();
        let competitor = this.characterManager.getCompetitor()
        character.characterMove()
        this.characterManager.initFight();
        this.checkCountMove();
        competitor.characterRepaint();
    }
}